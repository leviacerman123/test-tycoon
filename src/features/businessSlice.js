import { createSlice } from '@reduxjs/toolkit';
import { businessData } from '../data/businesses';

const initialState = {
    businesses: businessData.map(b => ({
        ...b,
        owned: 0,
        upgradesOwned: [] // Array of upgrade IDs
    }))
};

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        buyBusinessUnit: (state, action) => {
            const { id } = action.payload;
            const business = state.businesses.find(b => b.id === id);
            if (business) {
                business.owned += 1;
            }
        },
        buyBusinessUpgrade: (state, action) => {
            const { businessId, upgradeId } = action.payload;
            const business = state.businesses.find(b => b.id === businessId);
            if (business && !business.upgradesOwned.includes(upgradeId)) {
                business.upgradesOwned.push(upgradeId);
            }
        },
        resetBusinesses: (state) => {
            state.businesses = businessData.map(b => ({
                ...b,
                owned: 0,
                upgradesOwned: []
            }));
        },
        collectBusinessIncome: (state, action) => {
            // Check payload for amount if needed, or just used for triggering
        },
        setBusinessState: (state, action) => {
            if (action.payload.businesses) state.businesses = action.payload.businesses;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('player/resetPlayer', (state) => {
            state.businesses = businessData.map(b => ({
                ...b,
                owned: 0,
                upgradesOwned: []
            }));
        });
    }
});

export const { buyBusinessUnit, buyBusinessUpgrade, resetBusinesses, collectBusinessIncome, setBusinessState } = businessSlice.actions;
export default businessSlice.reducer;

// Selectors
export const selectBusinessIncome = (state) => {
    return state.business.businesses.reduce((total, business) => {
        let multiplier = 1;
        business.upgrades.forEach(up => {
            if (business.upgradesOwned.includes(up.id)) {
                multiplier *= up.multiplier;
            }
        });
        return total + (business.owned * business.baseIncome * multiplier);
    }, 0);
};
