import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { Featuresactivitiesitem } from "@/models/featuresactivitiesitem";
import Image from "next/image";

interface CardSwiperProps {
  cards: Featuresactivitiesitem[] | any[];
}

export default function FeatureActivitiesSwiper({ cards }: CardSwiperProps) {
  const initialUrl = cards[0]?.image?.value[0]?.url || "";
  const [bgImage, setBgImage] = useState(initialUrl);
  const [fade, setFade] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(cards.length <= 1);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const updateEdgeFlags = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: any) => {
    updateEdgeFlags(swiper);
    setActiveIndex(swiper.activeIndex);
    const nextUrl = cards[swiper.activeIndex]?.image?.value[0]?.url || "";
    setFade(false);
    setTimeout(() => {
      setBgImage(nextUrl);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== "boolean"
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  if (!cards) {
    return null;
  }

  return (
    <div className="features-activities-swiper-wrapper position-relative w-100 bg-white text-white">
      {/* <div className={`bg-image-overlay ${fade ? "fade-in" : "fade-out"}`}>
        <Image
          fill
          priority
          src={bgImage}
          alt="Background"
          className="object-fit-cover w-100 h-100 bg-dark-overlay"
        />
      </div> */}

      <div className="container position-relative z-1 py-5">
        <h2 className="text-dark fs-2 mb-4">Featured Activities</h2>

        <div className="row g-4 align-items-center">
          <div className="col-md-6 ">
            <div className="d-flex flex-column justify-content-between">
              <div>
                <h3 className="text-primary fw-bold mb-3">
                  {cards[activeIndex]?.name?.value}
                </h3>
                <div
                  style={{ maxWidth: "500px" }}
                  className="text-dark fs-5"
                  dangerouslySetInnerHTML={{
                    __html: cards[activeIndex]?.content?.value || "",
                  }}
                />
                
              </div>

              <div className="d-flex  gap-2 mt-5">
                <button
                  ref={prevRef}
                  disabled={isBeginning}
                  className={`nav-arrow btn btn-light rounded-circle d-flex align-items-center justify-content-center ${
                    isBeginning ? "disabled opacity-25" : ""
                  }`}
                >
                  <FaArrowLeft />
                </button>
                <button
                  ref={nextRef}
                  disabled={isEnd}
                  className={`nav-arrow btn btn-light rounded-circle d-flex align-items-center justify-content-center ${
                    isEnd ? "disabled opacity-25" : ""
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <Swiper
              modules={[EffectCards, Navigation]}
              effect="cards"
              grabCursor
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateEdgeFlags(swiper);
              }}
              onSlideChange={handleSlideChange}
              className="swiper-container"
            >
              {cards.map((card, idx) => (
                <SwiperSlide key={idx}>
                  <div className="swiper-card rounded overflow-hidden shadow position-relative">
                    <img
                      src={card.image.value[0]?.url}
                      alt={card.name.value}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
