// pages/matchmaking.tsx

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { Pillardetailpageitem } from "@/models/pillardetailpageitem";
import ButtonComponent from "@/components/Button/ButtonComponent";

import { GetStaticPaths, GetStaticProps } from "next";
import { relative } from "path";
import MinimalStickyStackDemo from "@/components/pillar/MinimalStickyStackDemo";
import FeaturesSwiper from "@/components/pillar/FeaturesSwiper";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";

type Entity = "Business" | "Government" | "Investor" | "Project";

export default function MatchmakingPage({
  pageData,
  slug,
}: {
  pageData: Pillardetailpageitem;
  slug: string;
}) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="pillar">
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
          content={`https://aimcongress.cn/pillars${slug}`}
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
        <meta name="twitter:title" content={pageData.metadataMetatitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link rel="canonical" href={`https://aimcongress.cn/pillars${slug}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pillar-detail-page-wrapper"
      >
        <div className="black-replacer-nav"></div>
        {/* <Banner2026Component
          heading={pageData.bannerheading.value}
          subheading={pageData.bannersubheading.value}
          className="col-lg-10"
        /> */}

        <div className="aboutsection-wrapper py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row flex flex-col gap-4">
                  <div className="col-12">
                    <img
                      src={pageData.bannerimage.value[0]?.url}
                      alt=""
                      className="banner-img-pillar"
                    />
                  </div>

                  <div className="col-12">
                    <h2
                      className="section-heading-2026"
                      style={{ color: pageData.brandcolorcode.value }}
                    >
                      {pageData.aboutheading.value}
                    </h2>
                    <div className="multi-column-text">
                      <p>{pageData.aboutdescription.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tracks-section-wrapper py-2 position-relative"
          style={{ position: "relative" }}
        >
          {pageData.trackitems.value.map((item, index) => (
            <div
              key={index}
              id={`${item.slug.value}`}
              className="py-5 sticky-stack-section bg-white"
              style={{
                position: "sticky",
                top: 0,
                // height: "100vh",
                zIndex: index + 1,

                borderRadius: "1.5rem",
              }}
            >
              <div className="container">
                <div className="">
                  <div className="row justify-content-center w-100">
                    <div className="col-lg-10">
                      <div className="row g-3">
                        <div className="col-12">
                          <img
                            src={item.image2.value[0]?.url}
                            alt=""
                            className=" mb-4 img-fluid"
                            style={{
                              maxHeight: "320px",
                              objectFit: "cover",
                              width: "100%",
                              borderRadius: "30px",
                            }}
                          />
                        </div>
                        <div className="col-lg-4">
                          <h2 className="section-heading-2026 text-black">
                            {item.name.value}
                          </h2>
                        </div>
                        <div className="col-lg-8">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sustainable-section-wrapper py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <h2 className="theme-gradient-text text-left mb-4">
                  {pageData.sustainableheading.value}
                </h2>

                <div className="d-flex align-items-start justify-content-between flex-lg-nowrap flex-wrap gap-3">
                  <p className="mb-0 flex-grow-1">
                    {pageData.sustainabledescription.value}
                  </p>
                  <div className="flex-shrink-0">
                    <ButtonComponent
                      name={pageData.sustainablectaname.value}
                      link={pageData.sustainablectalink.value}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row py-5 g-0">
                  {pageData.sustainableitems.value.map(
                    (item: any, index: number) => {
                      return (
                        <div className="col-lg-4" key={index}>
                          <div className="sustainableitem-card h-100">
                            <p className="name">{item.name.value}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section-wrapper py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <FeaturesSwiper
                  cards={pageData.featuresitems.value}
                  heading={pageData.featuresactivitiesheading.value}
                />
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
                />
              </div>
            );
          })}
      </motion.div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const datasourceStr: string = await Globals.KontentClient.items()
      .type("pillardetailpageitem")
      .collection("aim_china")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Pillardetailpageitem> = JSON.parse(datasourceStr);
    const allSlugs = data.map((item) => item.slug.value?.trim());

    // 2. remove empty or undefined slugs
    const validSlugs = allSlugs.filter((s): s is string => s.length > 0);

    // 3. dedupe in case your CMS has duplicates
    const uniqueSlugs = Array.from(new Set(validSlugs));

    // 4. build your paths
    const paths = uniqueSlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    const { params, locale } = context;
    const slug = params?.slug as string;

    if (!slug) return { notFound: true };
    const languageCode = locale === "cn" ? "China" : "default";

    const response = await Globals.KontentClient.items()
      .type("pillardetailpageitem")
      .equalsFilter("elements.slug", slug)
      .collection("aim_china")
      .languageParameter(languageCode)
      .withParameter("depth", "4")
      .toPromise();

    if (!response.items.length) {
      return { notFound: true };
    }

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(response.items[0])),
        slug,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
};
