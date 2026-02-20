import { createSlice } from '@reduxjs/toolkit';
import { cryptoData } from '../data/crypto';

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        coins: cryptoData,
        miningRigs: 0,
    },
    reducers: {
        updateCryptoPrices: (state) => {
            state.coins.forEach(coin => {
                // High volatility
                const change = (Math.random() - 0.5) * 0.1;
                coin.price = Math.max(0.0001, coin.price * (1 + change));
            });
        },
        buyCrypto: (state, action) => {
            const { id, amount } = action.payload;
            const coin = state.coins.find(c => c.id === id);
            if (coin) {
                // Calculate new average cost
                const totalCost = (coin.avgCost * coin.owned) + (coin.price * amount);
                coin.owned += amount;
                coin.avgCost = totalCost / coin.owned;
            }
        },
        sellCrypto: (state, action) => {
            const { id, amount } = action.payload;
            const coin = state.coins.find(c => c.id === id);
            if (coin && coin.owned >= amount) {
                // Calculate profit for player stats
                const profit = (coin.price - coin.avgCost) * amount;
                // We don't update state.stats here directly unless we want to, 
                // but we pass it effectively via the interaction in the component or extraReducers.
                // Actually, extraReducers in playerSlice listens to this action.
                // So we need to ensure the action payload includes the profit?
                // Redux Toolkit action creators accept one argument (payload). 
                // We are passing {id, amount}. We can't easily add 'profit' here to the action *before* it's dispatched 
                // unless we dispatch a thunk or calculate it in component.
                // BETTER APPROACH: The component dispatches sellCrypto({ id, amount, profit }).
                // The reducer just handles the logic.

                coin.owned -= amount;
                if (coin.owned <= 0) {
                    coin.owned = 0;
                    coin.avgCost = 0;
                }
            }
        },
        buyMiningRig: (state) => {
            state.miningRigs += 1;
        },
        setCryptoState: (state, action) => {
            if (action.payload.coins) state.coins = action.payload.coins;
            if (action.payload.miningRigs !== undefined) state.miningRigs = action.payload.miningRigs;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('player/resetPlayer', (state) => {
            state.coins.forEach(c => {
                c.owned = 0;
                c.avgCost = 0;
            });
            state.miningRigs = 0;
        });
    }
});

export const { updateCryptoPrices, buyCrypto, sellCrypto, buyMiningRig, setCryptoState } = cryptoSlice.actions;
export default cryptoSlice.reducer;
