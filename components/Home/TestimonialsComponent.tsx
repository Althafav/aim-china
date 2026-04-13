
import { Homepage } from "@/models/homepage";
import React, { useEffect, useRef, useState } from "react";

interface PageDataProps {
  pageData: Homepage | null;
}

export default function TestimonialsComponent({ pageData }: PageDataProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMuted, setIsMuted] = useState<boolean[]>(
    new Array(pageData?.testimonials.value.length).fill(true)
  );
  const [isHovered, setIsHovered] = useState<boolean[]>(
    new Array(pageData?.testimonials.value.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    setIsHovered((prevState) =>
      prevState.map((hovered, i) => (i === index ? true : hovered))
    );
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play().catch((error) => {});
    }
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered((prevState) =>
      prevState.map((hovered, i) => (i === index ? false : hovered))
    );
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.pause();
      videoRefs.current[index]!.currentTime = 0;
    }
  };

  const toggleMute = (index: number) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index]!.muted = !videoRefs.current[index]!.muted;
      setIsMuted((prevState) =>
        prevState.map((muted, i) => (i === index ? !muted : muted))
      );
    }
  };

  return (
    <section className="testimonails-component-wrapper">
      <div className="container">
        <div className="row g-4">
          {pageData?.testimonials.value.map((m: any, index: number) => {
            const item: any = m;
            return (
              <div className="col-lg-3" key={`testimonial-${index}`}>
                <div
                  className={`testimonial-card ${
                    !item.testimonialvideolink.value && "testimonial-card-2"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="preview-items">
                    <svg
                      width="58"
                      height="34"
                      viewBox="0 0 58 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M45.384 33.576H26.696L42.184 0.167969H57.672L45.384 33.576ZM20.68 33.576H0.455999L18.504 0.167969H33.992L20.68 33.576Z"
                        fill={`${
                          item.testimonialvideolink.value ? "#0094FB" : "white"
                        }`}
                      />
                    </svg>
                    <p className="testimonial-words-main mb-3">
                      {item.quote.value}
                    </p>

                    {item.content.value && (
                      <span
                        className="quote-sub  text-white"
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    )}

                    <div className="profile">
                      <span className="name">{item.name.value}</span>
                      <span className="company">{item.company.value}</span>
                    </div>
                  </div>

                  <img
                    src={item.profilepicture.value[0]?.url}
                    alt={item.name.value}
                    className="testimonial-img1"
                  />
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="video"
                    muted={isMuted[index]}
                  >
                    <source
                      src={item.testimonialvideolink.value}
                      type="video/mp4"
                    />
                  </video>

                  {item.testimonialvideolink.value && isHovered[index] && (
                    <button
                      className="mute-button"
                      onClick={() => toggleMute(index)}
                    >
                      {isMuted[index] ? "Unmute" : "Mute"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
