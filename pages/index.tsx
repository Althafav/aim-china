import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React from "react";

import BannerComponent from "@/components/Home/BannerComponent";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import PillarSection from "@/components/Home/PillarSection";

import YoutubeSectionComponent from "@/components/Home/YoutubeSectionComponent";
import TestimonialsComponent2026 from "@/components/Home/TestimonialsComponent2026";
import TargetCTA from "@/components/Home/TargetCTA";

import Globals from "@/modules/Globals";
import { Homepage2026 } from "@/models/homepage2026";
import Head from "next/head";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { link } from "fs";
import HomeSpeakersComponentCurrent from "@/components/Home/HomeSpeakersComponentCurrent";
import StatsSection from "@/components/Home/StatsSection";

const HomeSPETabs = dynamic(() => import("@/components/Home/HomeSPETabs"), {
  ssr: false,
  loading: () => <SpinnerComponent />,
});
const HomeSponsorsComponent = dynamic(
  () => import("@/components/Home/HomeSponsorsComponent"),
  { ssr: false, loading: () => <SpinnerComponent /> },
);

// You can also consider deferring ThemeSection and Articles if they’re heavy:
const ThemeSectionComponent = dynamic(
  () => import("@/components/Home/ThemeSectionComponent"),
  { loading: () => <SpinnerComponent />, ssr: false },
);
const ArticlesComponent = dynamic(
  () => import("@/components/Home/ArticlesComponent"),
  { loading: () => <SpinnerComponent />, ssr: false },
);

const FeaturesSwiper = dynamic(
  () => import("@/components/pillar/FeaturesSwiper"),
  { ssr: false, loading: () => <SpinnerComponent /> },
);

function Home({ pageData }: { pageData: any }) {
  if (!pageData) return <SpinnerComponent />;

  return (
    <motion.div
      className="home-page-2025"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <meta property="og:url" content="https://aimcongress.cn/" />
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

        <link rel="canonical" href={Globals.BASE_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BannerComponent pageData={pageData} />

      <ThemeSectionComponent pageData={pageData} />

      <div className="aim-china-section py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2
                className="section-heading-2026 text-black text-start"
                style={{ maxWidth: "800px" }}
              >
                {pageData.aimchinaheading.value}
              </h2>

              <div
                className="text-muted mt-3"
                dangerouslySetInnerHTML={{
                  __html: pageData.aimchinacontent.value,
                }}
              />

              {pageData.aimchinactalink.value && (
                <div className="mt-4">
                  <ButtonComponent
                    name={pageData.aimchinactaname.value}
                    link={pageData.aimchinactalink.value}
                  />
                </div>
              )}
            </div>

            <div className="col-lg-6 h-100">
              <div className="ratio ratio-4x3">
                <img
                  src={pageData.aimchinaimage.value[0]?.url}
                  alt=""
                  className="w-100 h-100 rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-5">
        <div className="container">
          <div className="row ">
            <h2
              className="section-heading-2026 text-black text-start"
              style={{ maxWidth: "800px" }}
            >
              {pageData.aimtalkheading.value}
            </h2>
            <p>{pageData.aimtalksubheading.value}</p>

            <div>
              <div
                className="p-5 mt-4 rounded-3xl"
                style={{ backgroundColor: "#DCF2FF" }}
              >
                <span className="bg-secondary text-white small px-4 py-1">
                  {pageData.aimtalkthemetag.value}
                </span>
                <div className="mt-4">
                  <div className="d-flex flex-wrap">
                    <h2
                      className="mt-2 text-primary section-heading-2026"
                      style={{ maxWidth: "1200px" }}
                    >
                      {pageData.aimtalkthemeheading.value}
                    </h2>

                    <div>
                      <img
                        src={pageData.aimtalkpartnerlogo.value[0]?.url}
                        alt=""
                        style={{ width: "150px" }}
                      />
                    </div>
                  </div>
                  <div
                    className="text-primary mt-3"
                    dangerouslySetInnerHTML={{
                      __html: pageData.aimtalkthemecontent.value,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <FeaturesSwiper
            cards={pageData.featuresitems.value}
            heading={pageData.featuresheading.value}
          />
        </div>
      </div>

      <StatsSection
        statsheading={pageData.statsheading.value}
        statscontent={pageData.statscontent.value}
        statsitems={pageData.statsitems.value}
        downloadreportlink={pageData.downloadreportlink.value}
      />
      <PillarSection pageData={pageData} />

      <div>
        <HomeSponsorsComponent />
      </div>

      <div className="container">
        <HomeSpeakersComponentCurrent />
      </div>

      <TargetCTA items={pageData.targetaudientsitems.value} />

      {/* <HomeSponsorsComponent />
      <HomeSPETabs /> */}

      {pageData.testimonialitems.value.length > 0 && (
        <TestimonialsComponent2026 pageData={pageData} />
      )}

      {/* <ArticlesComponent
        heading={pageData.blogsheading.value}
        buttonCTAName={pageData.blogsctaname.value}
        buttonCTALink={pageData.blogsctalink.value}
      /> */}
      {/* <YoutubeSectionComponent pageData={pageData} /> */}

      {/* {pageData.hostcityheading.value && (
        <div className="section py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <h2
                  className="section-heading-2026 text-black text-start"
                  style={{ maxWidth: "800px" }}
                >
                  {pageData.hostcityheading.value}
                </h2>

                <div
                  className="text-muted mt-3"
                  dangerouslySetInnerHTML={{
                    __html: pageData.hostcitycontent.value,
                  }}
                />

                {pageData.hostcityctalink.value && (
                  <div className="mt-4">
                    <ButtonComponent
                      name={pageData.hostcityctaname.value}
                      link={pageData.hostcityctalink.value}
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-6 h-100">
                <div className="">
                  <img
                    src={pageData.hostcityimage.value[0]?.url}
                    alt=""
                    className="w-100 h-100 rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
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
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";
  const datasourceStr = await Globals.KontentClient.item(
    "home_page___aim_china_2025",
  )
    .languageParameter(languageCode)
    .toObservable()
    .toPromise()
    .then((r: any) => JSON.stringify(r.item));

  return {
    props: {
      pageData: JSON.parse(datasourceStr) as Homepage2026,
    },
    revalidate: 30,
  };
}

export default React.memo(Home);
