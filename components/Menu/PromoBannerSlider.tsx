// PromotionBannerSwiper.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Promobanner } from "@/models/promobanner";
import Link from "next/link";

const PromotionBannerSwiper: React.FC<any> = ({ promoBanners }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      modules={[Autoplay]}
    >
      {promoBanners.map((item: any, index: number) => (
        <SwiperSlide key={index}>
          <Link href={item.link.value}>
            <img
              src={item.image.value[0]?.url}
              alt={`Slide ${index + 1}`}
              className="rounded"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromotionBannerSwiper;
