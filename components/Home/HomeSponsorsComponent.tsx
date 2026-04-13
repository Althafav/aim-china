import { Sponsorspage } from "@/models/sponsorspage";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import ButtonComponent from "../Button/ButtonComponent";

export default function HomeSponsorsComponent() {
  const [pageData, setPageData] = useState<Sponsorspage | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("sponsors_2025_page___aim_china")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  var formatName = "";

  if (!pageData) {
    return <></>;
  }
  return (
    <>
      {pageData.sponsors.value.length > 0 && (
        <div className="home-sponsors-wrapper-2026 gradient-1 py-5 mb-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="">
                <h2
                  className="section-heading text-start text-black"
                  style={{ maxWidth: "800px" }}
                >
                  {pageData.homePageTitle.value}
                </h2>
              </div>

              {/* <div className=" d-flex justify-content-lg-end">
            <div>
              <ButtonComponent name="View all Sponsors" link="/sponsors-2025" />
            </div>
          </div> */}
            </div>

            <div className="row mt-4 ">
              <Swiper
                grabCursor={true}
                centeredSlides={false}
                spaceBetween={10}
                slidesPerView={4.5}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={1000}
                breakpoints={{
                  320: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3.2,
                    spaceBetween: 10,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                  1440: {
                    slidesPerView: 6.2,
                    spaceBetween: 10,
                  },
                }}
                modules={[Autoplay]}
                className="SponsorSwiper w-100"
              >
                {pageData.sponsors.value.map((i, index) => (
                  <SwiperSlide key={`sponsors-${index}`}>
                    <div className="card h-100 ">
                      <Link href={i.website.value}>
                        <div className="image-wrapper">
                          {i.sponsor_type.value.length > 0 && (
                            <div className=" type-tag">
                              <span className="bg-secondary px-2 py-1 rounded text-white  ">
                                {i.sponsor_type.value}
                              </span>
                            </div>
                          )}
                          <Image
                            src={i.logo.value[0].url}
                            title={i.name.value}
                            alt={i.logo.value[0].name}
                            width={290}
                            height={160}
                            className="sponsor-img p-3"
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="sponsor-detail card-body">
                          <p className="name text-center">{i.name.value}</p>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
