import React from "react";
import { motion } from "framer-motion";

import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { Aim2026page } from "@/models/aim2026page";
import Link from "next/link";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { FiArrowRightCircle } from "react-icons/fi";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import { SlCalender } from "react-icons/sl";

export default function About({ pageData }: { pageData: Aim2026page }) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  const sections = [
    {
      heading: pageData.aimtalkheading.value,
      content: pageData.aimtalkcontent.value,
      ctaLink: pageData.aimtalkctalink.value,
      ctaName: pageData.aimtalkctaname.value,
      image: pageData.aimtalkimage.value[0]?.url,
      imageLeft: false,
    },
    {
      heading: pageData.aimchapterheading.value,
      content: pageData.aimchaptercontent.value,
      ctaLink: pageData.aimchapterctalink.value,
      ctaName: pageData.aimchapterctaname.value,
      image: pageData.aimchapterimage.value[0]?.url,
      imageLeft: true,
    },
    {
      heading: pageData.agfheading.value,
      content: pageData.agfcontent.value,
      ctaLink: pageData.agfwebsitelink.value,
      ctaName: pageData.agfctaname.value,
      image: pageData.agfimage.value[0]?.url,
      imageLeft: false,
    },
    {
      heading: pageData.aimheading.value,
      content: pageData.aimcontent.value,
      ctaLink: pageData.aimwebsitelink.value,
      ctaName: pageData.aimctaname.value,
      image: pageData.aimaboutimage.value[0]?.url,
      imageLeft: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="aim-2026-page-wrapper"
    >
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
        <meta property="og:url" content="https://aimcongress.cn/about" />
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

        <link rel="canonical" href="https://aimcongress.cn/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <div className="banner-wrapper" style={{ position: "relative" }}>
        {/* Video */}
        <video
          width="100%"
          autoPlay
          loop
          playsInline
          poster={pageData.bannerimage.value[0]?.url}
          muted
          controls={false}
          preload="auto"
          style={{ display: "block" }}
        >
          <source src={pageData.bannervideolink.value} type="video/mp4" />
        </video>

        {/* Black Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // adjust opacity as needed
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="row justify-content-center w-100">
            <div className="col-lg-10">
              <h1 className="banner-heading">{pageData.bannerheading.value}</h1>
              <h4>{pageData.bannersubheading.value}</h4>
            </div>
          </div>
        </div>
      </div>

      {
        /* <div className="py-5">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-6">
              <div
                className="p-lg-5 p-3 d-flex flex-column gap-4 rounded-3xl"
                style={{ backgroundColor: "#F1F5F9" }}
              >
                <div className="d-flex flex-wrap gap-3 justify-content-between">
                  <div>
                    <h4 className="text-primary mb-2">
                      {pageData.aimtalkheading.value}
                    </h4>
                    <div className="d-flex gap-2 bg-white px-4 py-1 rounded-pill align-items-center">
                      <SlCalender size={12} />
                      <span className="mb-0 small">
                        {pageData.aimtalkdate.value}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="px-4 py-2 bg-primary rounded-pill text-white">
                      {pageData.aimtalkctaname.value}
                    </div>
                  </div>
                </div>
                <img
                  style={{ height: "300px" }}
                  className="rounded-3xl w-100 "
                  src={pageData.aimtalkimage.value[0]?.url}
                  alt={pageData.aimtalkheading.value}
                />

                <div
                  className="content-wrapper"
                  dangerouslySetInnerHTML={{
                    __html: pageData.aimtalkcontent.value,
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="p-lg-5 p-3 d-flex flex-column gap-4 rounded-3xl"
                style={{ backgroundColor: "#F1F5F9" }}
              >
                <div className="d-flex flex-wrap gap-3 justify-content-between">
                  <div>
                    <h4 className="text-primary mb-2">
                      {pageData.aimchapterheading.value}
                    </h4>
                    <div className="d-flex gap-2 bg-white px-4 py-1 rounded-pill align-items-center">
                      <SlCalender size={12} />
                      <span className="mb-0 small">
                        {pageData.aimchapterdate.value}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={pageData.aimchapterctalink.value || "#"}
                      className="px-4 py-2 bg-primary rounded-pill text-white"
                    >
                      {pageData.aimchapterctaname.value}
                    </Link>
                  </div>
                </div>
                <img
                  style={{ height: "300px" }}
                  className="rounded-3xl w-100"
                  src={pageData.aimchapterimage.value[0]?.url}
                  alt={pageData.aimchapterheading.value}
                />

                <div
                  className="content-wrapper"
                  dangerouslySetInnerHTML={{
                    __html: pageData.aimchaptercontent.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */

        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {sections.map((section, index) => (
                  <div key={index}>
                    {/* Section Row */}
                    <div className="row g-5 align-items-center mb-5">
                      {/* Image — left side if imageLeft, else right */}
                      {section.imageLeft && (
                        <div className="col-md-6">
                          <img
                            src={section.image}
                            alt=""
                            className="img-fluid rounded-3xl w-100"
                            style={{ objectFit: "cover", height: "300px" }}
                          />
                        </div>
                      )}

                      {/* Text Column */}
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h2 className="h3 mb-3 text-black">
                          {section.heading}
                        </h2>
                        <div
                          className="text-muted content-wrapper"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                        {section.ctaLink && (
                          <div className="mt-4">
                            <Link
                              href={section.ctaLink}
                              className="px-3 py-2 text-white bg-dark rounded-pill"
                              target="_blank"
                            >
                              <span>
                                {section.ctaName} <GoArrowUpRight size={28} />
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Image — right side */}
                      {!section.imageLeft && (
                        <div className="col-md-6">
                          <img
                            src={section.image}
                            alt=""
                            className="img-fluid rounded-3xl w-100"
                            style={{ objectFit: "cover", height: "300px" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Divider between sections (not after the last one) */}
                    {index < sections.length - 1 && (
                      <hr className="my-4 border-top border-2 border-light-subtle" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }

      {/* <div className="py-5">
        <div className="container text-content">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-5 d-flex align-items-center">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h2 className="fs-2 text-primary mb-4">
                    {pageData.aim2026heading.value}
                  </h2>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData.aim2026description.value,
                    }}
                  />

                  {pageData.downloadbrochurelink.value && (
                    <div className="mt-4">
                      <Link
                        href={pageData.downloadbrochurelink.value}
                        className="px-3 py-2 text-white bg-dark rounded-pill"
                        target="_blank"
                      >
                        <span>
                          {pageData.downloadbrochurebuttonname.value}{" "}
                          <IoArrowDownCircleOutline size={28} />
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  <img
                    src={pageData.aim2026image.value[0]?.url}
                    alt={pageData.aim2026heading.value}
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="features-activities-page py-5" id="features-activities">
        <div className="container">
          <div className="row g-3 justify-content-center">
            <div className="mb-4 col-lg-10">
              <h1 className="display-4 text-black mb-3">
                {pageData.featuresheading.value}
              </h1>
              <p className="lead">{pageData.featuresdescription.value}</p>
            </div>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-lg-10">
              <div className="row g-3 ">
                {pageData.featuresitems.value.map((item: any, i: number) => (
                  <Link href={item.link.value} key={i} className="col-lg-4">
                    <div className="feature-item-card  h-100">
                      <div className="image-wrapper">
                        <img src={item.image.value[0]?.url} alt="" />
                      </div>
                      <div className="text-wrapper">
                        <h4>{item.name.value}</h4>
                        <FiArrowRightCircle color="white" size="40" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="why-shanghai-section py-5" id="host-city">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-10">
              <img
                className="mb-5"
                src={pageData.whyshanghaiimage.value[0]?.url}
                alt=""
                style={{ objectFit: "contain", width: "100%" }}
              />

              <div className="row g-4">
                <div className="col-12">
                  <h2 className="text-black">
                    {pageData.whyshanghaiheading.value}
                  </h2>
                </div>
                {pageData.whyshanghaiitems.value.map((item: any) => {
                  return (
                    <motion.div
                      className="col-12 col-md-6 col-lg-4"
                      key={item.system.id}
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 rounded shadow-sm bg-white h-100">
                        <h4 className="text-black">{item.name.value}</h4>
                        <div
                          className="content-wrapper text-muted"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="py-5"
        style={{
          backgroundImage: `url(${pageData.whyglobalhubimage.value[0]?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mb-4 text-white section-heading fw-bold">
                {pageData.whyglobalhubheading.value}
              </h2>
            </div>
          </div>

          <div className="row g-3">
            {pageData.whyglobalhubitems.value.map((item: any) => {
              return (
                <div className="col-lg-6">
                  <div
                    className="bg-white p-3 h-100 rounded"
                    style={{ borderLeft: "4px solid #23A0F8" }}
                  >
                    <h4 className="text-black">{item.name.value}</h4>
                    <div
                      className="content-wrapper text-muted"
                      dangerouslySetInnerHTML={{
                        __html: item.content.value,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="py-5 venue-section-wrapper">
        <div className="container text-content">
          <div className="row g-3 justify-content-center">
            <div className="col-lg-10">
              <div className="row g-5 d-flex align-items-center">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h2 className="fs-2 text-primary mb-4">
                    {pageData.venueheading.value}
                  </h2>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData.venuedescription.value,
                    }}
                  />

                  <div className="mt-4">
                    <Link
                      href={pageData.venuecta.value}
                      className="px-3 py-2 text-white bg-dark rounded-pill"
                      target="_blank"
                    >
                      <span>
                        Experience Dubai <GoArrowUpRight size={28} />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    src={pageData.venueimage.value[0]?.url}
                    alt="aim-congress-2024"
                    className="venue-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
  const datasourceStr: string = await Globals.KontentClient.item(
    "about_page___aim_china_2025",
  )
    .languageParameter(languageCode)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const pageData: Aim2026page = JSON.parse(datasourceStr);

  return {
    props: {
      pageData,
    },
    revalidate: 120,
  };
}
