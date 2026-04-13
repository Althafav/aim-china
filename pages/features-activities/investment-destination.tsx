import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Conferencepage2026 } from "@/models/conferencepage2026";
import Banner2026 from "@/components/UI/Banner/Banner2026";
import ButtonComponent from "@/components/Button/ButtonComponent";

import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import SideForumSlider from "@/components/features-activities/conference/SideForumSlider";
import { Sideforumitem2026 } from "@/models/sideforumitem2026";
import { Investmentdestinationpage2026 } from "@/models/investmentdestinationpage2026";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Page() {
  const [pageData, setPageData] =
    useState<Investmentdestinationpage2026 | null>(null);
  useEffect(() => {
    Globals.KontentClient.item("investment_destination_page_2026")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <div className="investment-destination-page-2026">
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
        <meta
          property="og:url"
          content="https://aimcongress.cn/features-activities/investment-destination"
        />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link
          rel="canonical"
          href="https://aimcongress.cn/features-activities/investment-destination"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <Banner2026
        heading={pageData.bannerheading.value}
        className="col-lg-10"
      />
      <div className="about-section-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-6">
                  <h1 className="theme-gradient-text-2">
                    {pageData.aboutheading.value}
                  </h1>

                  {pageData.aboutbuttonlink.value && (
                    <div className="mt-4">
                      <ButtonComponent
                        name={pageData.aboutbuttonname.value}
                        link={pageData.aboutbuttonlink.value}
                      />
                    </div>
                  )}
                </div>

                <div className="col-lg-6">
                  <p>{pageData.aboutdescription.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="items-section-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                {pageData.investmentdestinationitems.value.map(
                  (item: any, index: number) => {
                    return (
                      <div className="col-lg-6">
                        <Link
                          href={`/investment-destination/${item.slug.value}`}
                        >
                          <div className="ratio ratio-16x9">
                            <Image
                              width={600}
                              height={300}
                              src={item.image.value[0]?.url}
                              alt={item.heading.value}
                              className="mb-2 rounded-3xl img-fluid ratio ratio-16x9"
                            />
                          </div>
                          <h6 className="small text-black p-2">
                            {item.heading.value}
                          </h6>
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {pageData.ctablock.value &&
        pageData.ctablock.value.map((item: any, index: number) => {
          return (
            <div className="cta-block-wrapper container" key={index}>
              <CTABlockComponent
                heading={item.name.value}
                buttonName={item.ctabuttonname.value}
                buttonLink={item.ctabuttonlink.value}
                buttonTarget={
                  item.isexternal.value[0]?.name === "yes" ? "_blank" : "_self"
                }
              />
            </div>
          );
        })}
    </div>
  );
}
