import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addCash } from '../features/playerSlice'; // No longer needed directly if using specific actions?
// Using specific actions for stats tracking:
import { collectRent } from '../features/realEstateSlice';
import { updateStockPrices, generateNews, payDividends } from '../features/marketSlice';
import { updateCryptoPrices } from '../features/cryptoSlice';
import { updateLastSaveTime } from '../features/gameSlice';
import { collectBusinessIncome, selectBusinessIncome } from '../features/businessSlice';

export const useGameLoop = () => {
    const dispatch = useDispatch();
    const properties = useSelector((state) => state.realEstate.properties);
    const stocks = useSelector((state) => state.market.stocks);
    const businessIncome = useSelector(selectBusinessIncome);
    const loading = useSelector((state) => state.game.loading); // Placeholder if loading needed

    // Use a ref to access the latest state inside the interval without resetting it
    const stateRef = React.useRef({ properties, stocks, businessIncome });

    // Always keep the ref updated with the latest state
    useEffect(() => {
        stateRef.current = { properties, stocks, businessIncome };
    }, [properties, stocks, businessIncome]);

    useEffect(() => {
        const interval = setInterval(() => {
            const { properties, stocks, businessIncome } = stateRef.current;

            // 1. Calculate Passive Income (Rent)
            let rentIncome = 0;
            properties.forEach(p => {
                rentIncome += (p.rent * p.owned);
            });

            if (rentIncome > 0) {
                // dispatch(addCash(rentIncome)); // OLD
                dispatch(collectRent({ amount: rentIncome })); // New action for tracking
            }

            // 1.1 Business Income
            if (businessIncome > 0) {
                dispatch(collectBusinessIncome({ amount: businessIncome }));
            }

            // 2. Calculate Dividends (Every 5 seconds?)
            // Let's make it a 10% chance per second for a "Dividend Payout" event from ALL stocks
            // Or just a steady trickle?
            // "dividends/sec" implies steady.
            // Let's do steady 1/sec for simplicity of "Cash Flow".
            let dividendIncome = 0;
            stocks.forEach(s => {
                if (s.dividend && s.owned > 0) {
                    dividendIncome += (s.dividend * s.owned);
                }
            });

            if (dividendIncome > 0) {
                dispatch(payDividends({ amount: dividendIncome }));
            }

            // 2. Update Market Prices
            // Random chance to update or every tick?
            if (Math.random() > 0.7) {
                dispatch(updateStockPrices());
            }
            if (Math.random() > 0.5) {
                dispatch(updateCryptoPrices());
            }

            // 3. Generate News (Rare event)
            if (Math.random() > 0.95) { // 5% chance per second
                dispatch(generateNews());
            }

            // 4. Update Save Time
            dispatch(updateLastSaveTime());

        }, 1000); // 1 second tick

        return () => clearInterval(interval);
    }, [dispatch]); // Only dispatch is a dependency now, so interval stays stable
};
