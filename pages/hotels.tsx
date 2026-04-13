import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Hotelpage } from "@/models/hotelpage";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hotelitems } from "@/models/hotelitems";
import Link from "next/link";
import Helper from "../modules/Helper";
import Head from "next/head";

import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";

export default function HotelsPage({ pageData }: { pageData: Hotelpage }) {
  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <React.Fragment>
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:url" content="https://aimcongress.com/hotels" />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://aimcongress.com/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataMetatitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.com/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link rel="canonical" href="https://aimcongress.com/hotels" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <HeaderBanner2026 heading={pageData.heading.value} className="col-lg-10" />
      <div className="hotels-page-wrapper">
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row g-5">
                  {pageData.items.value.map((m: any, index: number) => {
                    var item: Hotelitems = m;
                    return (
                      <div className="col-12 " key={`hotel-${index}`}>
                        <div className="hotel-items">
                          <div className="row g-4">
                            <div className="col-lg-3">
                              <div className="img-wrapper">
                                <img
                                  src={item.logo.value[0].url}
                                  alt={item.name.value}
                                  className="logo"
                                />
                              </div>
                            </div>

                            <div className="col-lg-9">
                              <h4 className="name mb-3">{item.name.value}</h4>
                              <div
                                className="content"
                                dangerouslySetInnerHTML={{
                                  __html: item.content.value,
                                }}
                              />

                              {item.link.value.length > 0 && (
                                <div className="mt-4">
                                  <Link href={item.link.value}>
                                    <span className="cta-btn">Book Now</span>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const datasourceStr: string = await Globals.KontentClient.item(
    "hotels_page_2025___aim_china"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const pageData: Hotelpage = JSON.parse(datasourceStr);

  return {
    props: {
      pageData,
    },
    revalidate: 120,
  };
}
