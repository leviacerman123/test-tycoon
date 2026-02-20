import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        lastSaveTime: Date.now(),
        language: 'ru', // Default to RU as per prompt preference if undefined
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        updateLastSaveTime: (state) => {
            state.lastSaveTime = Date.now();
        },
    },
});

export const { updateLastSaveTime, setLanguage } = gameSlice.actions;
export default gameSlice.reducer;
