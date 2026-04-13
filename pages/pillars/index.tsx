import React, { useRef } from "react";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";

import { GetServerSideProps } from "next";

import Head from "next/head";
import Link from "next/link";
import ButtonComponent from "@/components/Button/ButtonComponent";
import Image from "next/image";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";

type PageProps = {
  pageData: any | null;
};

export default function Page({ pageData }: PageProps) {
  const sectionRefs = {
    "global-markers": useRef<HTMLDivElement>(null),
    "future-economies": useRef<HTMLDivElement>(null),
    nextgen: useRef<HTMLDivElement>(null),
  };

  const navItems = [
    {
      id: "global-markers",
      label: "Global Markers",
      className: "bg-globalmarket",
    },
    {
      id: "future-economies",
      label: "Future Economies",
      className: "bg-futureEconomies",
    },
    { id: "nextgen", label: "NexGen", className: "bg-nextGen" },
  ] as const;

  if (!pageData) return <SpinnerComponent />;

  const scrollTo = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pillarpage position-relative">
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
        <meta property="og:url" content="https://aimcongress.cn/pillars" />
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

        <link rel="canonical" href="https://aimcongress.cn/pillars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>
      <HeaderBanner2026
        heading={pageData.bannerheading.value}
        className="col-lg-12"
      />
      <div className="py-5">
        <div className="row">
          <div className="col-lg-10"></div>
        </div>
        {pageData.pillaritems.value.map((m: any, idx: number) => {
          const item: any = m;
          const id = navItems[idx]?.id ?? `pillar-${idx}`;
          return (
            <div
              key={idx}
              id={id}
              ref={sectionRefs[id as keyof typeof sectionRefs]}
              className="container py-5"
            >
              <div className="row g-5">
                <div className="col-lg-4">
                  <h2 className="pillar-heading-1   ">{item.heading.value}</h2>
                  <h2
                    className="pillar-heading-2 mb-3"
                    style={{ color: item.colorcode.value }}
                  >
                    {item.name.value}
                  </h2>

                  <div
                    className="line-clamp-3 mb-3 content-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.content.value }}
                  />

                  <ButtonComponent
                    name={item.ctabuttonname.value}
                    link={item.ctabuttonlink.value}
                    colorCode={item.colorcode.value}
                  />
                </div>

                <div className="col-lg-8">
                  <div className="">
                    <div
                      className="row g-3"
                      style={{
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                      }}
                    >
                      {item.portfolioitems.value.map(
                        (portfolio: any, pi: number) => (
                          <div className="col-lg-4">
                            <Link
                              href={`/pillars/${item.slug.value}/#${portfolio.slug.value}`}
                              className="track-card "
                              key={pi}
                              style={{ minWidth: "250px" }}
                            >
                              <div className="ratio ratio-1x1 ">
                                <Image
                                  width={250}
                                  height={380}
                                  className="track-image ratio ratio-1x1 rounded-3xl"
                                  src={portfolio.image1.value[0]?.url}
                                  alt={portfolio.name.value}
                                />
                              </div>

                              <div className="floating-container">
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="name">{portfolio.name.value}</p>

                                  <IoArrowForwardCircleOutline
                                    className={`text-white `}
                                    size={32}
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
                className="row justify-content-end position-lg-relative"
                style={{ top: "-4rem", zIndex: 1 }}
              >
                <div className="col-4 d-none d-md-flex align-items-center">
                  {navItems.map(({ id, label, className }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollTo(id)}
                      className="btn btn-link position-relative p-0 me-3 nav-btn"
                    >
                      <div
                        className={`${className} nav-icon rounded-circle d-flex align-items-center justify-content-center`}
                      />
                      <span className="nav-label small">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="col-lg-8"></div>
              </div> */}
            </div>
          );
        })}
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";
  try {
    const response: any = await Globals.KontentClient.item(
      "pillar_page_2026___aim_china"
    )
      .languageParameter(languageCode)
      .withParameter("depth", "4")
      .toPromise();
    const pageData = JSON.parse(JSON.stringify(response.item));
    return {
      props: { pageData },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return { props: { pageData: null } };
  }
};
