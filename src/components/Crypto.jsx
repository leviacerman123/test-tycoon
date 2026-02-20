import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCrypto, sellCrypto, buyMiningRig } from '../features/cryptoSlice';
import { subtractCash, addCash } from '../features/playerSlice';
import { Bitcoin, Cpu, PieChart } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

export const Crypto = () => {
    const dispatch = useDispatch();
    const { coins, miningRigs } = useSelector((state) => state.crypto);
    const { cash } = useSelector((state) => state.player);
    const [view, setView] = useState('market'); // 'market' | 'portfolio'

    const RIG_PRICE = 5000;

    const ownedCoins = coins.filter(c => c.owned > 0);
    const totalValue = ownedCoins.reduce((sum, c) => sum + (c.price * c.owned), 0);
    const totalPL = ownedCoins.reduce((sum, c) => sum + ((c.price - (c.avgCost || 0)) * c.owned), 0);

    const handleBuy = (coin) => {
        const amount = coin.price > 1000 ? 0.01 : 1;
        const cost = coin.price * amount;

        if (cash >= cost) {
            triggerHaptic('medium');
            dispatch(subtractCash(cost));
            dispatch(buyCrypto({ id: coin.id, amount }));
        } else {
            triggerHaptic('error');
        }
    };

    const handleSell = (coin) => {
        const amount = coin.price > 1000 ? 0.01 : 1;
        const value = coin.price * amount;

        if (coin.owned >= amount) {
            triggerHaptic('medium');
            dispatch(addCash(value));
            const profit = value - (coin.avgCost * amount);
            dispatch(sellCrypto({ id: coin.id, amount, profit }));
        }
    };

    const handleBuyRig = () => {
        if (cash >= RIG_PRICE) {
            triggerHaptic('success');
            dispatch(subtractCash(RIG_PRICE));
            dispatch(buyMiningRig());
        } else {
            triggerHaptic('error');
        }
    }

    return (
        <div className="p-4 pt-8 space-y-6 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                    <Bitcoin className="text-yellow-500" /> Crypto Exchange
                </h2>
                {/* Segmented Control */}
                <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                    <button
                        onClick={() => setView('market')}
                        className={clsx("px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            view === 'market' ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        Market
                    </button>
                    <button
                        onClick={() => setView('portfolio')}
                        className={clsx("px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            view === 'portfolio' ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        Portfolio
                    </button>
                </div>
            </div>

            {/* Mining Stats - Always visible or only in Market? Let's keep it visible */}
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800 flex justify-between items-center">
                <div>
                    <h3 className="text-neutral-300 font-bold flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-400" /> Mining Farm
                    </h3>
                    <p className="text-xs text-neutral-500">Active Rigs: <span className="text-white">{miningRigs}</span></p>
                </div>
                <button
                    onClick={handleBuyRig}
                    disabled={cash < RIG_PRICE}
                    className="px-3 py-1.5 text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 disabled:opacity-50 transition-all"
                >
                    Buy Rig ${RIG_PRICE}
                </button>
            </div>

            {view === 'portfolio' && (
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 rounded-xl p-4 border border-neutral-800">
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                            <p className="text-xs text-neutral-500">Total Crypto Value</p>
                            <p className="font-bold text-white">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">Unrealized P/L</p>
                            <p className={clsx("font-bold", totalPL >= 0 ? "text-emerald-400" : "text-red-400")}>
                                {totalPL >= 0 ? "+" : ""}{totalPL.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <AnimatePresence mode='popLayout'>
                    {(view === 'market' ? coins : ownedCoins).map((coin) => {
                        const pl = (coin.price - (coin.avgCost || 0)) * coin.owned;
                        const plPercent = (coin.avgCost || 0) > 0 ? ((coin.price - (coin.avgCost || 0)) / (coin.avgCost || 0)) * 100 : 0;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={coin.id}
                                className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{coin.name}</h3>
                                        <p className="text-xs text-neutral-500">{coin.symbol}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-yellow-400">${coin.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                                        {view === 'portfolio' && (
                                            <p className="text-xs text-neutral-400">Avg: ${(coin.avgCost || 0).toFixed(4)}</p>
                                        )}
                                    </div>
                                </div>

                                {view === 'portfolio' && (
                                    <div className="grid grid-cols-2 gap-2 py-2 border-t border-neutral-800/50 my-2">
                                        <div>
                                            <p className="text-[10px] text-neutral-500">Holdings</p>
                                            <p className="text-xs text-white">{coin.owned.toFixed(4)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-neutral-500">P/L</p>
                                            <p className={clsx("text-xs", pl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                                {pl >= 0 ? "+" : ""}{pl.toFixed(2)} ({plPercent.toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2 mt-2 pt-2 border-t border-neutral-800/50">
                                    <button
                                        onClick={() => handleSell(coin)}
                                        disabled={coin.owned <= 0}
                                        className="flex-1 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        SELL
                                    </button>
                                    <button
                                        onClick={() => handleBuy(coin)}
                                        disabled={cash < (coin.price > 1000 ? coin.price * 0.01 : coin.price)}
                                        className="flex-1 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        BUY
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

                {view === 'portfolio' && ownedCoins.length === 0 && (
                    <div className="text-center py-10 text-neutral-500">
                        <PieChart className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p>No crypto owned yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
