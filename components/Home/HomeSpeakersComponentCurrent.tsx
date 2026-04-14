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
  const [speakerData, setSpeakerData] = useState<conferenceSpeakerModel2025[]>([]);
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

  if (!loading && speakerData.length === 0) return null;

  const highLevelSpeakers = speakerData.filter((s) => s.HighLevel);
  const regularSpeakers = speakerData.filter((s) => !s.HighLevel);

  const swiperSettings = {
    grabCursor: true,
    centeredSlides: false,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1000,
    modules: [Autoplay],
    breakpoints: {
      0:    { slidesPerView: 1.5, spaceBetween: 10 },
      480:  { slidesPerView: 2,   spaceBetween: 12 },
      768:  { slidesPerView: 3,   spaceBetween: 14 },
      1024: { slidesPerView: 4,   spaceBetween: 16 },
      1280: { slidesPerView: 5,   spaceBetween: 16 },
      1440: { slidesPerView: 6,   spaceBetween: 16 },
    },
  };

  const SpeakerCard = ({ item }: { item: conferenceSpeakerModel2025 }) => (
    <Link href={`/speaker/${item.ItemID}`} style={{ color: "unset", textDecoration: "none" }}>
      <div
        className="card border-0 shadow-sm overflow-hidden"
        style={{ borderRadius: "12px" }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "3/4" }}>
          <Image
            fill
            src={item.Image}
            alt={`${item.FirstName} ${item.LastName}`}
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 480px) 60vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
          />
        </div>
        <div className="card-body px-3 py-2">
          <p className="mb-1 fw-semibold text-dark" style={{ fontSize: "14px", lineHeight: "1.3" }}>
            {item.FirstName} {item.LastName}
          </p>
          <p className="mb-0 text-secondary" style={{ fontSize: "12px", lineHeight: "1.3" }}>
            {item.Designation}
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: "11px" }}>
            {item.Company}
          </p>
        </div>
      </div>
    </Link>
  );

  const SkeletonCard = () => (
    <div className="card border-0 shadow-sm overflow-hidden placeholder-glow" style={{ borderRadius: "12px" }}>
      <div style={{ aspectRatio: "3/4", background: "#e0e0e0" }} className="placeholder w-100" />
      <div className="card-body px-3 py-2">
        <p className="placeholder col-8 mb-1" style={{ height: "14px" }} />
        <p className="placeholder col-6 mb-1" style={{ height: "12px" }} />
        <p className="placeholder col-4 mb-0" style={{ height: "11px" }} />
      </div>
    </div>
  );

  const SpeakerSwiper = ({ speakers }: { speakers: conferenceSpeakerModel2025[] }) => (
    <Swiper {...swiperSettings}>
      {speakers.map((item) => (
        <SwiperSlide key={item.ItemID}>
          <SpeakerCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const SkeletonSwiper = () => (
    <Swiper {...swiperSettings}>
      {Array.from({ length: 8 }).map((_, i) => (
        <SwiperSlide key={`skeleton-${i}`}>
          <SkeletonCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <>
      {/* High Level Speakers */}
      {(loading || highLevelSpeakers.length > 0) && (
        <div className="py-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h2 className="h4 fw-bold text-dark mb-0" style={{ maxWidth: "800px" }}>
              {locale === "cn"
                ? "高级演讲者"
                : "AIM Congress - China Chapter 2025 High Level Speakers"}
            </h2>
            <ButtonComponent name="View all Speakers" link="/speakers-2025" />
          </div>
          <div className="position-relative">
            {loading ? <SkeletonSwiper /> : <SpeakerSwiper speakers={highLevelSpeakers.slice(0, 20)} />}
          </div>
        </div>
      )}

      {/* Regular Speakers */}
      {/* {(loading || regularSpeakers.length > 0) && (
        <div className="py-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h2 className="h4 fw-bold text-dark mb-0" style={{ maxWidth: "800px" }}>
              {locale === "cn" ? "演讲者" : "AIM Congress - China Chapter 2025 Speakers"}
            </h2>
            <ButtonComponent name="View all Speakers" link="/speakers-2025" />
          </div>
          <div className="position-relative">
            {loading ? <SkeletonSwiper /> : <SpeakerSwiper speakers={regularSpeakers} />}
          </div>
        </div>
      )} */}
    </>
  );
}