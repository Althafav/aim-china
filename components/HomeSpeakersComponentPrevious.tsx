import { Portfoliopage } from "@/models/portfoliopage";
import { Speaker } from "@/models/speaker";
import { Speakers2024 } from "@/models/speakers2024";
import { Speakers2025 } from "@/models/speakers2025";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import Services from "@/modules/Services";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function HomeSpeakersComponentPrevious() {
  const [speakerData, setSpeakerData] = useState<Speakers2024 | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("speakers_2024")
      .toObservable()
      .subscribe((response: any) => {
        setSpeakerData(response.item);
      });
  }, []);

  if (!speakerData) {
    return <></>;
  }

  return (
    <section className="speaker-component-wrapper">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="">
            <h2
              className="section-heading text-start"
              style={{ maxWidth: "800px" }}
            >
              {speakerData.heading.value}
            </h2>
          </div>

          <div className="d-flex justify-content-lg-end">
            <div>
              <Link href="/speakers-2024">
                <span className="bg-primary p-2">View all Speakers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
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
              slidesPerView: 1.2,
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
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 4.2,
              spaceBetween: 10,
            },
            1600: {
              slidesPerView: 4.8,
              spaceBetween: 15,
            },
            1920: {
              slidesPerView: 5.2,
              spaceBetween: 15,
            },
            2460: {
              slidesPerView: 5.8,
              spaceBetween: 20,
            },

            2760: {
              slidesPerView: 6.2,
              spaceBetween: 20,
            },
            3460: {
              slidesPerView: 6.8,
              spaceBetween: 20,
            },

            3760: {
              slidesPerView: 7.2,
              spaceBetween: 20,
            },

            4460: {
              slidesPerView: 10,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
          className="SpeakerSwiper w-100"
        >
          {speakerData.items.value.slice(0, 20).map((m: any, index: number) => {
            var item: Speaker = m;
            return (
              <SwiperSlide key={`speaker-${index}`}>
                <a
                  href={`#`}
                  style={{ color: "unset" }}
                  key={`speaker-${index}`}
                >
                  <div className="card-speaker-item border">
                    <div className="speaker-image-wrapper">
                      <img
                        width={290}
                        height={300}
                        src={item.image.value[0]?.url}
                        alt={item.name.value}
                        className="speaker-image"
                      />
                    </div>
                    <div className="card-body-speaker">
                      <p className="name">{item.name.value}</p>
                      <p className="designation ">{item.designation.value}</p>
                      <p>{item.company.value}</p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* 
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-lg-center">
                        <Link href="/speakers">

                            <button className="aim-btn">View More</button>
                        </Link>
                    </div>
                </div> */}
      </div>
    </section>
  );
}
