import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useGameLoop } from '../hooks/useGameLoop';
import { useEffect } from 'react';

export const Layout = () => {
    // Start the game loop
    useGameLoop();

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20">
            <main className="max-w-md mx-auto min-h-screen relative">
                <Outlet />
            </main>
            <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0">
                <Navigation />
            </div>
        </div>
    );
};
