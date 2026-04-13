import Head from "next/head";
import React from "react";

export default function SuccessComponent() {
    const text1 = "We have successfully received your information. Our team is currently reviewing your details and will take the necessary actions promptly."
    const text2 = "Should you have any questions or require further clarification, please don't hesitate to reach out to us through our contact page. "
    const text3 = "We appreciate your interest and engagement with AIM Congress 2024. Stay tuned for more updates and information here on our website and social media."
    return (
        <p>
            Thank you for your submission! <br />
            <br />
            {text1}
            <br />
            {text2}
            <br /><br />
            {text3}<br /><br />
           
        </p>
    );
}
