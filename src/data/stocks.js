export const stockData = [
    // Tech
    { id: 'tech1', ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Tech', price: 2800, risk: 'Medium', dividend: 0 },
    { id: 'tech2', ticker: 'AAPL', name: 'Apple Inc.', sector: 'Tech', price: 175, risk: 'Medium', dividend: 0.15 },
    { id: 'tech3', ticker: 'MSFT', name: 'Microsoft', sector: 'Tech', price: 330, risk: 'Medium', dividend: 0.20 },
    { id: 'tech4', ticker: 'NVDA', name: 'Nvidia', sector: 'Tech', price: 600, risk: 'High', dividend: 0.05 },
    { id: 'tech5', ticker: 'AMD', name: 'AMD', sector: 'Tech', price: 110, risk: 'High', dividend: 0 },
    { id: 'tech6', ticker: 'INTC', name: 'Intel', sector: 'Tech', price: 45, risk: 'Medium', dividend: 0.30 },

    // Finance
    { id: 'fin1', ticker: 'JPM', name: 'JPMorgan', sector: 'Finance', price: 150, risk: 'Low', dividend: 0.50 },
    { id: 'fin2', ticker: 'BAC', name: 'Bank of America', sector: 'Finance', price: 35, risk: 'Low', dividend: 0.15 },
    { id: 'fin3', ticker: 'V', name: 'Visa', sector: 'Finance', price: 250, risk: 'Medium', dividend: 0.20 },
    { id: 'fin4', ticker: 'MA', name: 'Mastercard', sector: 'Finance', price: 400, risk: 'Medium', dividend: 0.25 },
    { id: 'fin5', ticker: 'GS', name: 'Goldman Sachs', sector: 'Finance', price: 350, risk: 'Medium', dividend: 0.80 },

    // Industrial
    { id: 'ind1', ticker: 'TSLA', name: 'Tesla', sector: 'Industrial', price: 900, risk: 'High', dividend: 0 },
    { id: 'ind2', ticker: 'BA', name: 'Boeing', sector: 'Industrial', price: 200, risk: 'Medium', dividend: 0 },
    { id: 'ind3', ticker: 'CAT', name: 'Caterpillar', sector: 'Industrial', price: 220, risk: 'Medium', dividend: 0.60 },
    { id: 'ind4', ticker: 'GE', name: 'General Electric', sector: 'Industrial', price: 100, risk: 'Medium', dividend: 0.10 },
    { id: 'ind5', ticker: 'LMT', name: 'Lockheed Martin', sector: 'Industrial', price: 450, risk: 'Low', dividend: 1.20 },

    // Energy
    { id: 'nrg1', ticker: 'XOM', name: 'Exxon Mobil', sector: 'Energy', price: 105, risk: 'Low', dividend: 0.90 },
    { id: 'nrg2', ticker: 'CVX', name: 'Chevron', sector: 'Energy', price: 150, risk: 'Low', dividend: 1.10 },
    { id: 'nrg3', ticker: 'SHEL', name: 'Shell', sector: 'Energy', price: 65, risk: 'Medium', dividend: 0.50 },
    { id: 'nrg4', ticker: 'BP', name: 'BP', sector: 'Energy', price: 35, risk: 'Medium', dividend: 0.30 },

    // Healthcare
    { id: 'hlth1', ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 160, risk: 'Low', dividend: 0.70 },
    { id: 'hlth2', ticker: 'PFE', name: 'Pfizer', sector: 'Healthcare', price: 40, risk: 'Low', dividend: 0.25 },
    { id: 'hlth3', ticker: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', price: 500, risk: 'Medium', dividend: 0.85 },
    { id: 'hlth4', ticker: 'MRK', name: 'Merck', sector: 'Healthcare', price: 110, risk: 'Low', dividend: 0.40 },

    // Retail
    { id: 'ret1', ticker: 'AMZN', name: 'Amazon', sector: 'Retail', price: 145, risk: 'Medium', dividend: 0 },
    { id: 'ret2', ticker: 'WMT', name: 'Walmart', sector: 'Retail', price: 160, risk: 'Low', dividend: 0.45 },
    { id: 'ret3', ticker: 'TGT', name: 'Target', sector: 'Retail', price: 130, risk: 'Medium', dividend: 0.50 },
    { id: 'ret4', ticker: 'COST', name: 'Costco', sector: 'Retail', price: 600, risk: 'Medium', dividend: 0.60 },

    // ETF
    { id: 'etf1', ticker: 'VOO', name: 'S&P 500 ETF', sector: 'ETF', price: 400, risk: 'Low', dividend: 0.55 },
    { id: 'etf2', ticker: 'QQQ', name: 'Nasdaq 100 ETF', sector: 'ETF', price: 380, risk: 'Medium', dividend: 0.30 },
    { id: 'etf3', ticker: 'VTI', name: 'Total Market ETF', sector: 'ETF', price: 220, risk: 'Low', dividend: 0.40 },

    // Consumer Goods
    { id: 'cons1', ticker: 'KO', name: 'Coca-Cola', sector: 'Consumer', price: 60, risk: 'Low', dividend: 0.55 },
    { id: 'cons2', ticker: 'PEP', name: 'PepsiCo', sector: 'Consumer', price: 170, risk: 'Low', dividend: 0.50 },
    { id: 'cons3', ticker: 'PG', name: 'Procter & Gamble', sector: 'Consumer', price: 155, risk: 'Low', dividend: 0.45 },

    // Telecom
    { id: 'tel1', ticker: 'T', name: 'AT&T', sector: 'Telecom', price: 17, risk: 'Low', dividend: 1.10 },
    { id: 'tel2', ticker: 'VZ', name: 'Verizon', sector: 'Telecom', price: 38, risk: 'Low', dividend: 1.05 },

    // Entertainment
    { id: 'ent1', ticker: 'DIS', name: 'Disney', sector: 'Entertainment', price: 90, risk: 'Medium', dividend: 0.10 },
    { id: 'ent2', ticker: 'NFLX', name: 'Netflix', sector: 'Entertainment', price: 580, risk: 'High', dividend: 0 },

    // Automotive
    { id: 'auto1', ticker: 'TM', name: 'Toyota', sector: 'Automotive', price: 240, risk: 'Medium', dividend: 0.40 },
    { id: 'auto2', ticker: 'F', name: 'Ford', sector: 'Automotive', price: 12, risk: 'Medium', dividend: 0.65 },
    { id: 'auto3', ticker: 'GM', name: 'General Motors', sector: 'Automotive', price: 40, risk: 'Medium', dividend: 0.50 },

    // Semiconductors
    { id: 'semi1', ticker: 'TSM', name: 'TSMC', sector: 'Tech', price: 140, risk: 'Medium', dividend: 0.20 },
    { id: 'semi2', ticker: 'QCOM', name: 'Qualcomm', sector: 'Tech', price: 150, risk: 'Medium', dividend: 0.25 },
    { id: 'semi3', ticker: 'AVGO', name: 'Broadcom', sector: 'Tech', price: 1200, risk: 'High', dividend: 0.30 },

    // Aerospace & Defense
    { id: 'aero1', ticker: 'RTX', name: 'Raytheon', sector: 'Industrial', price: 95, risk: 'Low', dividend: 0.60 },
    { id: 'aero2', ticker: 'NOC', name: 'Northrop Grumman', sector: 'Industrial', price: 460, risk: 'Low', dividend: 0.50 },

    // Luxury
    { id: 'lux1', ticker: 'LVMUY', name: 'LVMH', sector: 'Retail', price: 170, risk: 'Medium', dividend: 0.20 },
    { id: 'lux2', ticker: 'HESAY', name: 'Hermes', sector: 'Retail', price: 220, risk: 'Medium', dividend: 0.15 },

    // Pharma / Biotech
    { id: 'pharma1', ticker: 'MRNA', name: 'Moderna', sector: 'Healthcare', price: 100, risk: 'High', dividend: 0 },
    { id: 'pharma2', ticker: 'AZN', name: 'AstraZeneca', sector: 'Healthcare', price: 65, risk: 'Low', dividend: 0.40 },
].map(s => ({ ...s, owned: 0, trend: 0, avgCost: 0 }));
