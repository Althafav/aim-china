
interface Portfolio {
    id: number;
    portfolioName: string;
    price: string;
    colorCode: string;
    registerLink: string;
    features: string[]; // Array of strings
}

interface Features {
    name: string;
    logo: string;
}

interface Package {
    id: number;
    name: string;
    price: string;
    registerLink: string;
    portfolio: Portfolio[]
    features: string[]; // Array of strings
}

export const Packages: Package[] = [
    {
        id: 1,
        name: 'Single Portfolio',
        price: '',
        registerLink: '',
        portfolio: [
            {
                id: 1,
                portfolioName: 'Foreign Direct Investment',
                price: '$1,999',
                colorCode: '#FF2C28',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'FDI Conference Track', 'FDI Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 2,
                portfolioName: 'Global Trade',
                price: '$999',
                colorCode: '#FFC42C',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Global Trade Conference Track', 'Global Trade Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 3,
                portfolioName: 'Global Manufacturing',
                price: '$999',
                colorCode: '#12BCD4',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Global Manufacturing Conference Track', 'Global Manufacturing Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 4,
                portfolioName: 'Future Finance',
                price: '$999',
                colorCode: '#7428F4',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Future Finance Conference Track', 'Future Finance Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 5,
                portfolioName: 'Future Cities',
                price: '$999',
                colorCode: '#00C753',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Future Cities Conference Track', 'Future Cities Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 6,
                portfolioName: 'Entrepreneurs',
                price: '$999',
                colorCode: '#00D5BA',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Entrepreneurs Conference Track', 'Entrepreneurs Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 7,
                portfolioName: 'Startups & Unicorns',
                price: '$999',
                colorCode: '#FF8521',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Startups & Unicorns Conference Track', 'Startups & Unicorns Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 8,
                portfolioName: 'Digital Economy',
                price: '$999',
                colorCode: '#328350',
                registerLink: '',
                features: ['Grand Opening Ceremony', 'Global Trade Conference Track', 'Digital Economy Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },
        ],
        features: [],

    },
    {
        id: 2,
        name: 'Multi-Portfolio ',
        price: '$2,999',
        registerLink: '',
        portfolio: [],
        features: ['Grand Opening Ceremony', 'FDI Conference Track', 'Global Trade Conference Track', 'Global Manufacturing Conference Track', 'Future Finance Conference Track', 'Future Cities Conference Track', 'Entrepreneurs Conference Track', 'Startups & Unicorns Conference Track', 'Digital Economy Conference Track', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',],

    },
    {
        id: 3,
        name: 'Premium VIP ',
        price: '$3,999',
        registerLink: '',
        portfolio: [],
        features: ['Pre-Conference Workshops', 'FDI Conference Track', 'Global Trade Conference Track', 'Global Manufacturing Conference Track', 'Future Finance Conference Track', 'Future Cities Conference Track', 'Entrepreneurs Conference Track', 'Startups & Unicorns Conference Track', 'Digital Economy Conference Track', 'Grand Opening Ceremony', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony', 'Fast Track Registration and Badge Collection Counter', 'Access to Private Meeting Room (subject to availability)', 'Dedicated Seating Area (Opening & Closing Ceremony)', 'Access to Recorded Videos (AIM Sessions) Post Event', 'VIP Lunch', 'Gold Lounge', 'Membership to AIM Global Foundation'],

    },
];

export const featureSet = [
    'Grand Opening Ceremony', 'FDI Conference Track', 'Global Trade Conference Track', 'Global Manufacturing Conference Track', 'Future Finance Conference Track', 'Future Cities Conference Track', 'Entrepreneurs Conference Track', 'Startups & Unicorns Conference Track', 'Digital Economy Conference Track', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony', 'Pre-Conference Workshops', 'Fast Track Registration and Badge Collection Counter', 'Access to Private Meeting Room (subject to availability)', 'Dedicated Seating Area (Opening & Closing Ceremony)', 'Access to Recorded Videos (AIM Sessions) Post Event', 'VIP Lunch', 'Gold Lounge', 'Membership to AIM Global Foundation'
];




// packages-3 




export const Packages3: Package[] = [
    {
        id: 1,
        name: 'Single Portfolio',
        price: '',
        registerLink: '',
        portfolio: [
            {
                id: 1,
                portfolioName: 'Foreign Direct Investment',
                price: '$1,999',
                colorCode: '#FF2C28',
                registerLink: 'https://register.strategic.ae/registration/access-package/123DBE4F-3603-4DEC-B6B1-D09E819FD6AE',
                features: ['Grand Opening Ceremony', 'FDI Conference Track', 'FDI Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App',  'Delegates Lunch', 'Gala Dinner', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 2,
                portfolioName: 'Global Trade',
                price: '$999',
                colorCode: '#FFC42C',
                registerLink: 'https://register.strategic.ae/registration/access-package/996E0369-750D-4C11-BCDE-8C7F25D725D8',
                features: ['Grand Opening Ceremony', 'Global Trade Conference Track', 'Global Trade Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'TradeTech Forum', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 3,
                portfolioName: 'Global Manufacturing',
                price: '$999',
                colorCode: '#12BCD4',
                registerLink: 'https://register.strategic.ae/registration/access-package/9C54DB9A-72A8-4D02-81F4-0BA7A409D25F',
                features: ['Grand Opening Ceremony', 'Global Manufacturing Conference Track', 'Global Manufacturing Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 4,
                portfolioName: 'Future Cities',
                price: '$999',
                colorCode: '#00C753',
                registerLink: 'https://register.strategic.ae/registration/access-package/D0419255-FAD9-4B4F-BBC0-6682C5C7F7ED',
                features: ['Grand Opening Ceremony', 'Future Cities Conference Track', 'Future Cities Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 5,
                portfolioName: 'Digital Economy',
                price: '$999',
                colorCode: '#328350',
                registerLink: 'https://register.strategic.ae/registration/access-package/8CF85619-AA9D-46AB-8B51-B5C251D1B768',
                features: ['Grand Opening Ceremony', 'Global Trade Conference Track', 'Digital Economy Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 6,
                portfolioName: 'Future Finance',
                price: '$999',
                colorCode: '#7428F4',
                registerLink: 'https://register.strategic.ae/registration/access-package/67F0413F-4DFB-45F1-A519-10696F0A6FBE',
                features: ['Grand Opening Ceremony', 'Future Finance Conference Track', 'Future Finance Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 7,
                portfolioName: 'Startups & Unicorns',
                price: '$999',
                colorCode: '#FF8521',
                registerLink: 'https://register.strategic.ae/registration/access-package/74360EF6-8C8A-4ED4-B102-8EA5E830ADA6',
                features: ['Grand Opening Ceremony', 'Startups & Unicorns Conference Track', 'Startups & Unicorns Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },

            {
                id: 8,
                portfolioName: 'Entrepreneurs',
                price: '$999',
                colorCode: '#00D5BA',
                registerLink: 'https://register.strategic.ae/registration/access-package/AF311779-328B-40E4-8312-3AED5F114E8B',
                features: ['Grand Opening Ceremony', 'Entrepreneurs Conference Track', 'Entrepreneurs Workshops ', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony',]
            },
        ],
        features: [],

    },
    {
        id: 2,
        name: 'Multi-Portfolio ',
        price: '$2,999',
        registerLink: 'https://register.strategic.ae/registration/access-package/3EDDBD64-C440-4537-A474-AE1C45B0D6BC',
        portfolio: [],
        features: ['Grand Opening Ceremony', 'All Conference Track', 'All Workshops', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'Gala Dinner', 'B2B Lounge', 'Trade Tech Forum', 'Side Events', 'Closing Ceremony',],

    },
    {
        id: 3,
        name: 'Premium VIP ',
        price: '$3,999',
        registerLink: 'https://register.strategic.ae/registration/access-package/4A4B1793-1F2D-48C9-8C77-BA6F71583572',
        portfolio: [],
        features: ['Pre-Conference Workshops', 'All Multi-Portfolio Pass Access', 'Fast Track Registration and Badge Collection Counter', 'Dedicated Seating Area (Opening & Closing Ceremony)', 'Access to Recorded Videos (AIM Sessions) Post Event', 'Access to AIM Connect Lounge (VIP)', 'VIP Lunch', 'Gala Dinner', 'Membership to AIM Global Foundation'],

    },
];

export const featureSet3 = [
    'Grand Opening Ceremony', 'FDI Conference Track', 'Global Trade Conference Track', 'Global Manufacturing Conference Track', 'Future Finance Conference Track', 'Future Cities Conference Track', 'Entrepreneurs Conference Track', 'Startups & Unicorns Conference Track', 'Digital Economy Conference Track', 'Exhibition', 'Investment Destination', 'AIM Networking App', 'Delegates Lunch', 'B2B Lounge', 'Side Events', 'Closing Ceremony', 'Pre-Conference Workshops', 'Fast Track Registration and Badge Collection Counter', 'Access to Private Meeting Room (subject to availability)', 'Dedicated Seating Area (Opening & Closing Ceremony)', 'Access to Recorded Videos (AIM Sessions) Post Event', 'VIP Lunch', 'Gold Lounge', 'Membership to AIM Global Foundation'
];

