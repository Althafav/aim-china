import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { Basiccontentpage } from "@/models/basiccontentpage";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Helper from "@/modules/Helper";
import { useRouter } from "next/router";
import Fireworks from "@/components/UI/Fireworks";
import ButtonComponent from "@/components/Button/ButtonComponent";

export default function ThankYouPage() {
  const lowerText =
    "Stay tuned for more updates and information here on our website and social media.";

  const [pageData, setPageData] = useState<Basiccontentpage | null>(null);
  const router = useRouter();
  const { user } = router.query;
  useEffect(() => {
    var languageCode = Helper.getLanguageCode();
    Globals.KontentClient.item("thankyou_page")
      .languageParameter(Helper.getLanguageName(languageCode))
      .toObservable()
      .subscribe((response: any) => {
        console.log("API Response:", response);
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

      {/* <div className="black-replacer-nav">

            </div> */}
      <Fireworks />

      <div className="thankyou-page-wrapper whiteBg card container my-5 rounded">
        <div className="content-container">
          {/* <h1>{pageData.heading.value}</h1> */}
          {user && (
            <h1 className="text-xl font-semibold mt-2">
              Thank you, <span className="text-primary">{user}</span>!
            </h1>
          )}
          <p
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />

          <p className="mt-3">{lowerText}</p>

          <div className="d-flex gap-3 ">
            <Link href="https://www.facebook.com/AIMCongress" target="_blank">
              <FaFacebook color="black" size={20} />
            </Link>

            <Link
              href="https://whatsapp.com/channel/0029VaArQjN0VycN7W0HdG1Q"
              target="_blank"
            >
              <FaWhatsapp color="black" size={20} />
            </Link>

            <Link
              href="https://www.linkedin.com/company/aim-congress/?viewAsMember=true"
              target="_blank"
            >
              <FaLinkedin color="black" size={20} />
            </Link>

            <Link
              href="https://www.instagram.com/aimcongress/?hl=en"
              target="_blank"
            >
              <FaInstagram color="black" size={20} />
            </Link>

            <Link href="https://www.threads.net/@aimcongress" target="_blank">
              <FaThreads color="black" size={20} />
            </Link>

            <Link
              href="https://www.youtube.com/@AnnualInvestmentMeeting"
              target="_blank"
            >
              <FaYoutube color="black" size={20} />
            </Link>

            <Link href="https://x.com/AIM_Congress" target="_blank">
              <FaXTwitter color="black" size={20} />
            </Link>

            <Link
              href="https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1"
              target="_blank"
            >
              <FaTiktok color="black" size={20} />
            </Link>
          </div>

          <ButtonComponent name="Discover More" link="/" className="mt-4" />
        </div>
      </div>
    </>
  );
}
