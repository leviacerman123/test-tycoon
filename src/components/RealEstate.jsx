import { useSelector, useDispatch } from 'react-redux';
import { buyProperty } from '../features/realEstateSlice';
import { subtractCash } from '../features/playerSlice';
import { Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

export const RealEstate = () => {
    const dispatch = useDispatch();
    const { properties } = useSelector((state) => state.realEstate);
    const { cash } = useSelector((state) => state.player);

    const handleBuy = (property) => {
        if (cash >= property.price) {
            triggerHaptic('medium');
            dispatch(subtractCash(property.price));
            dispatch(buyProperty({ id: property.id, amount: 1 }));
        } else {
            triggerHaptic('error');
        }
    };

    return (
        <div className="p-4 pt-8 space-y-4">
            <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                <Building2 className="text-purple-400" /> Real Estate
            </h2>

            <div className="space-y-4">
                {properties.map((property) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={property.id}
                        className="bg-neutral-900/60 backdrop-blur-md rounded-xl overflow-hidden border border-neutral-800"
                    >
                        <div className="h-24 bg-gradient-to-r from-purple-900/20 to-neutral-900/50 relative">
                            <div className="absolute bottom-2 left-4">
                                <h3 className="font-bold text-lg text-white">{property.name}</h3>
                                <p className="text-xs text-purple-300 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {property.type}
                                </p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm">
                                    <p className="text-neutral-500">Rent Income</p>
                                    <p className="text-emerald-400 font-mono">+${property.rent}/sec</p>
                                </div>
                                <div className="text-sm text-right">
                                    <p className="text-neutral-500">Owned</p>
                                    <p className="text-white font-mono">{property.owned}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuy(property)}
                                disabled={cash < property.price}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
                            >
                                Buy for ${property.price.toLocaleString()}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
