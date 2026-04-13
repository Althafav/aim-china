
import type { NextApiRequest, NextApiResponse } from 'next';

import Globals from '@/modules/Globals';
import { Serviceitem } from '@/models/serviceitem';
import { Portfoliopage } from '@/models/portfoliopage';
import { EntrepreneurPortfolio } from '@/models/entrepreneur_portfolio';
import { Conferenceparticipantspartners2025 } from '@/models/conferenceparticipantspartners2025';

const cleanContent = (html: string) => {
    return html.replace(/<\/?p>/g, '');
};


const categorizeItems = (items: Serviceitem[]): { Category: string; Items: { id: string; name: string; website: string; content: string; category: string; logo: { name: string; type: string; description: string | null; url: string } }[] }[] => {
    const myOrder = [
        'Supporting Partner', 'Conference Participants', 'Knowledge Partner', 'Event Partner', 'Investment Community Partner',
        'Strategic Partner', 'Community Partner'
    ];

    const categorized: { [key: string]: { id: string; name: string; website: string; content: string; category: string; logo: { name: string; type: string; description: string | null; url: string } }[] } = {};


    items.forEach((item) => {
        item.category.value.forEach((category) => {
            if (!categorized[category.name]) {
                categorized[category.name] = [];
            }
            categorized[category.name].push({
                id: item.system.id,
                name: item.name.value,
                website: item.link.value || '',
                content: item.content.value,
                category: item.category.value[0].name,
                logo: {
                    name: item.image.value[0]?.name || '',
                    type: item.image.value[0]?.type || '',
                    description: item.image.value[0]?.description || null,
                    url: item.image.value[0]?.url || ''
                }
            });
        });
    });


    const sortedCategorized = myOrder.map((category) => ({
        Category: category,
        Items: categorized[category] || []
    }));

    return sortedCategorized;
};


const fetchPortfolio = (codename: string): Promise<Portfoliopage | EntrepreneurPortfolio | any> => {
    return new Promise((resolve, reject) => {
        Globals.KontentClient.item(codename)
            .toObservable()
            .subscribe({
                next: (response: any) => resolve(response.item),
                error: (err: any) => reject(err),
            });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    try {

        if (id) {
            const portfolioItems = await Promise.all([
                fetchPortfolio('conference_participants_partners_2025'),
                fetchPortfolio('fdi_portfolio'),
                fetchPortfolio('global_trade_portfolio'),
                fetchPortfolio('advanced_manufacturing_portfolio'),
                fetchPortfolio('future_cities_porfolio'),
                fetchPortfolio('digital_economy_portfolio'),
                fetchPortfolio('future_finance_portfolio'),
                fetchPortfolio('entrepreneur_portfolio'),
            ]);

            const allItems: Serviceitem[] = [
                ...(portfolioItems[0]?.items.value || []),
                ...(portfolioItems[1]?.currentparntersitems.value || []),
                ...(portfolioItems[2]?.currentparntersitems.value || []),
                ...(portfolioItems[3]?.currentparntersitems.value || []),
                ...(portfolioItems[4]?.currentparntersitems.value || []),
                ...(portfolioItems[5]?.currentparntersitems.value || []),
                ...(portfolioItems[6]?.keyplayersitems.value || []),
                ...(portfolioItems[7]?.keyplayersitems.value || []),
            ];

            const foundItem = allItems.find((item) => item.system.id === id);
            if (foundItem) {
                const cleanedContent = cleanContent(foundItem.content.value);
                res.status(200).json({
                    success: true,
                    data: {
                        id: foundItem.system.id,
                        name: foundItem.name.value,
                        website: foundItem.link.value || '',
                        content: cleanedContent,
                        category: foundItem.category.value,
                        logo: {
                            name: foundItem.image.value[0]?.name || '',
                            type: foundItem.image.value[0]?.type || '',
                            description: foundItem.image.value[0]?.description || null,
                            url: foundItem.image.value[0]?.url || '',
                        },
                    },
                });
            } else {
                res.status(404).json({ success: false, message: 'Item not found' });
            }
        } else {
            const [ConferenceData, FDIData, GTData, GMData, FCData, DEData, FFData, SMEData] = await Promise.all([
                fetchPortfolio('conference_participants_partners_2025'),
                fetchPortfolio('fdi_portfolio'),
                fetchPortfolio('global_trade_portfolio'),
                fetchPortfolio('advanced_manufacturing_portfolio'),
                fetchPortfolio('future_cities_porfolio'),
                fetchPortfolio('digital_economy_portfolio'),
                fetchPortfolio('future_finance_portfolio'),
                fetchPortfolio('entrepreneur_portfolio'),
            ]);

            const allItems: Serviceitem[] = [
                ...(ConferenceData?.items.value || []),
                ...(FDIData?.currentparntersitems.value || []),
                ...(GTData?.currentparntersitems.value || []),
                ...(GMData?.currentparntersitems.value || []),
                ...(FCData?.currentparntersitems.value || []),
                ...(DEData?.currentparntersitems.value || []),
                ...(FFData?.keyplayersitems.value || []),
                ...(SMEData?.keyplayersitems.value || []),
            ];

            const categorizedData = categorizeItems(allItems);

            res.status(200).json({ success: true, data: categorizedData });
        }


    } catch (error: any) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
