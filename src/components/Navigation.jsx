import { Link, useLocation } from 'react-router-dom';
import { Home, LineChart, Building2, Bitcoin, User, Briefcase, Trophy } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from '../hooks/useTranslation';

export const Navigation = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const navItems = [
        { path: '/', icon: Home, label: t('nav_terminal') },
        { path: '/business', icon: Briefcase, label: t('nav_business') },
        { path: '/market', icon: LineChart, label: t('nav_market') },
        { path: '/real-estate', icon: Building2, label: t('nav_realEstate') },
        { path: '/crypto', icon: Bitcoin, label: t('nav_crypto') },
        { path: '/leaderboard', icon: Trophy, label: t('nav_leaderboard') },
        { path: '/profile', icon: User, label: t('nav_profile') },
    ];

    return (
        <nav className="bg-neutral-900 border-t border-neutral-800 px-2 py-2 flex justify-between items-center backdrop-blur-lg bg-opacity-90">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex flex-col items-center gap-0.5 transition-colors relative px-1",
                            isActive ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        <item.icon className={clsx("w-5 h-5", isActive && "animate-pulse")} />
                        <span className="text-[9px] font-medium leading-tight">{item.label}</span>
                        {isActive && (
                            <span className="absolute -top-2 w-1 h-1 bg-cyan-400 rounded-full" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );

};
