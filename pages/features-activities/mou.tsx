import React, { useEffect, useState } from "react";

import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Helper from "../../modules/Helper";
import { Moupage2026 } from "@/models/moupage2026";
import Head from "next/head";
import Banner2026 from "@/components/UI/Banner/Banner2026";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { Mouentityitem } from "@/models/mouentityitem";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import Link from "next/link";
import { Mouitem } from "@/models/mouitem";

export default function FlightPage() {
  const [pageData, setPageData] = useState<Moupage2026 | null>(null);

  useEffect(() => {
    var languageCode = Helper.getLanguageCode();
    Globals.KontentClient.item("mou_page_2026")
      .languageParameter(Helper.getLanguageName(languageCode))
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
    <div className="mou-page-wrapper-2026">
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
                  <h1 className="theme-gradient-text-2 count">
                    {pageData.moucount.value}+
                  </h1>
                  <h1 className="theme-gradient-text-2">
                    {pageData.moucountheading.value}
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
                  {pageData.moucountdescription.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="entity-section-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-5">
                <div className="col-12">
                  <h2 className="text-black">
                    {pageData.aimtocompanyheading.value}
                  </h2>
                  <p>{pageData.aimtocompanydescription.value}</p>
                </div>

                <div className="col-12">
                  <h2 className="text-black">
                    {pageData.companytocompanyheading.value}
                  </h2>
                  <p>{pageData.companytocompanydescription.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-entity-section py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-12">
              <h2 className="heading text-center">
                {pageData.featuredmouheading.value}
              </h2>
            </div>

            {pageData.featuredmouitems.value.map((m: any, index: number) => {
              const item: Mouitem = m;
              return (
                <div className="col-lg-3" key={index}>
                  <Link
                    href={`/mous/${item.slug.value}`}
                    className="rounded-3xl overflow-hidden"
                  >
                    <img
                      src={item.image.value[0]?.url}
                      alt=""
                      className="w-100 mb-2 rounded-3xl"
                    />
                    <div className="p-2">
                      <p className="small text-black">{item.name.value}</p>
                    </div>
                  </Link>
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
                  item.isexternal.value[0]?.name === "yes" ? "_blank" : "_self"
                }
              />
            </div>
          );
        })}
    </div>
  );
}
