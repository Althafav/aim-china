import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

interface PageDataProps {
    pageData: Portfoliopage | null;
}

export const FeaturesActivities: React.FC<PageDataProps> = ({ pageData }) => {
    if (!pageData) {
        return <></>;
    }

    return (
        <section>
            <div className="features-activities-section-wrapper">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <h2 className="section-heading">
                                {pageData.featureheading.value}
                            </h2>
                        </div>





                    </div>

                    <div className="row g-4 mt-3 justify-content-center">
                        {pageData.features.value.map((m: any, index: number) => {
                            var item: Serviceitem = m;
                            return (
                                <motion.div className="col-lg-3 col-md-6" key={`features-${index}`}>
                                    <motion.div className="features-card" initial={{ y: 100, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.2 * index, ease: 'easeInOut' }}
                                        viewport={{ once: true, amount: 0.1 }}>
                                        <Image
                                            width={310}
                                            height={270}

                                            src={item.image?.value[0]?.url}
                                            alt={`feature-${index + 1}`}
                                            className="activities-image-bg"
                                        />

                                        <div className='content-wrapper'>

                                            <p className="features-name">{item.name.value}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
