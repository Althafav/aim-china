import { Partnerspageitem } from '@/models/partnerspageitem';
import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';


interface PageDataProps {
    pageData: Portfoliopage | null;
}

const CurrentPartners: React.FC<PageDataProps> = ({ pageData }) => {

    if (!pageData) {
        return <></>;
    }

    return (
        <div className='keyplayers-carousel-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className='section-heading text-center'> {pageData.currentpartnersheading.value}</h2>
                    </div>
                </div>






            </div>

            <div className="row mt-4 justify-content-center">
                <Swiper

                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={20}
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

                    modules={[Autoplay]}
                    className="SpeakerSwiper w-100"
                >
                    {pageData.currentparntersitems.value.map((m: any, index: number) => {
                        var item: Serviceitem = m;
                        return (
                            <SwiperSlide key={`keyplayers-${index}`}>
                                <Link href={`/our-partner?id=${item.system.id}`}>
                                    <div className='key-players-wrap' >
                                        <div className="keyplayers-card">

                                            <img width={175} height={175} src={item.image?.value[0]?.url} alt={item.name.value}
                                                style={{ objectFit: "contain", marginRight: "10px" }} className='key-player-image' />
                                        </div>


                                        <div className="card-body-speaker">
                                            <p className="key-player-name text-dark" >{item.name.value}</p>

                                        </div>

                                    </div>

                                </Link>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>

        </div>
    )
}

export default CurrentPartners;
