import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Postshowreport } from "@/models/postshowreport";
import Globals from "@/modules/Globals";
import { Postshowreportyear } from "@/models/postshowreportyear";
import { Reportitem } from "@/models/reportitem";
import Link from "next/link";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Head from "next/head";
import { Seometadata } from "@/models/seometadata";
import { FaYoutube } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

export default function PostshowReport() {
  const [pageData, setPageData] = useState<Postshowreport | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeReportIndex, setActiveReportIndex] = useState<number>(0);

  useEffect(() => {
    Globals.KontentClient.item("brochure_page___china")
      .withParameter("depth", "2")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
        if (response.item.items.value.length > 0) {
          setActiveCategory(response.item.items.value[0].system.id);
        }
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveReportIndex(0);
  };

  return (
    <div className="postshow-report-page-wrapper">
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
        <meta property="og:url" content="https://aimcongress.cn/brochure" />
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

        <link rel="canonical" href="https://aimcongress.cn/brochure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav"></div>

      <div className=" my-3 container ">
        <div className="banner-wrapper ">
          <div className="row ">
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="mb-3">{pageData.bannerHeading.value}</h2>
                <p
                  className="text-white mb-4 small text-secondary"
                  style={{ maxWidth: "800px" }}
                >
                  {pageData.bannersubheading.value}
                </p>
              </div>

              <div className="d-flex gap-2">
                <IoShareSocial
                  color="white"
                  size={40}
                  className="share-icon"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: document.title,
                          text: "Check out this articles!",
                          url: window.location.href,
                        })
                        .catch((err) => console.error("Share failed:", err));
                    } else {
                      alert("Web Share is not supported in your browser.");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />

                <Link
                  href="https://www.youtube.com/@AnnualInvestmentMeeting"
                  target="_blank"
                >
                  <FaYoutube className="youtube-icon" color="red" size={42} />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-2 col-6 agenda-revamp-wrapper">
              <div className="partners-category-select-wrap">
                <select
                  className="category-dropdown select-control"
                  value={activeCategory ?? ""}
                  onChange={(e) => handleCategoryClick(e.target.value)}
                >
                  {pageData.items.value.map((c: any) => {
                    const category: Postshowreportyear = c;
                    return (
                      <option
                        key={category.system.id}
                        value={category.system.id}
                      >
                        {category.year.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="row g-3">
            <div className="col-12">
              {pageData.items.value.map((c: any) => {
                let category: Postshowreportyear = c;
                return (
                  <div
                    className={`${
                      activeCategory === category.system.id ? "" : "d-none"
                    } agenda col-12`}
                    id={`agenda_${category.system.id}`}
                    key={category.system.id}
                  >
                    <div className="row g-3">
                      {category.items.value.map((a: any, index: any) => {
                        let report: Reportitem = a;
                        return (
                          <div
                            className=" col-12 col-lg-3 "
                            key={report.system.id}
                          >
                            <div className="card custom-report-card">
                              <Link
                                href={`/forms/download?type=brochure&id=${report.system.id}`}
                                target="_blank"
                              >
                                <div className="custom-report-image-wrapper ">
                                  <img
                                    src={report.image.value[0]?.url}
                                    alt=""
                                    className=""
                                  />
                                </div>
                                <div className="custom-report-image-content bg-black rounded-pill text-white px-4 py-2">
                                  <span className="small">Download PDF</span>
                                </div>

                                <div className="card-body">
                                  <h4 className="text-black small mt-2">
                                    {report.name.value}
                                  </h4>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
