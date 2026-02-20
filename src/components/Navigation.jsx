import { Link, useLocation } from 'react-router-dom';
import { Home, LineChart, Building2, Bitcoin, User, Briefcase } from 'lucide-react';
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
        { path: '/profile', icon: User, label: t('nav_profile') },
    ];

    return (
        <nav className="bg-neutral-900 border-t border-neutral-800 px-4 py-2 flex justify-between items-center backdrop-blur-lg bg-opacity-90">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex flex-col items-center gap-1 transition-colors relative",
                            isActive ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        <item.icon className={clsx("w-6 h-6", isActive && "animate-pulse")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                        {isActive && (
                            <span className="absolute -top-2 w-1 h-1 bg-cyan-400 rounded-full" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};
