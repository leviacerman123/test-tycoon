import { createSlice } from '@reduxjs/toolkit';
import { stockData } from '../data/stocks';

const marketSlice = createSlice({
    name: 'market',
    initialState: {
        stocks: stockData, // Initial stock data from file
        marketTrend: 'Neutral', // Bull, Bear, Neutral
        news: [],
    },
    reducers: {
        updateStockPrices: (state) => {
            state.stocks.forEach(stock => {
                // Simple random walk
                const volatility = stock.risk === 'High' ? 0.05 : stock.risk === 'Medium' ? 0.02 : 0.01;
                const change = (Math.random() - 0.5) * volatility;
                stock.price = Math.max(1, stock.price * (1 + change));
                stock.trend = change;
            });
        },
        generateNews: (state) => {
            const sectors = ['Tech', 'Finance', 'Industrial', 'Crypto'];
            const types = ['Boom', 'Crash', 'Stable'];
            const sector = sectors[Math.floor(Math.random() * sectors.length)];
            const type = types[Math.floor(Math.random() * types.length)];

            const message = `${sector} sector is experiencing a ${type}!`;
            state.news.unshift({ id: Date.now(), message, sector, type });
            if (state.news.length > 5) state.news.pop();

            state.stocks.forEach(stock => {
                if (stock.sector === sector) {
                    if (type === 'Boom') stock.trend += 0.05;
                    if (type === 'Crash') stock.trend -= 0.05;
                }
            });
        },
        buyStock: (state, action) => {
            const { id, amount } = action.payload;
            const stock = state.stocks.find(s => s.id === id);
            if (stock) {
                // Calculate new average cost
                // New Avg = ((Old Avg * Old Owned) + (Current Price * Amount)) / (Old Owned + Amount)
                const totalCost = (stock.avgCost * stock.owned) + (stock.price * amount);
                stock.owned += amount;
                stock.avgCost = totalCost / stock.owned;
            }
        },
        sellStock: (state, action) => {
            const { id, amount } = action.payload;
            const stock = state.stocks.find(s => s.id === id);
            if (stock && stock.owned >= amount) {
                stock.owned -= amount;
                if (stock.owned === 0) stock.avgCost = 0;
            }
        },
        payDividends: (state) => {
            // Action for playerSlice to listen to
        },
        setMarketState: (state, action) => {
            if (action.payload.stocks) state.stocks = action.payload.stocks;
            if (action.payload.marketTrend) state.marketTrend = action.payload.marketTrend;
            if (action.payload.news) state.news = action.payload.news;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('player/resetPlayer', (state) => {
            state.stocks.forEach(s => {
                s.owned = 0;
                s.avgCost = 0;
            });
            state.news = [];
            state.marketTrend = 'Neutral';
        });
    }
});

export const { updateStockPrices, buyStock, sellStock, generateNews, payDividends, setMarketState } = marketSlice.actions;
export default marketSlice.reducer;
