import React from 'react'
import { Portfoliopage } from "@/models/portfoliopage"
import { motion } from "framer-motion"
import { Serviceitem } from '@/models/serviceitem';

interface PageDataProps {
    pageData: Portfoliopage | null;
}
export const KeyAgenda: React.FC<PageDataProps> = ({ pageData }) => {

    if (!pageData) {
        return <></>;
    }
    return (
        <motion.div
            className='key-agenda-section-wrapper'
            style={{
                backgroundImage: `url(${pageData.keyagendabackgroundimage.value[0]?.url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}

        >
            <div className="container">
                <motion.h2
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-center section-heading text-white fw-normal'>{pageData.keyagendaheading.value}</motion.h2>

                <div className="row mt-5 g-3 justify-content-center">
                    {pageData.keyagendaitems.value.map((m: any, index) => {
                        var item: Serviceitem = m;
                        return (
                            <motion.div
                                className="col-lg-2 col-md-4 col-6"
                                key={index}

                            >
                                <motion.div className="key-agenda-card" initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 * index, ease: 'easeInOut' }}
                                    viewport={{ once: true, amount: 0.1 }}>
                                    <h4 className="name">{item.name.value}</h4>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}