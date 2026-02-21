import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncGameData } from './services/api';
import { initTelegramAuth } from './features/authSlice';
import { setPlayerState } from './features/playerSlice';
import { setMarketState } from './features/marketSlice';
import { setRealEstateState } from './features/realEstateSlice';
import { setCryptoState } from './features/cryptoSlice';
import { setBusinessState } from './features/businessSlice';
import { updateLastSaveTime } from './features/gameSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Terminal } from './components/Terminal';
import { Market } from './components/Market';
import { RealEstate } from './components/RealEstate';
import { Crypto } from './components/Crypto';
import { Profile } from './components/Profile';
import { Business } from './components/Business';
import { SplashScreen } from './components/SplashScreen';
import { Leaderboard } from './components/Leaderboard';

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const authStatus = useSelector((state) => state.auth?.status);
    const authError = useSelector((state) => state.auth?.error);

    // Run Telegram auth once on mount (auto-login + auto-register)
    useEffect(() => {
        dispatch(initTelegramAuth());
    }, [dispatch]);

    // After auth success, apply cloud data to Redux
    useEffect(() => {
        const handleCloudSync = async () => {
            if (authStatus !== 'authenticated') return;
            if (!window.Telegram?.WebApp?.initData) return;

            try {
                const gameData = {
                    cash: state.player?.cash,
                    clickIncome: state.player?.clickIncome,
                    clickMultiplier: state.player?.clickMultiplier,
                    investorPoints: state.player?.investorPoints,
                    stats: state.player?.stats,
                    stocks: state.market?.stocks?.map(s => ({ id: s.id, owned: s.owned, avgCost: s.avgCost })),
                    properties: state.realEstate?.properties?.map(p => ({ id: p.id, owned: p.owned })),
                    businesses: state.business?.businesses?.map(b => ({ id: b.id, owned: b.owned, upgradesOwned: b.upgradesOwned })),
                    crypto: state.crypto?.coins?.map(c => ({ id: c.id, owned: c.owned, avgCost: c.avgCost })),
                    miningRigs: state.crypto?.miningRigs,
                    lastSaveTime: state.game?.lastSaveTime,
                };

                const response = await syncGameData(gameData);

                if (response.success && response.action === 'loaded_from_cloud') {
                    const data = response.data;
                    const mergeItems = (originalItems = [], cloudItems = []) =>
                        originalItems.map(item => {
                            const cloudItem = cloudItems.find(c => c.id === item.id);
                            return cloudItem ? { ...item, ...cloudItem } : item;
                        });

                    if (data.cash !== undefined) dispatch(setPlayerState({
                        cash: data.cash,
                        clickIncome: data.clickIncome,
                        clickMultiplier: data.clickMultiplier,
                        investorPoints: data.investorPoints,
                        stats: data.stats,
                    }));

                    if (data.stocks) dispatch(setMarketState({ stocks: mergeItems(state.market?.stocks, data.stocks) }));
                    if (data.properties) dispatch(setRealEstateState({ properties: mergeItems(state.realEstate?.properties, data.properties) }));
                    if (data.businesses) dispatch(setBusinessState({ businesses: mergeItems(state.business?.businesses, data.businesses) }));
                    if (data.crypto) dispatch(setCryptoState({
                        coins: mergeItems(state.crypto?.coins, data.crypto),
                        miningRigs: data.miningRigs,
                    }));

                    dispatch(updateLastSaveTime());
                }
            } catch (error) {
                console.error('Cloud Sync Failed:', error);
            }
        };

        handleCloudSync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authStatus]);

    // Auto-save every 60 seconds after auth
    const handleAutoSave = useCallback(async () => {
        if (authStatus !== 'authenticated') return;
        if (!window.Telegram?.WebApp?.initData) return;

        try {
            const gameData = {
                cash: state.player?.cash,
                clickIncome: state.player?.clickIncome,
                clickMultiplier: state.player?.clickMultiplier,
                investorPoints: state.player?.investorPoints,
                stats: state.player?.stats,
                stocks: state.market?.stocks?.map(s => ({ id: s.id, owned: s.owned, avgCost: s.avgCost })),
                properties: state.realEstate?.properties?.map(p => ({ id: p.id, owned: p.owned })),
                businesses: state.business?.businesses?.map(b => ({ id: b.id, owned: b.owned, upgradesOwned: b.upgradesOwned })),
                crypto: state.crypto?.coins?.map(c => ({ id: c.id, owned: c.owned, avgCost: c.avgCost })),
                miningRigs: state.crypto?.miningRigs,
                lastSaveTime: state.game?.lastSaveTime,
            };
            await syncGameData(gameData);
            dispatch(updateLastSaveTime());
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }, [dispatch, state, authStatus]);

    useEffect(() => {
        const interval = setInterval(handleAutoSave, 60000);
        return () => clearInterval(interval);
    }, [handleAutoSave]);

    // Show splash screen while auth is in progress
    if (authStatus === 'idle' || authStatus === 'loading') {
        return <SplashScreen status={authStatus === 'idle' ? 'loading' : authStatus} error={authError} />;
    }

    // Show error screen if not in Telegram (dev mode: still allow access)
    if (authStatus === 'error') {
        const isDev = import.meta.env.DEV;
        if (!isDev) {
            return <SplashScreen status="error" error={authError} />;
        }
        // In development: skip auth and load game anyway
        console.warn('[DEV] Auth skipped:', authError);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Terminal />} />
                    <Route path="business" element={<Business />} />
                    <Route path="market" element={<Market />} />
                    <Route path="real-estate" element={<RealEstate />} />
                    <Route path="crypto" element={<Crypto />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
