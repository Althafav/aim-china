import React, { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/pagination"; // Optional
import "swiper/css/navigation"; // Optional

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import {
  IoArrowForwardCircle,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function YoutubeSectionComponent(props: any) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(props.pageData.youtubeitems.length <= 1);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const updateEdgeFlags = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: any) => {
    updateEdgeFlags(swiper);
    setActiveIndex(swiper.activeIndex);

    setTimeout(() => {}, 300);
  };

  return (
    <div className="youtube-section-component py-5">
      <div className="container px-4">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <p className="section-heading-2026 text-primary">
                {props.pageData.youtubeheading.value}
              </p>
              <p className="subHead">
                {props.pageData.youtubesubheading.value}
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <Link
                href="https://www.youtube.com/@AnnualInvestmentMeeting"
                target="_blank"
                className="px-4 py-2 bg-black text-white rounded-pill d-flex align-items-center gap-2"
              >
                <span>View AIM Youtube</span>

                <IoArrowForwardCircleOutline size={32} />
              </Link>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center">
            {/* <img src="/assets/imgs/yt-1.png" alt="" style={{width: "100%", maxWidth: "660px"}}/> */}
          </div>

          <div className="row justify-content-center">
            <Swiper
              grabCursor
              centeredSlides={true}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay, Navigation]}
              className="youtube-swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {props.pageData.youtubeitems.value.map(
                (item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="youtube-frame">
                      <iframe
                        src={item.embedlink.value}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="youtube-iframe"
                      ></iframe>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>

            <div className="d-flex justify-content-end  gap-2 ">
              <button
                ref={prevRef}
                disabled={isBeginning}
                className={`nav-arrow  bg-black rounded-circle border d-flex align-items-center justify-content-center ${
                  isBeginning ? "disabled opacity-25" : ""
                }`}
                style={{ width: "40px", height: "40px" }}
              >
                <FaArrowLeft color="white" />
              </button>
              <button
                ref={nextRef}
                disabled={isEnd}
                className={`nav-arrow  bg-black rounded-circle border d-flex align-items-center justify-content-center ${
                  isEnd ? "disabled opacity-25" : ""
                }`}
                style={{ width: "40px", height: "40px" }}
              >
                <FaArrowRight color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
