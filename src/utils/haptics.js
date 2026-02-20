export const triggerHaptic = (style = 'light') => {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
    }
};

export const triggerNotification = (type = 'success') => {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
    }
}
