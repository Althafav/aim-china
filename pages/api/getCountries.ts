import { NextApiRequest, NextApiResponse } from "next";


interface Country {
    label: string;
    value: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://api.strategic.ae/api/generic/countries');
        if (!response.ok) {
            throw new Error('Failed to fetch countries')
        }
        const countries: Country[] = await response.json();
        res.status(200).json(countries)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Countries.' })
    }
}