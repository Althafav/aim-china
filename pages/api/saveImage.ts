import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { dataUrl } = req.body;
        if (!dataUrl) {
            return res.status(400).json({ message: 'Image data is required' });
        }
        
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const filePath = path.join(process.cwd(), 'public', 'assets', 'shared', 'downloaded-image.png');
        
        fs.writeFileSync(filePath, base64Data, 'base64');
        res.status(200).json({ message: 'Image saved successfully' });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ message: 'Failed to save image' });
    }
}
