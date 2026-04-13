import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaThreads, FaXTwitter } from 'react-icons/fa6'
import { Basiccontentpage } from '@/models/basiccontentpage'
import Globals from '@/modules/Globals'
import SpinnerComponent from '@/components/UI/SpinnerComponent'
import Helper from '../modules/Helper';


export default function ThankYouPage() {


    const lowerText = "Stay tuned for more updates and information here on our website and social media."



    const [pageData, setPageData] = useState<Basiccontentpage | null>(null);

    useEffect(() => {
        var languageCode = Helper.getLanguageCode();
        Globals.KontentClient.item("thankyou_page___aim_china")
            .languageParameter(Helper.getLanguageName(languageCode))
            .toObservable()
            .subscribe((response: any) => {
                console.log('API Response:', response);
                setPageData(response.item);
            });
    }, []);

    if (!pageData) {
        return <SpinnerComponent />;
    }

    return (
        <>
            {/* <Head>

                <title>{pageData.page_title.value}</title>
                <meta name="description" content={pageData.metaDescription?.value} />
                <meta name="keywords" content={pageData.metaDescription?.value} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.aimcongress.com/thank-you" />
            </Head> */}

            <div className="black-replacer-nav">

            </div>

            <div className='thankyou-page-wrapper'>
                <div className="content-container">
                    <h1>{pageData.heading.value}</h1>
                    {/* <p className='mt-2'>{description}</p> */}
                    <p className='mt-2' dangerouslySetInnerHTML={{ __html: pageData.content.value }} />
                    <p className='mt-3'>{lowerText}</p>

                    <div className='d-flex gap-3 justify-content-lg-start justify-content-center'>
                        <Link href="https://www.facebook.com/AIMCongress" target='_blank'>
                            <FaFacebook color='white' size={20} />
                        </Link>

                        <Link href="https://whatsapp.com/channel/0029VaArQjN0VycN7W0HdG1Q" target='_blank'>
                            <FaWhatsapp color='white' size={20} />
                        </Link>

                        <Link href="https://www.linkedin.com/company/aim-congress/?viewAsMember=true" target='_blank'>
                            <FaLinkedin color='white' size={20} />
                        </Link>

                        <Link href="https://www.instagram.com/aimcongress/?hl=en" target='_blank'>
                            <FaInstagram color='white' size={20} />
                        </Link>

                        <Link href="https://www.threads.net/@aimcongress" target='_blank'>
                            <FaThreads color='white' size={20} />
                        </Link>

                        <Link href="https://www.youtube.com/@AnnualInvestmentMeeting" target='_blank'>
                            <FaYoutube color='white' size={20} />
                        </Link>

                        <Link href="https://x.com/AIM_Congress" target='_blank'>
                            <FaXTwitter color='white' size={20} />
                        </Link>

                        <Link href="https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1" target='_blank'>
                            <FaTiktok color='white' size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
