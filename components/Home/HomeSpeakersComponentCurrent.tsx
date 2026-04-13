import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";
import ButtonComponent from "../Button/ButtonComponent";
import { useRouter } from "next/router";
import Image from "next/image";

export default function HomeSpeakersComponentCurrent() {
  const [speakerData, setSpeakerData] = useState<conferenceSpeakerModel2025[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const { locale } = useRouter();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/api/speakers-2025");
        if (!res.ok) throw new Error("Failed to fetch speakers");
        const data = await res.json();
        setSpeakerData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  // Return nothing if no data
  if (speakerData.length <= 0 && !loading) return null;

  // Filter speakers by type
  const highLevelSpeakers = speakerData.filter((s) => s.HighLevel);
  const regularSpeakers = speakerData.filter((s) => !s.HighLevel);

  const swiperSettings = {
    grabCursor: true,
    centeredSlides: false,
    spaceBetween: 10,
    slidesPerView: 4.5,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1000,
    modules: [Autoplay],
    className: "SpeakerSwiper",
    breakpoints: {
      320: { slidesPerView: 1.5, spaceBetween: 10 },
      480: { slidesPerView: 1.5, spaceBetween: 10 },
      768: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 3.2, spaceBetween: 10 },
      1280: { slidesPerView: 5.5, spaceBetween: 10 },
      1440: { slidesPerView: 6.2, spaceBetween: 10 },
    },
  };

  const renderSpeakerCard = (item: conferenceSpeakerModel2025) => (
    <Link href={`/speaker/${item.ItemID}`} style={{ color: "unset" }}>
      <div className="card-speaker-itemv2 border "  >
        <div className="speaker-image-wrapperv2">
          <Image
            width={290}
            height={400}
            src={item?.Image}
            alt={item.FirstName}
            className="speaker-imagev2"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="card-body-speaker-floatingv2">
          <p className="name small" style={{ fontSize: "14px" }}>
            {item.FirstName} {item.LastName}
          </p>
          <p className="designation small" style={{ fontSize: "14px" }}>
            {item.Designation}
          </p>
          <p style={{ fontSize: "12px" }}>{item.Company}</p>
        </div>
      </div>
    </Link>
  );

  const renderPlaceholder = () => (
    <Swiper {...swiperSettings}>
      {Array.from({ length: 8 }).map((_, i) => (
        <SwiperSlide key={`placeholder-${i}`}>
          <div className="card-speaker-item border placeholder-glow">
            <div className="speaker-image-wrapper">
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <>
      {/* --- High Level Speakers Section --- */}
      {highLevelSpeakers.length > 0 && (
        <div className="speaker-component-wrapper-2026v2 py-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <h2
              className="section-heading-2026 text-black text-start mb-0"
              style={{ maxWidth: "800px" }}
            >
              {locale === "cn" ? "高级演讲者" : "High Level Speakers"}
            </h2>
            <ButtonComponent name="View all Speakers" link="/speakers-2025" />
          </div>

          <div className="row mt-4 slider-with-gradients position-relative">
            {loading ? (
              renderPlaceholder()
            ) : (
              <Swiper {...swiperSettings}>
                {highLevelSpeakers.slice(0, 20).map((item) => (
                  <SwiperSlide key={item.ItemID}>
                    {renderSpeakerCard(item)}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}

      {/* --- Add spacing between the two sections --- */}
      {highLevelSpeakers.length > 0 && regularSpeakers.length > 0 && (
        <div className="my-5" />
      )}

      {/* --- Regular Speakers Section --- */}
      {regularSpeakers.length > 0 && (
        <div className="speaker-component-wrapper-2026v2 py-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <h2
              className="section-heading-2026 text-black text-start mb-0"
              style={{ maxWidth: "800px" }}
            >
              {locale === "cn" ? "扬声器" : "Speakers"}
            </h2>
            <ButtonComponent name="View all Speakers" link="/speakers-2025" />
          </div>

          <div className="row mt-4 slider-with-gradients position-relative">
            {loading ? (
              renderPlaceholder()
            ) : (
              <Swiper {...swiperSettings}>
                {regularSpeakers.slice(0, 20).map((item) => (
                  <SwiperSlide key={item.ItemID}>
                    {renderSpeakerCard(item)}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </>
  );
}
