import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Basiccontentpage } from "@/models/basiccontentpage";
import { Seometadata } from "@/models/seometadata";
import { Carditem } from "@/models/carditem";
import Helper from "../modules/Helper";

import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";
import { useRouter } from "next/router";

export default function FlightPage() {
  const [pageData, setPageData] = useState<Basiccontentpage | null>(null);
  const { locale } = useRouter();
  const languageCode = locale === "cn" ? "China" : "default";
  useEffect(() => {
    Globals.KontentClient.item("official_airline_carries___page_china")
      .languageParameter(languageCode)
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="stand-builder-page-wrapper">
      <Head>
        <title>{pageData.metadata__pagetitle.value}</title>
        <meta name="title" content={pageData.metadata__metatitle.value} />
        <meta
          name="description"
          content={pageData.metadata__metadescription.value}
        />

        <meta
          property="og:title"
          content={pageData.metadata__pagetitle.value}
        />
        <meta
          property="og:description"
          content={pageData.metadata__metadescription.value}
        />
        <meta property="og:url" content="https://aimcongress.cn/flight" />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={pageData.metadata__pagetitle.value}
        />
        <meta
          name="twitter:description"
          content={pageData.metadata__metadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link rel="canonical" href="https://aimcongress.cn/flight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <HeaderBanner2026
        heading={pageData.pageTitle.value}
        className="col-lg-10"
      />

      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                {pageData.items.value.map((m: any, index: number) => {
                  var item: Carditem = m;
                  return (
                    <div className="col-12" key={`flight-${index}`}>
                      <div className="row g-5">
                        <div className="col-lg-2 col-6">
                          <img
                            src={item.image.value[0]?.url}
                            alt={item.name.value}
                            className="rounded"
                          />
                        </div>

                        <div className="col-lg-9">
                          <h1 className="text-black mb-3">{item.name.value}</h1>
                          <span
                            className="content-wrapper"
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />

                          <div>
                            <Link href={item.link.value} target="_blank">
                              <button className="text-white bg-primary cta-btn">
                                Book Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <hr className="text-secondary mt-4 mb-4" />
                    </div>
                  );
                })}
                {/* <div className="col-lg-4 d-flex justify-content-center align-items-center">
                            <img src={pageData.image.value[0].url} alt={pageData.pageTitle.value} className='logo' />
                        </div>

                        <div className="col-lg-8">
                            <p dangerouslySetInnerHTML={{ __html: pageData.content.value }} />

                            <div >
                                {pageData.ctabutton.value.map((m: any, index: number) => {
                                    var item: Buttonitem = m;
                                    return (
                                        <Link href={item.link.value} target={item.target.value === 1 ? "_blank" : "_self"} key={`cta-${index}`}>
                                            <button className='mt-3 text-primary bg-white p-0'>{item.name.value}</button>

                                        </Link>
                                    )
                                })}

                            </div>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
