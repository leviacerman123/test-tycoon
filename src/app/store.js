import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import playerReducer from '../features/playerSlice';
import marketReducer from '../features/marketSlice';
import realEstateReducer from '../features/realEstateSlice';
import cryptoReducer from '../features/cryptoSlice';
import gameReducer from '../features/gameSlice';
import businessReducer from '../features/businessSlice';
import authReducer from '../features/authSlice';

const rootReducer = combineReducers({
    player: playerReducer,
    market: marketReducer,
    realEstate: realEstateReducer,
    crypto: cryptoReducer,
    game: gameReducer,
    business: businessReducer,
    auth: authReducer, // added here so it's accessible via state.auth
});

const persistConfig = {
    key: 'root',
    storage,
    // auth is intentionally excluded — Telegram re-validates on every launch
    whitelist: ['player', 'market', 'realEstate', 'crypto', 'game', 'business'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
