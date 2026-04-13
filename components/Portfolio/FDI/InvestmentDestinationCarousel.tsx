import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import Image from 'next/image';
import Link from 'next/link';
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

const InvestmentDestinationCarousel: React.FC<PageDataProps> = ({ pageData }) => {


    if (!pageData) {
        return <></>;
    }

    return (
        <div className='investment-destination-carousel-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className='section-heading text-center'> {pageData.fdiInvestmentDestinationHeading.value}</h2>
                    </div>
                </div>




            </div>

            <div className="row mt-5">
                <Swiper

                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={60}
                    slidesPerView={1.5}
                   
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={1000}



                    modules={[ Autoplay]}
                    className="SingleSwiper w-100"
                >

                    {pageData.fdiInvestmentDestinationItems.value.map((m: any, index: number) => {
                        var item: Serviceitem = m;
                        return (

                            <SwiperSlide key={`investment-destination-${index}`}>

                                <div className='investment-destination-card' key={`investment-destination-${index}`}>

                                    <div className="row g-0">
                                        <div className="col-lg-3">
                                            <div className="card-body-investment-destination">


                                                <p className="name text-dark" >{item.name.value}</p>
                                                <p className='content' dangerouslySetInnerHTML={{ __html: item.content.value }}></p>
                                                <div className='mt-4'>
                                                    <Link href="/foreign-direct-investment/investment-destinations">
                                                        <button className='cta-btn  text-white' style={{ background: pageData.brandcolorcode.value }}>Learn More</button>

                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-9 mt-lg-0 mt-3">
                                            <Image width={858} height={483} src={item.image.value[0]?.url} alt={item.name.value}
                                                className="investment-destination-image" />
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

export default InvestmentDestinationCarousel;
