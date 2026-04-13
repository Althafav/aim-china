import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { Homepage } from "@/models/homepage";
import { Carditem } from "@/models/carditem";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface PageDataProps {
  pageData: Homepage | null;
}

const AwardsComponent: React.FC<PageDataProps> = ({ pageData }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      {pageData?.awardsitem.value.length > 1 && (
        <section>
          <div className="awards-carousel-component">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="section-heading mb-5">
                    {pageData?.awardsheading.value}
                  </h2>
                </div>
                <div className="col-12 position-relative">
                  {/* Custom Navigation Buttons */}
                  <button ref={prevRef} className="custom-swiper-button prev">
                    <FaChevronLeft />
                  </button>
                  <button ref={nextRef} className="custom-swiper-button next">
                    <FaChevronRight />
                  </button>
                  <Swiper
                    grabCursor={true}
                    centeredSlides={false}
                    spaceBetween={10}
                    slidesPerView={4}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    loop={true}
                    autoplay={{
                      delay: 3000,

                      pauseOnMouseEnter: true,
                    }}
                    speed={1000}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      480: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    modules={[Navigation]}
                    className="AwardSwiper "
                    onInit={(swiper) => {
                      // Set navigation elements after Swiper initializes
                      if (
                        swiper.params.navigation &&
                        typeof swiper.params.navigation !== "boolean"
                      ) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }
                    }}
                  >
                    {pageData?.awardsitem.value.map((m: any, index: number) => {
                      var item: Carditem = m;
                      return (
                        <SwiperSlide className="" key={`award-${index}`}>
                          <Link href={item.link.value}>
                            <div className="award-item">
                              <img
                                src={item.image.value[0]?.url}
                                alt={item.name.value}
                              />
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AwardsComponent;
