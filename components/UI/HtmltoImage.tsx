// components/ShareToLinkedIn.tsx
import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import axios from 'axios';

const ShareToLinkedIn: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const handleCaptureAndShare = async () => {
        if (!ref.current) return;

        setLoading(true);
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


            const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                imageUrl
            )}&title=Check%20out%20this%20image!`;


            window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
        } catch (error) {
            console.error('Error capturing or sharing image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div ref={ref} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h1>HTML Content to Share as an Image</h1>
                <p>This content will be converted to an image and shared on LinkedIn.</p>
            </div>
            <button onClick={handleCaptureAndShare} disabled={loading}>
                {loading ? 'Processing...' : 'Share to LinkedIn'}
            </button>
        </div>
    );
};

export default ShareToLinkedIn;
