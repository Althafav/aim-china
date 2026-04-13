import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";
import Image from "next/image";

export default function FeaturedSpeakersComponent() {
  const [speakerData, setSpeakerData] = useState<any[]>([]);

  const HigherDignitaryOrderSpeaker = [
    "10012 - Intl. Organization - Head [Speaker]",
    "10022 - Minister [Speaker]",
    "10042 - VIP-S (Vice Ministers/Deputy Ministers) [Speaker]",
    "10052 - VIP-S (Governors and Deputy Governors) [Speaker]",
    "10082 - VIP-S (Head of IPAs) [Speaker]",
    "10092 - VIP-S (Head of Chambers) [Speaker]",
    "10102 - VIP-S (Head of Big Organizations) [Speaker]",
  ];

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/api/speakers2025");
        if (!res.ok) throw new Error("Failed to fetch speakers");
        const data = await res.json();
        setSpeakerData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpeakers();
  }, []);

  const sortedHighLevelDignitarySpeakers = speakerData.filter(
    (s: conferenceSpeakerModel2025) => s.HighLevelDignitary
  );

  if (sortedHighLevelDignitarySpeakers.length <= 0) {
    return <></>;
  }

  console.log("Fetched speakers:", sortedHighLevelDignitarySpeakers.length);

  return (
    <section className="speaker-component-wrapper">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="">
            <h2
              className="section-heading text-start"
              style={{ maxWidth: "800px" }}
            >
              High Level Dignitary Speakers
            </h2>
          </div>

          <div className=" d-flex justify-content-lg-end">
            <div>
              <Link href="/speakers">
                <span className="bg-primary p-2">View all Speakers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {sortedHighLevelDignitarySpeakers.length > 0 && (
        <div className="mt-4">
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
            // grid={{
            //   rows: 2,
            //   fill: "row",
            // }}

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
            className="SpeakerSwiper"
          >
            {sortedHighLevelDignitarySpeakers.map(
              (item: any, index: number) => (
                <SwiperSlide key={`speaker-${index}`}>
                  <Link
                    href={`/speaker/${item.ItemID}`}
                    style={{ color: "unset" }}
                  >
                    <div className="card-speaker-item border">
                      <div className="speaker-image-wrapper">
                        <Image
                          width={290}
                          height={300}
                          src={
                            item?.Image || "/assets/imgs/Generic_Speaker.png"
                          }
                          alt={item.FirstName}
                          className="speaker-image"
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                      </div>
                      <div className="card-body-speaker">
                        <p className="name">
                          {item.FirstName} {item.LastName}
                        </p>
                        <p className="designation">{item.Designation}</p>
                        <p>{item.Company}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      )}
    </section>
  );
}
