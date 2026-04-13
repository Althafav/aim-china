import { Sponsorspage } from "@/models/sponsorspage";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import ButtonComponent from "../Button/ButtonComponent";

interface PartnersDataModel {
  categories: string[];
  items: PartnerItemModel[];
}

interface PartnerItemModel {
  id: string;
  name: string;
  website: string;
  content: string;
  logo: {
    url: string;
  };
}

export default function PartnersComponentCurrent() {
  const [pageData, setPageData] = useState<Sponsorspage | null>(null);
  const [loading, setLoading] = useState(true);
  const [partnersData, setPartnersData] =
    useState<Array<PartnersDataModel> | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch("/api/partners2025");
        const partners = await response.json();

        const allItems = partners.data.flatMap(
          (category: any) => category.Items
        );

        setPartnersData(allItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  if (!partnersData) {
    return <></>;
  }

  return (
    <div className="speaker-component-wrapper-2026">
      <div className="">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="col-lg-10">
            <h2
              className="section-heading text-start"
              style={{ maxWidth: "800px" }}
            >
              AIM Congress 2025 Partners
            </h2>
          </div>

          <div className=" d-flex justify-content-lg-end">
            <div>
              <ButtonComponent name="View all Partners" link="/our-partners" />
            </div>
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
        <div className="mt-4">
          <div className="row mt-4 slider-with-gradients position-relative">
            <div className="gradient-overlay gradient-left" />
            <Swiper
              grabCursor={true}
              centeredSlides={true}
              spaceBetween={30}
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
              {partnersData
                ?.filter((m: any) => m.category !== "Conference Participants")
                .slice(0, 20)
                .map((m: any, index: number) => {
                  var item: PartnerItemModel = m;
                  return (
                    <SwiperSlide key={`partner-${index}`}>
                      <div className="card h-100">
                        <Link href={`/our-partner?id=${item.id}`}>
                          <div className="image-wrapper">
                            <Image
                              src={item.logo.url}
                              title={item.name}
                              alt={item.name}
                              width={290}
                              height={160}
                              className="sponsor-img p-4"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            <div className="gradient-overlay gradient-right" />
          </div>
        </div>
      )}
    </div>
  );
}
