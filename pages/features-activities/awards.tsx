import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { motion } from "framer-motion";

import Globals from "@/modules/Globals";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Helper from "../../modules/Helper";
import { Awardpage2026 } from "@/models/awardpage2026";
import Banner2026 from "@/components/UI/Banner/Banner2026";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { Awarditem2026 } from "@/models/awarditem2026";
import AwardSlider from "@/components/Award/AwardSlider";
import AwardAccordion from "@/components/Award/AwardAccordion";
import { Awardjury } from "@/models/awardjury";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";

export default function AwardsPage({ pageData }: { pageData: Awardpage2026 }) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="awards-page-wrapper-2026">
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
        <meta property="og:url" content="https://aimcongress.cn/awards" />
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

        <link rel="canonical" href="https://aimcongress.cn/awards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <Banner2026
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
        className="col-lg-10"
      />
      <div className="about-section-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-3">
                <div className="col-lg-6">
                  <h1 className="theme-gradient-text-2">
                    {pageData.aboutheading.value}
                  </h1>

                  {pageData.ctabuttonlink.value && (
                    <div className="mt-4">
                      <ButtonComponent
                        name={pageData.ctabuttonname.value}
                        link={pageData.ctabuttonlink.value}
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

      <div className="award-category-wrapper py-5">
        <div className="container">
          <div className="row g-5">
            <AwardAccordion
              items={pageData.awarditems.value as Awarditem2026[]}
            />
          </div>
        </div>
      </div>

      <div className="juries-section-wrapper py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-12">
              <h2 className="heading text-center">
                {pageData.juryheading.value}
              </h2>
            </div>

            {pageData.juryitems.value.map((m: any, index: number) => {
              const item: Awardjury = m;
              return (
                <motion.div
                  className="col-lg-3 col-6 col-md-4"
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div className="jury-item">
                    <div className="image-wrapper">
                      <Image
                        width={400}
                        height={400}
                        src={item.image.value[0].url}
                        alt={item.name.value}
                      />
                      <div className="name-wrapper">
                        <h4 className="name">{item.name.value}</h4>
                        <p className="company">{item.company.value}</p>
                      </div>
                    </div>

                    <div className="designation-wrapper">
                      <p className="designation text-center">
                        {item.designation.value}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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

export async function getStaticProps(context: any) {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";
  const datasourceStr: string = await Globals.KontentClient.item(
    "award_page_2026"
  )
    .languageParameter(languageCode)
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const pageData: Awardpage2026 = JSON.parse(datasourceStr);

  return {
    props: {
      pageData,
    },
    revalidate: 60,
  };
}
