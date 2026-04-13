import Globals from "@/modules/Globals";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const apiUrl = `https://speakers.aimcongress.com/api/website/GetApprovedSpeakers?eventid=2ff15d64-aa6c-4351-8b27-2828cd79ba4b`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch speakers");
    }
    const data: conferenceSpeakerModel2025[] = await response.json();

    const filteredData = data.filter(
      (speaker) => speaker.Email !== "naveed.habib@strategic.ae"
    );

    res.status(200).json(filteredData);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
  }
}
