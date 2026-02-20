import { createSlice } from '@reduxjs/toolkit';
import { realEstateData } from '../data/realEstate';

const realEstateSlice = createSlice({
    name: 'realEstate',
    initialState: {
        properties: realEstateData,
    },
    reducers: {
        buyProperty: (state, action) => {
            const { id, amount } = action.payload;
            const property = state.properties.find(p => p.id === id);
            if (property) {
                property.owned += amount;
            }
        },
        collectRent: (state) => {
            // Action for playerSlice to listen to
        },
        setRealEstateState: (state, action) => {
            if (action.payload.properties) state.properties = action.payload.properties;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('player/resetPlayer', (state) => {
            state.properties.forEach(p => p.owned = 0);
        });
    }
});

export const { buyProperty, collectRent, setRealEstateState } = realEstateSlice.actions;
export default realEstateSlice.reducer;
