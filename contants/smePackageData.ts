interface Package {
    id: number;
    name: string;
    price: string;
    registerLink: string;
    features: string[]; // Array of strings
}

export const smePackageData: Package[] = [
    {
        id: 1,
        name: 'Micro Enterprise Package',
        price: '$1,250',
        registerLink: 'https://register.strategic.ae/registration/access-package/7E2E9F53-02C5-4CD3-AD44-CAD198354544',
        features: ['Branded Exhibition Kiosk (1.5 x 1.5 meters)', '1 Standard Pass', '1 Exhibitor Pass', '1 Pre-Arranged B2B Meetings',],
    },
    {
        id: 2,
        name: 'Small Enterprise Package',
        price: '$2,500',
        registerLink: 'https://register.strategic.ae/registration/access-package/08C15785-FE14-40D6-A928-A0460ECAF8EB',
        features: ['Branded Exhibition Kiosk (2 x 2 meters)', '1 Standard Pass', '2 Exhibitor Passes', '1 Pre-Arranged B2B Meetings',],

    },
    {
        id: 3,
        name: 'Medium Enterprise Package',
        price: '$3,750',
        registerLink: 'https://register.strategic.ae/registration/access-package/691637AA-AA84-4AAD-9F0B-657DABD0DC9C',
        features: ['Branded Exhibition Kiosk (3 x 2 meters)', 'TV Screen', '2 Standard Passes', '2 Exhibitor Passes', '2 Pre-Arranged B2B Meetings',],
    },
];