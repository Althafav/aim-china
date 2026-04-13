import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

interface PageDataProps {
    pageData: Portfoliopage | null;
}

export const AboutComponentRevamp: React.FC<PageDataProps> = ({ pageData }) => {
    if (!pageData) {
        return <></>;
    }

    return (
        <div className="about-section-wrapper" style={{
            backgroundImage: `url(${pageData.aboutbackgroundimage.value[0]?.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

            <div className="container">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="row"
                >
                    <div className="col-lg-8">
                        <motion.h2 className='heading'>{pageData.aboutheading.value}</motion.h2>
                        <motion.p

                            className='paragraph' dangerouslySetInnerHTML={{ __html: pageData.aboutparagraph.value }} />

                    </div>
                </motion.div>

            </div>

        </div>
    )
}
