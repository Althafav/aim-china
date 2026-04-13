// pages/matchmaking.tsx

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Matchmakingpage2026 } from "@/models/matchmakingpage2026";
import { Matchmakingitem } from "@/models/matchmakingitem";
import Link from "next/link";
import Banner2026Component from "@/components/UI/Banner/Banner2026";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import { Ctablock } from "@/models/ctablock";
import Banner2026 from "@/components/UI/Banner/Banner2026";
import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";

export default function MatchmakingPage({
  pageData,
}: {
  pageData: Matchmakingpage2026;
}) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <div>
        <div className="black-replacer-nav"></div>
        <HeaderBanner2026
          heading={pageData.bannerheading.value}
          subheading={pageData.bannersubheading.value}
          className="col-lg-10"
        />

        <div className="about-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <h2 className="h3 mb-3 text-black">
                  {pageData.aboutheading.value}
                </h2>
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: pageData.aboutcontent.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <Banner2026 heading={}/> */}

        {/* Content */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {pageData.activitiesitems.value.map((m: any, index: number) => {
                const item: any = m;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`row g-5 align-items-start mb-5 ${
                      !isEven ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Text Column */}
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h2 className="h3 mb-3 text-black">{item.name.value}</h2>
                      <div
                        className="text-muted"
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    </div>

                    {/* Image Column */}
                    <div className="col-md-6">
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="img-fluid"
                        style={{
                          height: "350px",
                          objectFit: "cover",
                          borderRadius: "30px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
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
                    item.isexternal.value[0]?.name === "yes"
                      ? "_blank"
                      : "_self"
                  }
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";

  const datasourceStr = await Globals.KontentClient.item(
    "networking_detail_page_aimchina"
  )
    .languageParameter(languageCode)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => JSON.stringify(r.item));

  const pageData: Matchmakingpage2026 = JSON.parse(datasourceStr);

  return {
    props: { pageData },
    revalidate: 120,
  };
}
