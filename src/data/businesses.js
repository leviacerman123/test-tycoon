export const businessData = [
    {
        id: 'taxi',
        nameKey: 'taxi_name',
        descKey: 'taxi_desc',
        baseCost: 500,
        costGrowth: 1.15,
        baseIncome: 2,
        type: 'unit', // buy cars
        unitNameKey: 'taxi_unit',
        upgrades: [
            { id: 'taxi_up1', nameKey: 'taxi_up1_name', cost: 2000, multiplier: 1.5, type: 'multiplier' },
            { id: 'taxi_up2', nameKey: 'taxi_up2_name', cost: 10000, multiplier: 2.0, type: 'multiplier' },
            { id: 'taxi_up3', nameKey: 'taxi_up3_name', cost: 50000, multiplier: 3.0, type: 'multiplier' },
        ]
    },
    {
        id: 'coffee',
        nameKey: 'coffee_name',
        descKey: 'coffee_desc',
        baseCost: 2500,
        costGrowth: 1.18,
        baseIncome: 12,
        type: 'unit', // open shops
        unitNameKey: 'coffee_unit',
        upgrades: [
            { id: 'coffee_up1', nameKey: 'coffee_up1_name', cost: 8000, multiplier: 1.4, type: 'multiplier' },
            { id: 'coffee_up2', nameKey: 'coffee_up2_name', cost: 25000, multiplier: 1.8, type: 'multiplier' },
            { id: 'coffee_up3', nameKey: 'coffee_up3_name', cost: 100000, multiplier: 2.5, type: 'multiplier' },
        ]
    },
    {
        id: 'delivery',
        nameKey: 'delivery_name',
        descKey: 'delivery_desc',
        baseCost: 10000,
        costGrowth: 1.20,
        baseIncome: 45,
        type: 'unit', // hire couriers
        unitNameKey: 'delivery_unit',
        upgrades: [
            { id: 'delivery_up1', nameKey: 'delivery_up1_name', cost: 30000, multiplier: 1.3, type: 'multiplier' },
            { id: 'delivery_up2', nameKey: 'delivery_up2_name', cost: 120000, multiplier: 1.6, type: 'multiplier' },
            { id: 'delivery_up3', nameKey: 'delivery_up3_name', cost: 500000, multiplier: 2.2, type: 'multiplier' },
        ]
    },
    {
        id: 'data',
        nameKey: 'data_name',
        descKey: 'data_desc',
        baseCost: 50000,
        costGrowth: 1.22, // Slower scaling for high text
        baseIncome: 200,
        type: 'unit', // buy racks
        unitNameKey: 'data_unit',
        upgrades: [
            { id: 'data_up1', nameKey: 'data_up1_name', cost: 150000, multiplier: 1.5, type: 'multiplier' },
            { id: 'data_up2', nameKey: 'data_up2_name', cost: 600000, multiplier: 2.0, type: 'multiplier' },
            { id: 'data_up3', nameKey: 'data_up3_name', cost: 2500000, multiplier: 3.0, type: 'multiplier' },
        ]
    },
    {
        id: 'prop_mgmt',
        nameKey: 'prop_mgmt_name',
        descKey: 'prop_mgmt_desc',
        baseCost: 250000,
        costGrowth: 1.25,
        baseIncome: 850,
        type: 'unit', // contracts
        unitNameKey: 'prop_mgmt_unit',
        upgrades: [
            { id: 'prop_up1', nameKey: 'prop_up1_name', cost: 800000, multiplier: 1.4, type: 'multiplier' },
            { id: 'prop_up2', nameKey: 'prop_up2_name', cost: 3000000, multiplier: 1.8, type: 'multiplier' },
            { id: 'prop_up3', nameKey: 'prop_up3_name', cost: 10000000, multiplier: 2.5, type: 'multiplier' },
        ]
    }
];
