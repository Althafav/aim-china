import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react'



import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


interface PageDataProps {
    pageData: Portfoliopage | null;
}

const PartnersCarousel: React.FC<PageDataProps> = ({ pageData }) => {

    if (!pageData) {
        return <></>;
    }

    return (
        <div className='partner-carousel-wrapper'>
            <Swiper

                grabCursor={true}
                centeredSlides={true}
                spaceBetween={60}
                slidesPerView={4.5}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={1000}

                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4.5,
                        spaceBetween: 60,
                    },
                }}

                modules={[Pagination, Autoplay]}
                className="PartnerSwiper w-100"
            >
                {pageData.keyagendaitems.value.map((m: any, index: number) => {
                    var item: Serviceitem = m;
                    return (
                        <SwiperSlide key={`speaker-${index}`}>

                            <div className='key-players-card' key={`keyplayers-${index}`}>
                                <Link href={item.link.value}>
                                    <div className="card-speaker-item" >


                                        <img width={175} height={175} src={item.image?.value[0]?.url} alt={item.name.value}
                                            className="speaker-image" />

                                        <div className="card-body-speaker">
                                            <p className="name text-dark" >{item.name.value}</p>

                                        </div>
                                    </div>

                                </Link>
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>

        </div>
    )
}

export default PartnersCarousel
