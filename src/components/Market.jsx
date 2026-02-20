import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyStock, sellStock } from '../features/marketSlice';
import { subtractCash, addCash } from '../features/playerSlice';
import { TrendingUp, TrendingDown, PieChart, BarChart3, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

export const Market = () => {
    const dispatch = useDispatch();
    const { stocks } = useSelector((state) => state.market);
    const { cash } = useSelector((state) => state.player);
    const [view, setView] = useState('market'); // 'market' | 'portfolio'
    const [sortBy, setSortBy] = useState('value'); // 'value' | 'dividend' | 'pl'

    const ownedStocks = stocks.filter(s => s.owned > 0);

    // Portfolio Stats
    const totalValue = ownedStocks.reduce((sum, s) => sum + (s.price * s.owned), 0);
    const totalDividends = ownedStocks.reduce((sum, s) => sum + (s.dividend || 0) * s.owned, 0);
    const totalPL = ownedStocks.reduce((sum, s) => sum + ((s.price - (s.avgCost || 0)) * s.owned), 0);

    const handleBuy = (stock) => {
        if (cash >= stock.price) {
            triggerHaptic('medium');
            dispatch(subtractCash(stock.price));
            dispatch(buyStock({ id: stock.id, amount: 1 }));
        } else {
            triggerHaptic('error');
        }
    };

    const handleSell = (stock) => {
        if (stock.owned > 0) {
            triggerHaptic('medium');
            dispatch(addCash(stock.price));
            dispatch(sellStock({ id: stock.id, amount: 1 }));
        }
    };

    const sortedPortfolio = [...ownedStocks].sort((a, b) => {
        if (sortBy === 'value') return (b.price * b.owned) - (a.price * a.owned);
        if (sortBy === 'dividend') return ((b.dividend || 0) * b.owned) - ((a.dividend || 0) * a.owned);
        if (sortBy === 'pl') return ((b.price - (b.avgCost || 0)) * b.owned) - ((a.price - (a.avgCost || 0)) * a.owned);
        return 0;
    });

    return (
        <div className="p-4 pt-8 space-y-4 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                    <TrendingUp className="text-cyan-400" /> Stock Market
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

            {view === 'portfolio' && (
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 rounded-xl p-4 border border-neutral-800">
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <p className="text-xs text-neutral-500">Total Value</p>
                            <p className="font-bold text-white">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">Unrealized P/L</p>
                            <p className={clsx("font-bold", totalPL >= 0 ? "text-emerald-400" : "text-red-400")}>
                                {totalPL >= 0 ? "+" : ""}{totalPL.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500">Divs/sec</p>
                            <p className="font-bold text-yellow-400">${totalDividends.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}

            {view === 'portfolio' && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {['value', 'dividend', 'pl'].map(sort => (
                        <button
                            key={sort}
                            onClick={() => setSortBy(sort)}
                            className={clsx("px-3 py-1 rounded-full text-xs border whitespace-nowrap",
                                sortBy === sort ? "bg-neutral-800 border-neutral-600 text-white" : "border-neutral-800 text-neutral-500"
                            )}
                        >
                            Sort by {sort === 'pl' ? 'P/L' : sort.charAt(0).toUpperCase() + sort.slice(1)}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid gap-3">
                <AnimatePresence mode='popLayout'>
                    {(view === 'market' ? stocks : sortedPortfolio).map((stock) => {
                        const pl = (stock.price - (stock.avgCost || 0)) * stock.owned;
                        const plPercent = (stock.avgCost || 0) > 0 ? ((stock.price - (stock.avgCost || 0)) / (stock.avgCost || 0)) * 100 : 0;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={stock.id}
                                className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-neutral-100">{stock.ticker}</h3>
                                            {view === 'market' && (
                                                <span className={clsx("text-xs px-2 py-0.5 rounded-full bg-neutral-800",
                                                    stock.risk === 'High' ? 'text-red-400' :
                                                        stock.risk === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'
                                                )}>
                                                    {stock.risk}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-500">{stock.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-cyan-300 text-lg">${stock.price.toFixed(2)}</p>
                                        <span className={clsx("text-xs flex items-center justify-end", stock.trend >= 0 ? "text-emerald-500" : "text-red-500")}>
                                            {stock.trend >= 0 ? "+" : ""}{(stock.trend * 100).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>

                                {view === 'portfolio' && (
                                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-neutral-800/50 my-2">
                                        <div>
                                            <p className="text-[10px] text-neutral-500">Avg Cost</p>
                                            <p className="text-xs text-neutral-300">${(stock.avgCost || 0).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-neutral-500">Holdings</p>
                                            <p className="text-xs text-white">{stock.owned}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-neutral-500">P/L</p>
                                            <p className={clsx("text-xs", pl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                                {pl >= 0 ? "+" : ""}{pl.toFixed(0)} ({plPercent.toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/50">
                                    <div className="text-xs text-neutral-500">
                                        {view === 'market' ? (
                                            <span>Owned: <span className="text-neutral-300">{stock.owned}</span></span>
                                        ) : (
                                            <span>Divs: <span className="text-yellow-400">+${((stock.dividend || 0) * stock.owned).toFixed(2)}/s</span></span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSell(stock)}
                                            disabled={stock.owned <= 0}
                                            className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            SELL
                                        </button>
                                        <button
                                            onClick={() => handleBuy(stock)}
                                            disabled={cash < stock.price}
                                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            BUY
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

                {view === 'portfolio' && ownedStocks.length === 0 && (
                    <div className="text-center py-10 text-neutral-500">
                        <PieChart className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p>No stocks owned yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
