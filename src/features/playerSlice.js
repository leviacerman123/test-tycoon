import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cash: 10000000,
    reputation: 0,
    investorPoints: 0,
    stats: {
        totalEarned: 0,
        totalClicks: 0,
        playtime: 0,
        totalDividendsEarned: 0,
        totalCryptoTradingProfit: 0,
        totalRentEarned: 0,
        totalBusinessEarned: 0,
    },
    clickIncome: 1,
    clickMultiplier: 1,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addCash: (state, action) => {
            const amount = action.payload;
            state.cash += amount;
            if (amount > 0) {
                state.stats.totalEarned += amount;
            }
        },
        subtractCash: (state, action) => {
            state.cash -= action.payload;
        },
        clickDeal: (state) => {
            // Ensure clickIncome exists (migration for old saves)
            if (!state.clickIncome) state.clickIncome = 1;

            const income = state.clickIncome * state.clickMultiplier;

            // Fix NaN cash if it happened
            if (isNaN(state.cash)) state.cash = 1000;

            state.cash += income;
            state.stats.totalEarned += income;
            state.stats.totalClicks += 1;
        },
        upgradeClick: (state) => {
            // Ensure clickIncome exists
            if (!state.clickIncome) state.clickIncome = 1;

            const cost = state.clickIncome * 50;
            if (state.cash >= cost && state.clickIncome < 2048) {
                state.cash -= cost;
                state.clickIncome *= 2;
            }
        },
        resetPlayer: (state) => {
            // Calculate prestige points based on lifetime earnings
            const newPoints = Math.floor(state.stats.totalEarned / 1000000); // 1 point per million

            state.investorPoints += newPoints;
            state.cash = 1000 + (state.investorPoints * 1000); // Bonus starting cash
            state.clickMultiplier = 1 + (state.investorPoints * 0.1); // 10% bonus per point
            state.clickIncome = 1; // Reset base click
            state.reputation = 0;

            // Reset stats for new run? Keeping lifetime for now.
        },
        setPlayerState: (state, action) => {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase('crypto/sellCrypto', (state, action) => {
            const { profit } = action.payload; // cryptoSlice needs to pass profit in payload
            if (profit) state.stats.totalCryptoTradingProfit += profit;
        });
        builder.addCase('market/payDividends', (state, action) => {
            const { amount } = action.payload;
            state.cash += amount;
            state.stats.totalDividendsEarned += amount;
        });
        builder.addCase('realEstate/collectRent', (state, action) => {
            const { amount } = action.payload;
            state.cash += amount;
            state.stats.totalRentEarned += amount;
        });
        builder.addCase('business/collectBusinessIncome', (state, action) => {
            const { amount } = action.payload;
            state.cash += amount;
            state.stats.totalBusinessEarned += amount;
        });
    }
});

export const { addCash, subtractCash, clickDeal, upgradeClick, resetPlayer, setPlayerState } = playerSlice.actions;
export default playerSlice.reducer;
