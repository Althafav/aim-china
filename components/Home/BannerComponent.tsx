import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Homepage } from "@/models/homepage";
import { Buttonitem } from "@/models/buttonitem";
import { Statsitem } from "@/models/statsitem";
import CountUp from "react-countup";
import { HiArrowLongRight } from "react-icons/hi2";
import { Homepage2026 } from "@/models/homepage2026";
import StatItem from "./Stats/StatItem";
import ButtonComponent from "../Button/ButtonComponent";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRightLong, FaThreads, FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const BannerComponent: React.FC<PageDataProps> = ({ pageData }) => {
  const ref = useRef(null);

  if (!pageData) return null;

  // const [beforeHeading, afterHeading] =
  //   pageData.bannerheading.value.split("Investment");

  return (
    <>
      <div className="black-replacer-nav"></div>
      <div className="banner-wrapper-home-2026">
        <div className="video-section">
          <video
            width="100%"
            autoPlay
            loop
            playsInline
            muted
            poster={pageData.bannerimage.value[0]?.url}
            controls={false}
            preload="auto"
          >
            <source
              src={pageData.bannervideolink.value}
              type="video/mp4"
              className=""
              width="100%"
            />
          </video>
        </div>

        <div className="container">
          <div className="text-container">
            <h1 className="banner-heading"> {pageData.bannerheading.value}</h1>
            {/* <h2 className='banner-heading-2'>{subHeading}</h2> */}

            <div className="row mt-5">
              {pageData.eventitems.value.map((item: any) => {
                return (
                  <div key={item.system.id} className="col-lg-3">
                    <div className="eventitem-card d-flex flex-column gap-3">
                      <div>
                        <h5 className="name">{item.name.value}</h5>
                        <div className="d-flex gap-4">
                          <h2>{item.day.value}</h2>
                          <div>
                            <p className="mb-0 text-white small">
                              {item.month.value}
                            </p>
                            <p className="mb-0 text-white small">
                              {item.year.value}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <IoLocationSharp color="#099FFC" />
                          <p className="text-white small mb-0">
                            {item.location.value}
                          </p>
                        </div>
                        {item.ctalink.value && (
                          <Link
                            href={item.ctalink.value}
                            className="d-flex align-items-center gap-2 mt-3"
                          >
                            <p className="text-white small mb-0">
                              {item.ctaname.value}
                            </p>
                            <FaArrowRightLong color="#099FFC" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="py-1 ">
              <div className="logos d-flex align-items-center gap-3">
                <Link
                  href="https://www.facebook.com/AIMCongress"
                  target="_blank"
                >
                  <FaFacebook color="white" size={20} />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/aim-congress/?viewAsMember=true"
                  target="_blank"
                >
                  <FaLinkedin color="white" size={20} />
                </Link>

                <Link
                  href="https://www.instagram.com/aimcongress/?hl=en"
                  target="_blank"
                >
                  <FaInstagram color="white" size={20} />
                </Link>

                <Link
                  href="https://www.threads.net/@aimcongress"
                  target="_blank"
                >
                  <FaThreads color="white" size={20} />
                </Link>

                <Link
                  href="https://www.youtube.com/@AnnualInvestmentMeeting"
                  target="_blank"
                >
                  <FaYoutube color="white" size={20} />
                </Link>

                <Link href="https://x.com/AIM_Congress" target="_blank">
                  <FaXTwitter color="white" size={20} />
                </Link>

                <Link
                  href="https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1"
                  target="_blank"
                >
                  <FaTiktok color="white" size={20} />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerComponent;
