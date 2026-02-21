const propertyTypes = {
    APT: 'Apartment',
    OFFICE: 'Office',
    MALL: 'Mall',
    HOTEL: 'Hotel',
    FACTORY: 'Factory'
};

const zones = {
    DT: 'Downtown',
    SUB: 'Suburbs',
    IND: 'Industrial',
    BEACH: 'Beachfront',
    MTN: 'Mountain',
    RURAL: 'Rural'
};

// Прогрессивная окупаемость:
// ≤ $400K   → ~4 мин  (/240)
// $400K–1.5M → ~6 мин  (/360)
// $1.5M–5M  → ~8 мин  (/480)
// $5M–20M   → ~12 мин (/720)
// $20M–100M → ~20 мин (/1200)
// $100M+    → ~35 мин (/2100)
export const realEstateData = [
    // Downtown
    { id: 'dt_apt1', name: 'Downtown Studio', type: propertyTypes.APT, zone: zones.DT, price: 150000, rent: 625 },
    { id: 'dt_apt2', name: 'Luxury Penthouse', type: propertyTypes.APT, zone: zones.DT, price: 800000, rent: 2222 },
    { id: 'dt_off1', name: 'Co-working Space', type: propertyTypes.OFFICE, zone: zones.DT, price: 500000, rent: 1389 },
    { id: 'dt_off2', name: 'Skyscraper Floor', type: propertyTypes.OFFICE, zone: zones.DT, price: 2500000, rent: 5208 },
    { id: 'dt_hotel1', name: 'Boutique Hotel', type: propertyTypes.HOTEL, zone: zones.DT, price: 5000000, rent: 6944 },

    // Suburbs
    { id: 'sub_apt1', name: 'Suburban Duplex', type: propertyTypes.APT, zone: zones.SUB, price: 250000, rent: 1042 },
    { id: 'sub_apt2', name: 'Garden Condo', type: propertyTypes.APT, zone: zones.SUB, price: 180000, rent: 750 },
    { id: 'sub_mall1', name: 'Strip Mall', type: propertyTypes.MALL, zone: zones.SUB, price: 1200000, rent: 3333 },
    { id: 'sub_mall2', name: 'Family Plaza', type: propertyTypes.MALL, zone: zones.SUB, price: 3000000, rent: 6250 },
    { id: 'sub_hotel1', name: 'Motel 6', type: propertyTypes.HOTEL, zone: zones.SUB, price: 800000, rent: 2222 },

    // Industrial
    { id: 'ind_fac1', name: 'Small Warehouse', type: propertyTypes.FACTORY, zone: zones.IND, price: 400000, rent: 1667 },
    { id: 'ind_fac2', name: 'Assembly Plant', type: propertyTypes.FACTORY, zone: zones.IND, price: 1500000, rent: 3125 },
    { id: 'ind_fac3', name: 'Logistics Hub', type: propertyTypes.FACTORY, zone: zones.IND, price: 4000000, rent: 8333 },
    { id: 'ind_off1', name: 'Site Office', type: propertyTypes.OFFICE, zone: zones.IND, price: 200000, rent: 833 },
    { id: 'ind_apt1', name: 'Worker Dorms', type: propertyTypes.APT, zone: zones.IND, price: 300000, rent: 1250 },

    // Luxury / Special
    { id: 'lux_mall1', name: 'Mega Mall', type: propertyTypes.MALL, zone: zones.DT, price: 15000000, rent: 20833 },
    { id: 'lux_hotel1', name: 'Resort & Spa', type: propertyTypes.HOTEL, zone: zones.SUB, price: 10000000, rent: 13889 },
    { id: 'lux_fac1', name: 'Gigafactory', type: propertyTypes.FACTORY, zone: zones.IND, price: 25000000, rent: 20833 },

    // Beachfront
    { id: 'beach_shack', name: 'Surf Shack', type: propertyTypes.APT, zone: zones.BEACH, price: 350000, rent: 1458 },
    { id: 'beach_villa', name: 'Beach Villa', type: propertyTypes.APT, zone: zones.BEACH, price: 1200000, rent: 3333 },
    { id: 'beach_hotel', name: 'Luxury Resort', type: propertyTypes.HOTEL, zone: zones.BEACH, price: 8000000, rent: 11111 },

    // Commercial Specials
    { id: 'comm_super', name: 'Supermarket', type: propertyTypes.MALL, zone: zones.SUB, price: 2000000, rent: 4167 },
    { id: 'comm_cinema', name: 'Cinema Complex', type: propertyTypes.MALL, zone: zones.DT, price: 4500000, rent: 9375 },

    // Ultra High End
    { id: 'special_island', name: 'Private Island', type: propertyTypes.HOTEL, zone: zones.BEACH, price: 50000000, rent: 41667 },
    { id: 'special_stadium', name: 'Sports Stadium', type: propertyTypes.MALL, zone: zones.DT, price: 100000000, rent: 47619 },
    { id: 'special_space', name: 'Space Port', type: propertyTypes.FACTORY, zone: zones.IND, price: 500000000, rent: 238095 },

    // Mountain / Ski
    { id: 'mtn_chalet', name: 'Ski Chalet', type: propertyTypes.APT, zone: zones.MTN, price: 600000, rent: 1667 },
    { id: 'mtn_lodge', name: 'Mountain Lodge', type: propertyTypes.HOTEL, zone: zones.MTN, price: 2500000, rent: 5208 },

    // Rural / Agriculture
    { id: 'rural_farm', name: 'Farmhouse', type: propertyTypes.APT, zone: zones.RURAL, price: 200000, rent: 833 },
    { id: 'rural_ranch', name: 'Cattle Ranch', type: propertyTypes.FACTORY, zone: zones.RURAL, price: 1500000, rent: 3125 },
    { id: 'rural_vine', name: 'Vineyard', type: propertyTypes.MALL, zone: zones.RURAL, price: 5000000, rent: 6944 },

    // Infrastructure
    { id: 'infra_solar', name: 'Solar Farm', type: propertyTypes.FACTORY, zone: zones.IND, price: 3000000, rent: 6250 },
    { id: 'infra_park', name: 'Parking Garage', type: propertyTypes.OFFICE, zone: zones.DT, price: 1800000, rent: 3750 },
].map(p => ({ ...p, owned: 0 }));
