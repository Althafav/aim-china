import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import Image from "next/image";
import ExhibitorModel from "@/sysmodels/exhibitorModel";
import Helper from "@/modules/Helper";
import ButtonComponent from "../Button/ButtonComponent";

export default function ExhibitorsComponent() {
  const [exhibitorsData, setExhibitorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExhbitors = async () => {
      try {
        const res = await fetch("/api/exhibitors2025");
        const data = await res.json();
        setExhibitorsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExhbitors();
  }, []);

  if (!exhibitorsData) {
    return <></>;
  }

  return (
    <div className="speaker-component-wrapper-2026">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="">
            <h2
              className="section-heading text-start"
              style={{ maxWidth: "800px" }}
            >
              AIM Congress 2025 Exhibitors
            </h2>
          </div>

          <div className=" d-flex justify-content-lg-end">
            <div>
           
              <ButtonComponent name="View all Exhibitors" link="/exhibitors" />
            </div>
          </div>
        </div>

        {loading ? (
          <div>
            <div className="mt-4 ">
              <Swiper
                grabCursor={true}
                centeredSlides={true}
                spaceBetween={10}
                slidesPerView={4}
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
                    slidesPerView: 5.5,
                    spaceBetween: 10,
                  },
                  1440: {
                    slidesPerView: 6.2,
                    spaceBetween: 10,
                  },
                }}
                modules={[Autoplay]}
                className="exhbitorSwiper "
              >
                {Array.from({ length: 8 }).map((_, index) => {
                  return (
                    <SwiperSlide key={`speaker-${index}`}>
                      <div className="card-exhibitor-item  border rounded card placeholder-glow">
                        <div className="exhibitor-image-wrapper placeholder">
                          <div
                            className="placeholder"
                            style={{ width: "100%", height: "150px" }}
                          ></div>
                        </div>
                      
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        ) : (
          <div>
            {exhibitorsData.length > 0 && (
              <div className="mt-4 slider-with-gradients position-relative">
                <div className="gradient-overlay gradient-left" />
                <Swiper
                  grabCursor={true}
                  centeredSlides={true}
                  spaceBetween={10}
                  slidesPerView={4}
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
                      slidesPerView: 5.5,
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
                  {exhibitorsData.slice(0, 10).map((m: any, index: number) => {
                    var item: ExhibitorModel = m;
                    const formatedCompanyName = Helper.formatUrlParameter(
                      item.company_name
                    );
                    return (
                      <SwiperSlide key={`speaker-${index}`}>
                        <Link
                          href={`/exhibitor/${formatedCompanyName}`}
                          style={{ color: "unset" }}
                          key={`speaker-${index}`}
                          className=""
                        >
                          <div className="card h-100">
                            <div className="image-wrapper">
                              <img
                                width={300}
                                height={160}
                                src={
                                  item?.company_logo ||
                                  "/assets/imgs/placeholder/logo placeholder.png"
                                }
                                alt={item.company_name}
                                className="sponsor-img p-4"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                           
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <div className="gradient-overlay gradient-right" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
