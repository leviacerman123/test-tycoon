const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validateTelegramWebAppData = require('../middleware/auth');

// Sync (Load/Save) Game Data
// POST /api/user/sync
router.post('/sync', validateTelegramWebAppData, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User data missing from auth token' });
        }

        const telegramId = req.user.id.toString();
        const { gameData } = req.body; // Client sends their local state

        // Find user in DB
        let user = await User.findOne({ telegramId });

        if (!user) {
            // New User: Create
            console.log(`Creating new user: ${telegramId}`);
            user = new User({
                telegramId,
                username: req.user.username,
                firstName: req.user.first_name,
                languageCode: req.user.language_code,
                ...gameData // Initial data if provided
            });
            await user.save();
            return res.json({ success: true, data: user, action: 'created' });
        }

        // Existing User: Compare saves
        const clientSaveTime = gameData?.lastSaveTime ? new Date(gameData.lastSaveTime).getTime() : 0;
        const serverSaveTime = user.lastSaveTime ? new Date(user.lastSaveTime).getTime() : 0;

        if (clientSaveTime > serverSaveTime) {
            // Client is newer: Update Server
            // console.log(`Updating server for ${telegramId} (Client is newer)`);
            Object.assign(user, gameData);
            user.lastSaveTime = new Date(); // Update save time to now
            await user.save();
            return res.json({ success: true, data: user, action: 'saved_to_cloud' });
        } else {
            // Server is newer or equal: Send Server Data to Client
            // console.log(`Serving cloud data for ${telegramId} (Server is newer/equal)`);
            return res.json({ success: true, data: user, action: 'loaded_from_cloud' });
        }

    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/user/leaderboard — Top 20 players by total earned (public)
router.get('/leaderboard', async (req, res) => {
    try {
        const topPlayers = await User.find()
            .sort({ 'stats.totalEarned': -1 })
            .limit(20)
            .select('username firstName stats.totalEarned cash investorPoints telegramId')
            .lean();

        const leaderboard = topPlayers.map((player, index) => ({
            rank: index + 1,
            name: player.username
                ? `@${player.username}`
                : (player.firstName || `Player ${player.telegramId.slice(-4)}`),
            totalEarned: player.stats?.totalEarned || 0,
            cash: player.cash || 0,
            investorPoints: player.investorPoints || 0,
        }));

        res.json({ success: true, data: leaderboard });
    } catch (error) {
        console.error('Leaderboard Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
