import { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, RefreshCw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// VITE_API_URL already includes /api (e.g. http://localhost:5000/api)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const formatMoney = (num) => {
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
    return `$${Math.floor(num).toLocaleString()}`;
};

const RankIcon = ({ rank }) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-neutral-500 font-mono text-xs w-5 text-center">{rank}</span>;
};

export const Leaderboard = () => {
    const { t } = useTranslation();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchLeaderboard = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiUrl = `${API_BASE}/user/leaderboard`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            if (data.success) {
                setPlayers(data.data);
                setLastUpdated(new Date());
            } else {
                setError('Failed to load leaderboard');
            }
        } catch (err) {
            setError('Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-yellow-900/30 via-neutral-900 to-neutral-950 border-b border-neutral-800 px-4 pt-8 pb-6">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #fbbf24 0%, transparent 60%)' }} />
                <div className="relative flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <span className="text-xs text-yellow-400/70 uppercase tracking-widest font-semibold">
                                {t('nav_leaderboard')}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-neutral-100">
                            {t('leaderboard_title') || 'Лидерборд'}
                        </h1>
                        <p className="text-xs text-neutral-500 mt-1">
                            {t('leaderboard_subtitle') || 'Топ-20 богатейших игроков'}
                        </p>
                    </div>
                    <button
                        onClick={fetchLeaderboard}
                        disabled={loading}
                        className="p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/50 text-neutral-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all active:scale-95"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {lastUpdated && (
                    <p className="relative text-[10px] text-neutral-600 mt-3">
                        Обновлено: {lastUpdated.toLocaleTimeString()}
                    </p>
                )}
            </div>

            {/* Content */}
            <div className="px-4 pt-4">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-10 h-10 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                        <span className="text-neutral-500 text-sm">Загрузка...</span>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16">
                        <div className="text-4xl mb-3">📡</div>
                        <p className="text-neutral-400 text-sm mb-4">{error}</p>
                        <button
                            onClick={fetchLeaderboard}
                            className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm hover:bg-yellow-500/20 transition-colors"
                        >
                            Попробовать снова
                        </button>
                    </div>
                )}

                {!loading && !error && players.length === 0 && (
                    <div className="text-center py-16">
                        <Users className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                        <p className="text-neutral-500 text-sm">Пока нет игроков в рейтинге</p>
                    </div>
                )}

                {!loading && players.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {/* Top 3 podium */}
                        {players.slice(0, 3).map((player, i) => (
                            <div
                                key={player.rank}
                                className={`relative overflow-hidden rounded-xl p-4 border transition-all ${i === 0
                                    ? 'bg-gradient-to-r from-yellow-900/30 to-neutral-900 border-yellow-600/40'
                                    : i === 1
                                        ? 'bg-gradient-to-r from-slate-800/40 to-neutral-900 border-slate-600/30'
                                        : 'bg-gradient-to-r from-amber-900/20 to-neutral-900 border-amber-700/30'
                                    }`}
                            >
                                {i === 0 && (
                                    <div className="absolute inset-0 opacity-5"
                                        style={{ backgroundImage: 'radial-gradient(circle at 0% 50%, #fbbf24, transparent 70%)' }} />
                                )}
                                <div className="relative flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <RankIcon rank={player.rank} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-semibold truncate ${i === 0 ? 'text-yellow-200' : 'text-neutral-200'}`}>
                                            {player.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span className="text-xs text-neutral-500">
                                                Заработано: {formatMoney(player.totalEarned)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className={`font-bold text-sm ${i === 0 ? 'text-yellow-400' : 'text-neutral-300'}`}>
                                            {formatMoney(player.totalEarned)}
                                        </p>
                                        {player.investorPoints > 0 && (
                                            <p className="text-[10px] text-cyan-500">
                                                ⚡ {player.investorPoints} pts
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Divider */}
                        {players.length > 3 && (
                            <div className="flex items-center gap-2 my-1 px-2">
                                <div className="flex-1 h-px bg-neutral-800" />
                                <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Остальные</span>
                                <div className="flex-1 h-px bg-neutral-800" />
                            </div>
                        )}

                        {/* Ranks 4-20 */}
                        {players.slice(3).map((player) => (
                            <div
                                key={player.rank}
                                className="flex items-center gap-3 bg-neutral-900/60 border border-neutral-800/60 rounded-lg px-3 py-3 hover:border-neutral-700/60 transition-all"
                            >
                                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    <RankIcon rank={player.rank} />
                                </div>
                                <p className="flex-1 text-sm text-neutral-300 truncate">{player.name}</p>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-semibold text-neutral-200">
                                        {formatMoney(player.totalEarned)}
                                    </p>
                                    {player.investorPoints > 0 && (
                                        <p className="text-[10px] text-cyan-500/70">⚡ {player.investorPoints}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
