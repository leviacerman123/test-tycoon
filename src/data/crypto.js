export const cryptoData = [
    // Major
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 45000 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3000 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 100 },
    { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', price: 320 },
    { id: 'xrp', name: 'Ripple', symbol: 'XRP', price: 0.60 },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.55 },
    { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 35 },
    { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.50 },

    // Meme / High Volatility
    { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.08 },
    { id: 'shib', name: 'Shiba Inu', symbol: 'SHIB', price: 0.00001 },
    { id: 'pepe', name: 'Pepe', symbol: 'PEPE', price: 0.000001 },
    { id: 'wif', name: 'Dogwifhat', symbol: 'WIF', price: 2.50 },

    // Stable/DeFi
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', price: 1.00 },
    { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 18 },
    { id: 'uni', name: 'Uniswap', symbol: 'UNI', price: 6.50 },
    { id: 'atom', name: 'Cosmos', symbol: 'ATOM', price: 10 },
    { id: 'ltc', name: 'Litecoin', symbol: 'LTC', price: 70 },

    // Gaming / Metaverse
    { id: 'sand', name: 'The Sandbox', symbol: 'SAND', price: 0.45 },
    { id: 'mana', name: 'Decentraland', symbol: 'MANA', price: 0.40 },
    { id: 'axs', name: 'Axie Infinity', symbol: 'AXS', price: 7.50 },

    // Layer 2 / Alt-L1s
    { id: 'matic', name: 'Polygon', symbol: 'MATIC', price: 0.85 },
    { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR', price: 3.20 },
    { id: 'ftm', name: 'Fantom', symbol: 'FTM', price: 0.40 },
    { id: 'algo', name: 'Algorand', symbol: 'ALGO', price: 0.18 },

    // Privacy
    { id: 'xmr', name: 'Monero', symbol: 'XMR', price: 150 },

    // Exchange Tokens
    { id: 'cro', name: 'Cronos', symbol: 'CRO', price: 0.09 },
    { id: 'kcs', name: 'KuCoin Token', symbol: 'KCS', price: 10 },

    // AI / Big Data
    { id: 'rndr', name: 'Render', symbol: 'RNDR', price: 7.50 },
    { id: 'fet', name: 'Fetch.ai', symbol: 'FET', price: 1.20 },
    { id: 'tao', name: 'Bittensor', symbol: 'TAO', price: 400 },

    // DePIN
    { id: 'fil', name: 'Filecoin', symbol: 'FIL', price: 8.50 },
    { id: 'hnt', name: 'Helium', symbol: 'HNT', price: 6.00 },

    // More Memes
    { id: 'bonk', name: 'Bonk', symbol: 'BONK', price: 0.00003 },
    { id: 'floki', name: 'Floki Inu', symbol: 'FLOKI', price: 0.00015 },
].map(c => ({ ...c, owned: 0, avgCost: 0 }));
