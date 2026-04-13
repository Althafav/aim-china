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
import Head from "next/head";
import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";
import { useRouter } from "next/router";

export default function Page() {
  const [pageData, setPageData] = useState<Conferencepage2026 | null>(null);
  const { locale } = useRouter();
  const languageCode = locale === "cn" ? "China" : "default";
  useEffect(() => {
    Globals.KontentClient.item("conference_page___aim_china")
      .withParameter("depth", "4")
      .languageParameter(languageCode)
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getHeight = (block: "left" | "right") => {
    if (!isLargeScreen) return "auto";
    if (!hovered) return block === "left" ? "30%" : "25%";
    return hovered === block ? "30%" : "25%";
  };

  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <div className="conference-page-2026">
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
          content="https://aimcongress.cn/features-activities/conference"
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
          href="https://aimcongress.cn/features-activities/conference"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <HeaderBanner2026
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

      <div className="session-section-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-5 session-section-row">
                <div
                  className="col-lg-7 d-flex flex-column gap-3"
                  onMouseEnter={() => isLargeScreen && setHovered("left")}
                  onMouseLeave={() => isLargeScreen && setHovered(null)}
                >
                  <h4 className="text-black">
                    {pageData.planerysessionheading.value}
                  </h4>

                  <motion.img
                    src={pageData.planerysessionimage.value[0]?.url}
                    alt={pageData.planerysessionimage.value[0]?.description}
                    className="rounded w-100 object-fit-cover"
                    animate={{ height: getHeight("left") }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      overflow: "hidden",
                      display: "block",
                    }}
                  />

                  <p>{pageData.planerysessiondescription.value}</p>
                </div>

                <div
                  className="col-lg-5 d-flex flex-column gap-3"
                  onMouseEnter={() => isLargeScreen && setHovered("right")}
                  onMouseLeave={() => isLargeScreen && setHovered(null)}
                >
                  <h4 className="text-black">
                    {pageData.thematicareaheading.value}
                  </h4>

                  <motion.img
                    src={pageData.thematicareaimage.value[0]?.url}
                    alt={pageData.thematicareaimage.value[0]?.description}
                    className="rounded w-100 object-fit-cover"
                    animate={{ height: getHeight("right") }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      overflow: "hidden",
                      display: "block",
                    }}
                  />

                  <p>{pageData.thematicareadescription.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pageData.sideforumitems.value.length > 0 && (
        <div className="side-forums-section-wrapper py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row g-5">
                  <div className="col-12">
                    <h4 className="text-black">
                      {pageData.sideforumheading.value}
                    </h4>
                    <p>{pageData.sideforumdescription.value}</p>
                  </div>

                  <SideForumSlider
                    items={pageData.sideforumitems.value as Sideforumitem2026[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
