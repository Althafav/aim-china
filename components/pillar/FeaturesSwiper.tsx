import { Featuresactivitiesitem } from "@/models/featuresactivitiesitem";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import Link from "next/link";
import ButtonComponent from "../Button/ButtonComponent";

interface FeaturesSwiperProps {
  heading: string;
  cards: Featuresactivitiesitem[] | any[];
}

export default function FeaturesSwiper({
  cards,
  heading,
}: FeaturesSwiperProps) {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(cards.length <= 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const updateEdgeFlags = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: any) => {
    updateEdgeFlags(swiper);
    setActiveIndex(swiper.activeIndex);
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

  return (
    <div className="features-activities-home-section-wrapper">
      <div className="">
        <div className="row">
          {/* Text Section */}
          <div className="col-12 col-md-6 p-4 mt-sm-5 h-100">
            <div
              className="feature-content-wrapper "
              style={{ minHeight: "350px" }}
            >
              <h2 className="section-heading-2026 mb-4 text-black">
                {heading}
              </h2>
              <div>
                <h4 className="h3 mb-3 text-black">
                  {cards[activeIndex]?.name?.value}
                </h4>
                <div className="mb-4">
                  <span
                    className="text-muted"
                    dangerouslySetInnerHTML={{
                      __html: cards[activeIndex]?.content?.value || "",
                    }}
                  />
                </div>

                <div>
                  {cards[activeIndex]?.link?.value && (
                    <ButtonComponent
                      name={cards[activeIndex]?.buttonname?.value}
                      link={cards[activeIndex]?.link?.value}
                    />
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="mt-sm-4 navigation-arrow-wrapper ">
                <div className="d-flex gap-1">
                  <button
                    ref={prevRef}
                    disabled={isBeginning}
                    className={` p-0 bg-white d-flex align-items-center justify-content-center ${
                      isBeginning ? "opacity-25 disabled" : ""
                    }`}
                  >
                    <IoArrowBackCircleOutline size={40} />
                  </button>
                  <button
                    ref={nextRef}
                    disabled={isEnd}
                    className={` p-0 bg-white d-flex align-items-center justify-content-center ${
                      isEnd ? "opacity-25 disabled" : ""
                    }`}
                  >
                    <IoArrowForwardCircleOutline size={40} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Swiper Section */}
          <div className="col-12 col-md-6 d-none d-sm-block">
            <Swiper
              modules={[Navigation]}
              grabCursor
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateEdgeFlags(swiper);
              }}
              onSlideChange={handleSlideChange}
            >
              {cards.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <div
                    className="ratio ratio-1x1"
                    style={{ maxHeight: "450px" }}
                  >
                    <img
                      className="rounded-3xl"
                      src={item.image.value[0]?.url}
                      alt=""
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
