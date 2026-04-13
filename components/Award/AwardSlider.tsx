import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Awarditem2026 } from "@/models/awarditem2026";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Props {
  items: Awarditem2026[];
}

const AwardSlider: React.FC<Props> = ({ items }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(items.length <= 1);
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
    <div className="award-slider-wrapper">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="award-card bg-black text-white  p-5  ">
              <img
                src={item.image.value[0]?.url}
                alt=""
                className="award-item-image"
              />
              <div className="content-wrapper d-flex flex-column justify-content-between gap-4 h-100">
                <div>
                  <h2 className="text-white">{item.category.value[0]?.name}</h2>
                  <p className="description text-white text-start">
                    {item.description.value}
                  </p>
                </div>
                <div className="mb-5">
                  <h4 className="text-white">{item.name.value}</h4>
                  <h6 className="text-white">{item.companyname.value}</h6>
                  <h6 className="text-white">{item.country.value}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {items.length > 1 && (
        <div className="custom-navigation-btns">
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
      )}
    </div>
  );
};

export default AwardSlider;
