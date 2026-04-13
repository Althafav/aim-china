import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";
import Image from "next/image";

const PORTFOLIOS = [
  {
    portfolioName: "Foreign Direct Investment",
    link: "/foreign-direct-investment",
  },
  {
    portfolioName: "Global Trade",
    link: "/global-trade",
  },
  {
    portfolioName: "Global Manufacturing",
    link: "/global-manufacturing",
  },
  {
    portfolioName: "Future Cities",
    link: "/future-cities",
  },
  {
    portfolioName: "Digital Economy",
    link: "/digital-economy",
  },
  {
    portfolioName: "Future Finance",
    link: "/future-finance",
  },
  {
    portfolioName: "Startups & Unicorns",
    link: "/startup",
  },
  {
    portfolioName: "Entrepreneurs",
    link: "/entrepreneurs",
  },
 
];

export default function PorfolioSpeakerCarousel() {
  const router = useRouter();
  const [speakerData, setSpeakerData] = useState<any[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePortfolio, setActivePortfolio] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = router.asPath.split("/");
    const portfolioPath = pathParts[1];

    const portfolioObj = PORTFOLIOS.find(
      (p) => p.link === `/${portfolioPath}` || router.asPath.startsWith(p.link)
    );

    setActivePortfolio(portfolioObj?.portfolioName || null);
  }, [router.asPath]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/api/speakers2025");
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

  useEffect(() => {
    if (speakerData.length > 0 && activePortfolio) {
      const filtered = speakerData.filter((speaker) => {
        if (!speaker.Portfolio) return false;
        return speaker.Portfolio.includes(activePortfolio);
      });
      setFilteredSpeakers(filtered);
    } else {
      setFilteredSpeakers(speakerData.filter((item) => item.Portfolio));
    }
  }, [speakerData, activePortfolio]);

  const getHeading = () => {
    if (activePortfolio) {
      return ` ${activePortfolio} Speakers`;
    }
    return "";
  };

  return (
    <div className="speaker-component-wrapper">
      <div className="container">
        <div className="row g-3 align-items-center">
          <div className="col-lg-10">
            <h2
              className="section-heading text-start"
              style={{ maxWidth: "800px" }}
            >
              {getHeading()}
            </h2>
          </div>
          <div className="col-lg-2 d-flex justify-content-lg-end">
            <div>
              <Link href="/speakers">
                <span className="bg-primary p-2">View all Speakers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        // Placeholder UI while loading
        <div className="mt-4">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={4.5}
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
              320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 10,
              },
              1440: {
                slidesPerView: 4.5,
                spaceBetween: 10,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1920: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
              2560: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={`placeholder-${index}`}>
                <div className="card-speaker-item border card  placeholder-glow">
                  <div className="speaker-image-wrapper placeholder">
                    <div
                      className="placeholder-image"
                      style={{
                        width: "100%",
                        backgroundColor: "gray",
                      }}
                    ></div>
                  </div>
                  <div className="card-body-speaker card-body">
                    <p className="placeholder w-100"></p>
                    <p className="placeholder w-100"></p>
                    <p className="placeholder w-100"></p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : // Render actual speakers once data is available
      filteredSpeakers.length > 0 ? (
        <div className="mt-4">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={4.5}
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
              320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 10,
              },
              1440: {
                slidesPerView: 4.5,
                spaceBetween: 10,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1920: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
              2560: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {filteredSpeakers
              .slice(0, 20)
              .map((item: conferenceSpeakerModel2025, index: number) => (
                <SwiperSlide key={`speaker-${index}`}>
                  <Link
                    href={`/speaker/${item.ItemID}`}
                    style={{ color: "unset" }}
                  >
                    <div className="card-speaker-item border">
                      <div className="speaker-image-wrapper">
                        <Image
                          width={290}
                          height={300}
                          src={
                            item?.Image || "/assets/imgs/Generic_Speaker.png"
                          }
                          alt={item.FirstName}
                          className="speaker-image"
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                      </div>
                      <div className="card-body-speaker">
                        <p className="name">
                          {item.FirstName} {item.LastName}
                        </p>
                        <p className="designation">{item.Designation}</p>
                        <p>{item.Company}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
