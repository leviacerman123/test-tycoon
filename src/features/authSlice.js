import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Called on Mini App launch — validates Telegram initData
export const initTelegramAuth = createAsyncThunk(
    'auth/initTelegramAuth',
    async (_, { rejectWithValue }) => {
        const tg = window.Telegram?.WebApp;

        if (!tg || !tg.initData) {
            return rejectWithValue('Открой приложение через Telegram');
        }

        // Tell Telegram the app is ready & expand to full screen
        tg.ready();
        tg.expand();

        // Return Telegram user info
        const user = tg.initDataUnsafe?.user || null;
        return { user };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',       // idle | loading | authenticated | error
        user: null,           // { id, first_name, username, language_code, ... }
        error: null,
        isTelegram: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initTelegramAuth.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isTelegram = !!window.Telegram?.WebApp?.initData;
            })
            .addCase(initTelegramAuth.fulfilled, (state, action) => {
                state.status = 'authenticated';
                state.user = action.payload.user;
                state.isTelegram = true;
                state.error = null;
            })
            .addCase(initTelegramAuth.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Ошибка авторизации';
                state.isTelegram = false;
            });
    },
});

export default authSlice.reducer;
