const crypto = require('crypto-js');

// Validate Telegram Web App Data
const validateTelegramWebAppData = (req, res, next) => {
    const initData = req.header('Authorization');

    if (!initData) {
        return res.status(401).json({ message: 'No authorization data provided' });
    }

    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
        console.error('BOT_TOKEN is not defined in environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
        // Parse initData string
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');

        if (!hash) {
            return res.status(401).json({ message: 'No hash provided' });
        }

        // Create data check string
        urlParams.delete('hash');
        const dataCheckArr = [];
        for (const [key, value] of urlParams.entries()) {
            dataCheckArr.push(`${key}=${value}`);
        }
        dataCheckArr.sort();
        const dataCheckString = dataCheckArr.join('\n');

        // Verify Hash
        // HMAC-SHA256 signature w/ bot token
        const secretKey = crypto.HmacSHA256(botToken, "WebAppData");
        const calculatedHash = crypto.HmacSHA256(dataCheckString, secretKey).toString(crypto.enc.Hex);

        if (calculatedHash === hash) {
            // Valid request
            // Parse user data if available
            const userStr = urlParams.get('user');
            if (userStr) {
                req.user = JSON.parse(userStr);
            }
            next();
        } else {
            console.warn('Invalid hash provided:', hash, 'Calculated:', calculatedHash);
            return res.status(403).json({ message: 'Invalid authentication signature' });
        }
    } catch (error) {
        console.error('Auth Error:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = validateTelegramWebAppData;
