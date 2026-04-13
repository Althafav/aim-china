import { Sponsorspage } from "@/models/sponsorspage";
import { Sponsorspageitem } from "@/models/sponsorspageitem";
import Globals from "@/modules/Globals";
import { NextApiRequest, NextApiResponse } from "next";

const cleanContent = (html: string) => {
    return html.replace(/<\/?p>/g, '');
};

const fetchSponsorsPage = (codename: string): Promise<Sponsorspage> => {
    return new Promise((resolve, reject) => {
        Globals.KontentClient.item(codename)
            .withParameter('depth', '4')
            .toObservable()
            .subscribe({
                next: (response: any) => resolve(response.item),
                error: (err: any) => reject(err),
            });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const sponsorPage = (await fetchSponsorsPage('n2025_sponsors_page')).sponsors

        const sponsorsList = sponsorPage.value.map((item: any) => ({

            id: item.system.id,
            pagetitle: item.pagetitle.value,
            name: item.name.value,
            logo: item.logo.value[0].url,
            content: cleanContent(item.content.value),
            website: item.website.value,
            sponsorType: item.sponsor_type.value
        }));

        const { id } = req.query;

        if (id) {
            const sponsorItem = sponsorsList.find((sponsor: any) => sponsor.id === id)
            if (!sponsorItem) {
                return res.status(404).json({ success: false, message: 'not found' })
            }
            return res.status(200).json({ success: true, data: sponsorItem })
        }

        res.status(200).json({ success: true, data: sponsorsList });

    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}