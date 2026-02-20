const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: String,
    firstName: String,
    languageCode: String,

    // Game State
    cash: { type: Number, default: 0 },
    clickIncome: { type: Number, default: 1 },
    clickMultiplier: { type: Number, default: 1 },
    investorPoints: { type: Number, default: 0 },

    stats: {
        totalEarned: { type: Number, default: 0 },
        totalClicks: { type: Number, default: 0 },
        playtime: { type: Number, default: 0 },
        totalDividendsEarned: { type: Number, default: 0 },
        totalCryptoTradingProfit: { type: Number, default: 0 },
        totalRentEarned: { type: Number, default: 0 },
        totalBusinessEarned: { type: Number, default: 0 }
    },

    // Arrays of owned assets
    stocks: [{
        id: String,
        owned: Number,
        avgCost: Number
    }],
    properties: [{
        id: String,
        owned: Number
    }],
    businesses: [{
        id: String,
        owned: Number,
        upgradesOwned: [String]
    }],
    crypto: [{
        id: String,
        owned: Number,
        avgCost: Number
    }],

    miningRigs: { type: Number, default: 0 },

    lastSaveTime: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
