import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Homepage } from '@/models/homepage';
import { ImageButton } from '@/models/image_button';


interface PageDataProps {
    pageData: Homepage | null
}


const AudientsCTAComponent: React.FC<PageDataProps> = ({ pageData }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className='audients-section-wrapper mt-5'>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-center">

                        <motion.div
                            className='main-head'
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: 'easeInOut' }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <span className='' style={{ textTransform: "capitalize" }}>{pageData?.targetaudientsheading.value}</span>
                        </motion.div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">

                        <motion.p
                            className='sub-head'
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {pageData?.targetaudientssubheading.value}
                        </motion.p>
                    </div>


                </div>

                <div className="row justify-content-center">
                    {pageData?.targetaudientscta.value.map((m: any, index: number) => {
                        var item: ImageButton = m;
                        return (
                            <motion.div className="col-lg-3  col-md-6 col-12 mb-4 mb-lg-0" initial={{ y: 100, opacity: 0 }}
                                animate={{ y: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }} key={`audients-cta-${index}`}>
                                <div className="cta-card-item">
                                    <Link href={item.link.value}>

                                        <Image width={340} height={200} layout='responsive' src={item.image.value[0]?.url} alt={item.name.value} />
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}

                </div>

            </div>

        </div>
    );
};

export default AudientsCTAComponent;