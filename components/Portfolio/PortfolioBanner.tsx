import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";
import { Buttonitem } from '@/models/buttonitem';


export default function PortfolioBanner(props: any) {

    return (
        <div className="portfolio-banner-wrapper">


            <motion.img
                src={props.bannerImageSrc}
                alt=""
                className="banner-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />

            <div className="text-container container">
                <h1 className='banner-heading'>
                    {props.Heading}
                </h1>
                <h2 className='banner-heading-2'>{props.subHeading}</h2>


                <div className='mt-3 d-flex align-items-lg-center align-items-start gap-3 flex-lg-row flex-column-reverse'>
                    {props.ctaButton.map((m: any, index: number) => {
                        var item: Buttonitem = m;
                        return (
                            <Link href={item.link.value} key={`button-${index}`} target={item.target.value == 1 ? "_blank" : "_self"}>
                                <button className={`register-interest-cta ${props.portfolioColorName}`}>{item.name.value}</button>
                            </Link>
                        )
                    })}
                    <p className='date-venue'>{props.dateVenu}</p>
                </div>





            </div>
        </div>
    )
}
