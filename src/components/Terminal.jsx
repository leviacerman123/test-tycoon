import { useDispatch, useSelector } from 'react-redux';
import { clickDeal, upgradeClick } from '../features/playerSlice';
import { selectBusinessIncome } from '../features/businessSlice';
import { useTranslation } from '../hooks/useTranslation';
import { Briefcase, TrendingUp, Zap, ArrowUpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const Terminal = () => {
    const dispatch = useDispatch();
    const { cash, clickIncome, clickMultiplier } = useSelector((state) => state.player);
    const { stocks } = useSelector((state) => state.market);
    const { properties } = useSelector((state) => state.realEstate);
    // const { miningRigs } = useSelector((state) => state.crypto); // Pending mining logic if implemented
    const businessIncome = useSelector(selectBusinessIncome);
    const { t } = useTranslation();

    const [showIncomeDetails, setShowIncomeDetails] = useState(false);

    // Calculate Incomes
    const dividendsIncome = stocks.reduce((sum, s) => sum + (s.dividend || 0) * s.owned, 0);
    const rentIncome = properties.reduce((sum, p) => sum + (p.rent || 0) * p.owned, 0);
    const totalPassiveIncome = dividendsIncome + rentIncome + businessIncome;

    // Fallback for old saves
    const safeClickIncome = clickIncome || 1;
    const safeClickMultiplier = clickMultiplier || 1;
    const safeCash = isNaN(cash) ? 0 : cash;

    const netWorth = safeCash + 0; // TODO: Add asset value

    const currentClickValue = safeClickIncome * safeClickMultiplier;
    const upgradeCost = safeClickIncome * 50;
    const isMaxLevel = safeClickIncome >= 2048;
    const canUpgrade = safeCash >= upgradeCost && !isMaxLevel;

    const handleUpgrade = () => {
        if (canUpgrade) {
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
            dispatch(upgradeClick());
        }
    };

    const handleDealClick = () => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        dispatch(clickDeal());
    };

    return (
        <div className="p-4 space-y-6 pt-8 pb-24 relative min-h-screen">

            {/* Income Widget - Fixed Top Right Element */}
            <motion.div
                layout
                className={clsx(
                    "absolute top-4 right-4 z-50 transition-all duration-300",
                    showIncomeDetails ? "w-48" : "w-auto"
                )}
            >
                <div
                    onClick={() => setShowIncomeDetails(!showIncomeDetails)}
                    className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-700 rounded-xl p-2 shadow-xl cursor-pointer hover:bg-neutral-800 transition-colors"
                >
                    <div className="flex flex-col items-end">
                        {!showIncomeDetails ? (
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-neutral-400 font-bold uppercase">{t('incomePerSec')}</span>
                                <span className="text-sm font-bold text-emerald-400 font-mono">
                                    +${totalPassiveIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/s
                                </span>
                                <Info className="w-3 h-3 text-neutral-500" />
                            </div>
                        ) : (
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-700">
                                    <span className="text-[10px] text-neutral-400 font-bold uppercase">{t('incomePerSec')}</span>
                                    <Info className="w-3 h-3 text-neutral-500" />
                                </div>
                                <div className="text-right mb-3">
                                    <p className="text-lg font-bold text-emerald-400 font-mono">
                                        +${totalPassiveIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/s
                                    </p>
                                </div>

                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        <div className="flex justify-between text-xs">
                                            <span className="text-neutral-400">{t('stocks')}</span>
                                            <span className="text-emerald-400">+${dividendsIncome.toLocaleString()}/s</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-neutral-400">{t('realEstate')}</span>
                                            <span className="text-emerald-400">+${rentIncome.toLocaleString()}/s</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-neutral-400">{t('business')}</span>
                                            <span className="text-emerald-400">+${businessIncome.toLocaleString()}/s</span>
                                        </div>

                                        <div className="border-t border-neutral-700 pt-2 mt-2 bg-neutral-950/30 -mx-2 px-2 py-2 rounded-b-lg">
                                            <div className="flex justify-between text-[10px] text-neutral-500">
                                                <span>{t('perMinute')}</span>
                                                <span>${(totalPassiveIncome * 60).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-neutral-500">
                                                <span>{t('perHour')}</span>
                                                <span>${(totalPassiveIncome * 3600).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Header Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8"> {/* Removed mr-12, added mt-8 to clear potential overlap if widget expands? Actually top-4 is high. */}
                <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">{t('cash')}</p>
                    <p className="text-2xl font-bold text-emerald-400">{formatMoney(cash)}</p>
                </div>
                <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">{t('netWorth')}</p>
                    <p className="text-2xl font-bold text-cyan-400">{formatMoney(netWorth)}</p>
                </div>
            </div>

            {/* Main Action Area */}
            <div className="flex flex-col items-center justify-center py-8">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDealClick}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col items-center justify-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Briefcase className="w-12 h-12 text-cyan-400 mb-2" />
                    <span className="text-lg font-bold text-cyan-100">{t('deal')}</span>
                    <span className="text-xs text-cyan-300/70 mt-1">Tap to Earn</span>
                </motion.button>
            </div>

            {/* Upgrade Section */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <ArrowUpCircle className="w-5 h-5 text-purple-400" />
                        <h3 className="text-sm font-semibold text-neutral-200">Click Upgrade</h3>
                    </div>
                    <span className="text-xs text-neutral-500">
                        Current: <span className="text-emerald-400">${currentClickValue}/click</span>
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-neutral-400">Next Level</p>
                        <p className="text-lg font-bold text-white">
                            {isMaxLevel ? "MAX" : `$${currentClickValue * 2}`}
                            {!isMaxLevel && <span className="text-xs font-normal text-neutral-500 ml-1">/click</span>}
                        </p>
                    </div>
                    <button
                        onClick={handleUpgrade}
                        disabled={!canUpgrade}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2
                            ${isMaxLevel
                                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                : canUpgrade
                                    ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20'
                                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                            }
                        `}
                    >
                        {isMaxLevel ? (
                            "MAX LEVEL"
                        ) : (
                            <>
                                <span>Upgrade</span>
                                <span className="px-1.5 py-0.5 bg-black/20 rounded text-xs">
                                    ${formatMoney(upgradeCost)}
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Quick Stats / News */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <h3 className="text-sm font-semibold text-neutral-200">Market Brief</h3>
                    </div>
                    <span className="text-xs text-neutral-500">Live</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-neutral-800 pb-2">
                        <span className="text-neutral-400">Tech Sector</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +2.4%
                        </span>
                    </div>
                    <p className="text-xs text-neutral-500 italic">
                        &quot;Tech boom expected as new AI chips hit the market.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
};
