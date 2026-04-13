import { Conferencepage } from "@/models/conferencepage";
import { Sessionspeaker } from "@/models/sessionspeaker";
import Globals from "@/modules/Globals";
import { NextApiRequest, NextApiResponse } from "next";

const fetchConferencePage = (codename: string): Promise<Conferencepage> => {
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
        const conferencePage = await fetchConferencePage('aim_congress_2025_agenda')
          const allSessions: Sessionspeaker[] = conferencePage.items.value.flatMap(
                  (date: any) => date.sessions.value
                );

        res.status(200).json({ success: true, data: allSessions })
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}


