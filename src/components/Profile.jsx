import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../features/gameSlice';
import { resetPlayer } from '../features/playerSlice';
import { useTranslation } from '../hooks/useTranslation';
import { User, Trophy, MousePointer, RefreshCw, Zap, Globe } from 'lucide-react';
import clsx from 'clsx';

export const Profile = () => {
    const dispatch = useDispatch();
    const { cash, stats, investorPoints, clickMultiplier } = useSelector((state) => state.player);
    const tgUser = useSelector((state) => state.auth?.user);
    const { t, language } = useTranslation();

    const displayName = tgUser
        ? (tgUser.first_name + (tgUser.last_name ? ' ' + tgUser.last_name : ''))
        : 'Investor';
    const displayUsername = tgUser?.username ? `@${tgUser.username}` : null;

    const handleReset = () => {
        if (window.confirm("Are you sure? This will reset your assets but grant Investor Points.")) {
            dispatch(resetPlayer());
        }
    };

    return (
        <div className="p-4 pt-8 space-y-6">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                        <User className="w-12 h-12 text-neutral-400" />
                    </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{displayName}</h2>
                {displayUsername && <p className="text-xs text-neutral-500">{displayUsername}</p>}
                <p className="text-sm text-cyan-400">Prestige Level {investorPoints}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800">
                    <h3 className="text-xs text-neutral-400 uppercase">Total Earned</h3>
                    <p className="text-lg font-bold text-emerald-400 flex items-center gap-1">
                        ${stats.totalEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800">
                    <h3 className="text-xs text-neutral-400 uppercase">Total Clicks</h3>
                    <p className="text-lg font-bold text-cyan-400 flex items-center gap-1">
                        <MousePointer className="w-4 h-4" /> {stats.totalClicks}
                    </p>
                </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-200 mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-500" /> Lifetime Earnings
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm border-b border-neutral-800 pb-2">
                        <span className="text-neutral-400">Stock Dividends</span>
                        <span className="text-emerald-400 font-mono">
                            +${(stats.totalDividendsEarned || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-neutral-800 pb-2">
                        <span className="text-neutral-400">Crypto Trading</span>
                        <span className={clsx("font-mono", (stats.totalCryptoTradingProfit || 0) >= 0 ? "text-emerald-400" : "text-red-400")}>
                            {(stats.totalCryptoTradingProfit || 0) >= 0 ? "+" : ""}${(stats.totalCryptoTradingProfit || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-neutral-800 pb-2">
                        <span className="text-neutral-400">Real Estate Rent</span>
                        <span className="text-emerald-400 font-mono">
                            +${(stats.totalRentEarned || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400">Business Income</span>
                        <span className="text-emerald-400 font-mono">
                            +${(stats.totalBusinessEarned || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-200 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-500" /> {t('language')}
                </h3>
                <div className="grid grid-cols-2 gap-2 bg-neutral-950/50 p-1 rounded-lg">
                    <button
                        onClick={() => dispatch(setLanguage('en'))}
                        className={clsx(
                            "py-2 px-4 rounded-md text-sm font-medium transition-all",
                            language === 'en'
                                ? "bg-neutral-700 text-white shadow-sm"
                                : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        English
                    </button>
                    <button
                        onClick={() => dispatch(setLanguage('ru'))}
                        className={clsx(
                            "py-2 px-4 rounded-md text-sm font-medium transition-all",
                            language === 'ru'
                                ? "bg-neutral-700 text-white shadow-sm"
                                : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        Русский
                    </button>
                </div>
            </div>

            {/* Skills Section (Placeholder driven by Prestige) */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-200 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" /> Skills & Bonuses
                </h3>
                <div className="space-y-2">
                    <div className="bg-neutral-800/50 rounded-lg p-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Click Multiplier</span>
                        <span className="text-xs text-emerald-400 font-bold">x{clickMultiplier.toFixed(1)}</span>
                    </div>
                    <div className="bg-neutral-800/50 rounded-lg p-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Starting Cash Bonus</span>
                        <span className="text-xs text-emerald-400 font-bold">+${investorPoints * 1000}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleReset}
                className="w-full py-3 text-sm font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 flex items-center justify-center gap-2"
            >
                <RefreshCw className="w-4 h-4" /> Prestige Reset
            </button>
        </div >
    );
};
