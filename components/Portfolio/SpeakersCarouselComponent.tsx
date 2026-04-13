import { Portfoliopage } from '@/models/portfoliopage';
import { Speaker } from '@/models/speaker';
import Globals from '@/modules/Globals';
import JsLoader from '@/modules/JsLoader';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


interface PageDataProps {
    pageData: Portfoliopage | null;
}

const SpeakersCarouselComponent: React.FC<PageDataProps> = ({ pageData }) => {


    if (!pageData) {
        return <></>;
    }



    return (
        <div className='partner-carousel-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className='section-heading text-center'> {pageData.speakersheading.value}</h2>
                    </div>
                </div>



            </div>
            <div className='row mt-4'>
                <Swiper

                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={10}
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

                    modules={[ Autoplay]}
                    className="SpeakerSwiper w-100"
                >


                    {pageData.speakersitems.value.map((m: any, index: number) => {
                        var item: Speaker = m;
                        return (
                            <SwiperSlide key={`speaker-item-${index}`}>

                                <div className='key-players-card card' key={`speaker-item-${index}`}>
                                    <div className="card-speaker-item">

                                        <Image width={175} height={175} src={item.image.value[0]?.url} alt={item.name.value}
                                            className="speaker-image" />

                                        <div className="card-body-speaker card-body">
                                            <p className="name text-dark" >{item.name.value}</p>
                                            <p className="designation " >{item.designation.value}</p>
                                            <p className="company text-dark" >{item.company.value}</p>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>

        </div>
    )
}

export default SpeakersCarouselComponent;
