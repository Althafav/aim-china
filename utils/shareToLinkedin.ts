// utils/shareToLinkedIn.ts
import { toPng } from 'html-to-image';
import axios from 'axios';

export const handleCaptureAndShare = async (
    ref: React.RefObject<HTMLElement>,

): Promise<void> => {
    if (!ref.current) return;

    try {
        const dataUrl = await toPng(ref.current);
        const formData = new FormData();
        formData.append('image', dataUrl.split(',')[1]);
        const imgbbApiKey = 'c7716617e0c22bbc54ec179223006faa';

        const uploadResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
            formData
        );

        const imageUrl = uploadResponse.data.data.url;

        const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${imageUrl
            }&title=AIMCongress`;

        window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    } catch (error) {
        console.error('Error capturing or sharing image:', error);
    }
};
