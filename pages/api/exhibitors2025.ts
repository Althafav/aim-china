
import Globals from '@/modules/Globals';
import ExhibitorModel from '@/sysmodels/exhibitorModel';

import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    
    const apiUrl = `https://api.aimcongress.com/api/website/getexhibitors?eventid=d4f936d0-0668-405d-9522-e035efbd4c9c`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch exhibitors');
        }
        const data: Array<ExhibitorModel> = await response.json();

        const filteredData = data.filter(exhibitor => exhibitor.company_email !== 'naveed.habib@strategic.ae');


        res.status(200).json(filteredData);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}