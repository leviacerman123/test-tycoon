import { useSelector } from 'react-redux';
import { translations } from '../data/translations';

export const useTranslation = () => {
    const language = useSelector((state) => state.game.language) || 'ru';

    const t = (key) => {
        return translations[language][key] || key;
    };

    return { t, language };
};
