import { Homepage2026 } from "@/models/homepage2026";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ButtonComponent from "../Button/ButtonComponent";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const TestimonialsComponent2026: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="testimonials-wrapper py-5 gradient-1">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="">
            <h2 className="section-heading-2026 theme-gradient-text  text-center">
              {pageData.testimonialsheading.value}
            </h2>
          </div>
          {pageData.testimonialctaname.value && (
            <div className=" d-flex justify-content-lg-end">
              <div>
                <ButtonComponent
                  name={pageData.testimonialctaname.value}
                  link={pageData.testimonialctalink.value}
                />
              </div>
            </div>
          )}
        </div>
        <div className="row justify-content-center">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            modules={[Autoplay]}
            className="SpeakerSwiper"
            breakpoints={{
              420: {
                slidesPerView: 1,
                spaceBetween: 10,
              },

              1024: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
          >
            {/* {pageData.testimonialitems.value.map((item: any, index: number) => {
              return (
                <SwiperSlide className="py-5" key={index}>
                  <div className="testimonial-card">
                    <img
                      src={item.image.value[0]?.url}
                      alt={item.name.value}
                      className="testimonial-img"
                    />
                    <h5 className="text-black mb-0 mt-1">{item.name.value}</h5>
                    <p className="mb-0 pb-0 small">{item.designation.value}</p>
                    <p className="mb-3 small">{item.company.value}</p>
                    <span
                      className="content"
                      dangerouslySetInnerHTML={{ __html: item.content.value }}
                    />
                  </div>
                </SwiperSlide>
              );
            })} */}
            {pageData.testimonialitems.value.map((item: any, index: number) => {
              return (
                <SwiperSlide className="py-5" key={index}>
                  <div className=" row g-3 testimonial-card-wrapper">
                    {/* <div className="col-lg-4">
                      <div
                        className="ratio ratio-4x3 bg-white h-100"
                        style={{ borderRadius: "30px" }}
                      >
                        <img
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          className="ratio ratio-4x3"
                          style={{ borderRadius: "30px", objectFit: "contain" }}
                        />
                      </div>
                    </div> */}

                    <div className="col-12">
                      <div
                        className="d-flex justify-content-between flex-column h-100 bg-white p-5 h-100"
                        style={{ borderRadius: "30px" }}
                      >
                        <div>
                          <div className="mb-3" style={{ borderRadius: "50%" }}>
                            <img
                              src={item.image.value[0]?.url}
                              alt={item.name.value}
                              className=""
                              style={{
                                borderRadius: "50%",
                                height: "80px",
                                width: "80px",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <h5 className="text-black mb-0 mt-1">
                            {item.name.value}
                          </h5>
                          <p className="mb-0 pb-0 small">
                            {item.designation.value}
                          </p>
                          <p className="mb-3 small">{item.company.value}</p>
                        </div>
                        <div
                          className="content-wrapper"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent2026;
