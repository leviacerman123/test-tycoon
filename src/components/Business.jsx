import { useSelector, useDispatch } from 'react-redux';
import { buyBusinessUnit, buyBusinessUpgrade } from '../features/businessSlice';
import { subtractCash } from '../features/playerSlice';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';
import { Briefcase, Server, Building, Coffee, Car, Truck } from 'lucide-react';
import clsx from 'clsx';

export const Business = () => {
    const dispatch = useDispatch();
    const { businesses } = useSelector((state) => state.business);
    const { cash } = useSelector((state) => state.player);
    const { t } = useTranslation();

    const getIcon = (id) => {
        switch (id) {
            case 'taxi': return <Car className="text-yellow-400" />;
            case 'coffee': return <Coffee className="text-orange-400" />;
            case 'delivery': return <Truck className="text-blue-400" />;
            case 'data': return <Server className="text-cyan-400" />;
            case 'prop_mgmt': return <Building className="text-purple-400" />;
            default: return <Briefcase />;
        }
    };

    const calculateIncome = (business) => {
        let multiplier = 1;
        business.upgrades.forEach(up => {
            if (business.upgradesOwned.includes(up.id)) {
                multiplier *= up.multiplier;
            }
        });
        return business.owned * business.baseIncome * multiplier;
    };

    const getTotalIncome = () => {
        return businesses.reduce((sum, b) => sum + calculateIncome(b), 0);
    };

    const handleBuyUnit = (business) => {
        const cost = Math.floor(business.baseCost * Math.pow(business.costGrowth, business.owned));
        if (cash >= cost) {
            triggerHaptic('medium');
            dispatch(subtractCash(cost));
            dispatch(buyBusinessUnit({ id: business.id }));
        } else {
            triggerHaptic('error');
        }
    };

    const handleBuyUpgrade = (business, upgrade) => {
        if (cash >= upgrade.cost && !business.upgradesOwned.includes(upgrade.id)) {
            triggerHaptic('success');
            dispatch(subtractCash(upgrade.cost));
            dispatch(buyBusinessUpgrade({ businessId: business.id, upgradeId: upgrade.id }));
        } else {
            triggerHaptic('error');
        }
    };

    return (
        <div className="p-4 pt-8 space-y-6 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                    <Briefcase className="text-emerald-500" /> {t('business_title')}
                </h2>
                <div className="text-right">
                    <p className="text-xs text-neutral-500">{t('total_business_income')}</p>
                    <p className="text-lg font-bold text-emerald-400">+${getTotalIncome().toLocaleString()}/s</p>
                </div>
            </div>

            <div className="space-y-4">
                {businesses.map((business) => {
                    const unitCost = Math.floor(business.baseCost * Math.pow(business.costGrowth, business.owned));
                    const currentIncome = calculateIncome(business);

                    return (
                        <motion.div
                            layout
                            key={business.id}
                            className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-4 border border-neutral-800"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center">
                                        {getIcon(business.id)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{t(business.nameKey)}</h3>
                                        <p className="text-xs text-neutral-400">{t(business.descKey)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-emerald-400">+${currentIncome.toLocaleString()}/s</p>
                                    <p className="text-xs text-neutral-500">{t('owned')}: {business.owned}</p>
                                </div>
                            </div>

                            {/* Buy Unit Button */}
                            <button
                                onClick={() => handleBuyUnit(business)}
                                disabled={cash < unitCost}
                                className={clsx(
                                    "w-full py-3 rounded-xl flex items-center justify-between px-4 mb-4 transition-all",
                                    cash >= unitCost
                                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                                        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                )}
                            >
                                <span className="font-bold">{t('buy_unit')}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-normal opacity-80">{t(business.unitNameKey)}</span>
                                    <span className={clsx("font-mono font-bold", cash < unitCost ? "text-red-400" : "text-white")}>
                                        ${unitCost.toLocaleString()}
                                    </span>
                                </div>
                            </button>

                            {/* Upgrades */}
                            <div>
                                <h4 className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-wider">{t('upgrades')}</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {business.upgrades.map((upgrade) => {
                                        const isOwned = business.upgradesOwned.includes(upgrade.id);
                                        return (
                                            <button
                                                key={upgrade.id}
                                                onClick={() => handleBuyUpgrade(business, upgrade)}
                                                disabled={isOwned || cash < upgrade.cost}
                                                className={clsx(
                                                    "flex items-center justify-between p-2 rounded-lg border text-left transition-all",
                                                    isOwned
                                                        ? "bg-emerald-900/20 border-emerald-900/50"
                                                        : cash >= upgrade.cost
                                                            ? "bg-neutral-800 hover:bg-neutral-700 border-neutral-700 hover:border-neutral-600"
                                                            : "bg-neutral-800/50 border-neutral-800 opacity-70"
                                                )}
                                            >
                                                <div>
                                                    <p className={clsx("text-sm font-semibold", isOwned ? "text-emerald-400" : "text-neutral-200")}>
                                                        {t(upgrade.nameKey)}
                                                    </p>
                                                    <p className="text-[10px] text-neutral-500">
                                                        Income x{upgrade.multiplier}
                                                    </p>
                                                </div>
                                                {isOwned ? (
                                                    <span className="text-xs text-emerald-500 font-bold">✓</span>
                                                ) : (
                                                    <span className={clsx("text-xs font-mono", cash >= upgrade.cost ? "text-yellow-400" : "text-neutral-500")}>
                                                        ${upgrade.cost.toLocaleString()}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
