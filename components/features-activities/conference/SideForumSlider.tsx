import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Sideforumitem2026 } from "@/models/sideforumitem2026";
import ButtonComponent from "@/components/Button/ButtonComponent";

interface PageDataProps {
  items: Sideforumitem2026[];
}

const SideForumSlider: React.FC<PageDataProps> = ({ items }) => {
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
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {items.map((sideforumItem, index) => (
          <SwiperSlide key={index}>
            <div className="side-forum-item-card row g-3 align-items-stretch">
              <div className="col-12">
                <h4 className="text-black mb-3">
                  {sideforumItem.sessionname.value}
                </h4>

                <ButtonComponent
                  link={`/side-forums/${sideforumItem.slug.value}`}
                  name="Read More"
                  className="mb-3"
                />
              </div>
              <div className="col-6 col-lg-2 mb-3 mb-lg-0">
                {sideforumItem.entityitems.value.map((e, i) => (
                  <div key={i} className="mb-3">
                    <Link href={e.websitelink.value}>
                      <img
                        className="w-75 object-contain mb-2 border rounded p-2"
                        src={e.logo.value[0]?.url}
                        alt=""
                      />
                    </Link>
                    <p className="small">{e.name.value}</p>
                  </div>
                ))}
              </div>

              {/* Center: Large Image */}
              <div className="col-lg-5">
                <img
                  src={sideforumItem.images.value[0]?.url}
                  className="img-fluid large-img"
                  alt="Main"
                />
              </div>

              {/* Right: 2 stacked small images */}
              <div className="col-lg-5 d-flex flex-column gap-3">
                <img
                  src={sideforumItem.images.value[1]?.url}
                  className="img-fluid small-img"
                  alt="Small Top"
                />
                <img
                  src={sideforumItem.images.value[2]?.url}
                  className="img-fluid small-img"
                  alt="Small Bottom"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-flex  gap-2 mt-5">
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
  );
};

export default SideForumSlider;
