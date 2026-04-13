
import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

interface CardGridProps {
    pageData: Portfoliopage | null;
}

const CardGrid: React.FC<CardGridProps> = ({ pageData }) => {

    if (!pageData) {
        return <></>;
    }

    const truncateText = (text: string, wordLimit: number) => {
        return text.split(" ").slice(0, wordLimit).join(" ") + (text.split(" ").length > wordLimit ? "..." : "");
    }

    return (

        <section className='key-features-section-wrapper '>
            <div className='section-container'>


                <div className="row key-benefits mt-4">
                    <div className="col-12">
                        <h1 className='section-heading'>{pageData.featureheading.value}
                        </h1>
                    </div>
                    <div className="col-12 mb-3">
                        <p className='sub-heading' style={{ textTransform: "capitalize" }}>{pageData.featuresubheading.value}</p>
                    </div>
                    <div className="row g-4 d-flex justify-content-center">
                        {pageData.features.value.map((m: any, index) => {
                            const item: Serviceitem = m;

                            return (
                                <div
                                    key={index}
                                    className={`col-lg-4 col-md-6`}
                                >
                                    <div className='activities-card'>
                                        <img
                                            src={item.image?.value[0]?.url}
                                            alt={`feature-${index + 1}`}
                                            className="activities-image-bg"
                                        />
                                        {/* <div className='feature-hovered-item'>
                                        <p className="fw-bold">{item.name.value}</p>
                                        <p
                                            className="desc"
                                            dangerouslySetInnerHTML={{ __html: truncateText(item.content.value, 30) }}
                                        />
                                    </div> */}
                                        <div className='content-wrapper'>

                                            <p className="features-name">{item.name.value}</p>
                                        </div>
                                    </div>


                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

        </section>
    )
}



export default CardGrid;


{/* <div className="masonry-container">
                        <div className="masonry-column">
                            <div className="card card-1">
                                <img src="/assets/imgs/economic-growth.png" alt="" className='benefit-card-bg' />
                            </div>
                            <div className="card card-2">
                                <img src="/assets/imgs/resources.png" alt="" className='benefit-card-bg' />
                            </div>
                        </div>
                        <div className="masonry-column">
                            <div className="card card-3">
                                <img src="/assets/imgs/sustainable-focus.png" alt="" className='benefit-card-bg' />
                            </div>
                            <div className="card card-4">
                                <img src="/assets/imgs/gp-influence.png" alt="" className='benefit-card-bg' />
                            </div>
                            <div className="card card-5">
                                <img src="/assets/imgs/risk-diversification.png" alt="" className='benefit-card-bg' />
                            </div>
                        </div>
                        <div className="masonry-column">
                            <div className="card card-6">
                                <img src="/assets/imgs/gpshift.png" alt="" className='benefit-card-bg' />
                            </div>
                            <div className="card card-7">
                                <img src="/assets/imgs/technology-innovation.png" alt="" className='benefit-card-bg' />
                            </div>
                        </div>
                        <div className="masonry-column">
                            <div className="card card-8">
                                <img src="/assets/imgs/market-expansion.png" alt="" className='benefit-card-bg' />
                            </div>
                            <div className="card card-9">
                                <img src="/assets/imgs/digital-transformation.png" alt="" className='benefit-card-bg' />
                            </div>
                        </div>
                    </div> */}
