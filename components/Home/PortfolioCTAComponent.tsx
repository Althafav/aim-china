import React, { useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { PortfolioCards } from "@/contants/data.js";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { Homepage } from "@/models/homepage";
import { Portfoliocard } from "@/models/portfoliocard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};



interface PageDataProps {
  pageData: Homepage | null;
}

const PortfolioCTAComponent: React.FC<PageDataProps> = ({ pageData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="section-wrapper portfolio-section-wrapper"
      id="Portfolio"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <motion.div
              className="main-head"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <span>{pageData?.portfolioctaheading.value}</span>
            </motion.div>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <motion.p
              className="sub-head"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {pageData?.portfolioctasubheading.value}
            </motion.p>
          </div>
        </div>

        <div className="mt-4">
          <motion.div
            className="row"
          
          >
            {pageData?.portfolioctacards.value.map((m: any, index: number) => {
              var item: Portfoliocard = m;
              return (
                <motion.div
                  className="col-lg-3 col-md-6 col-12 mb-4"
                  key={`portfoliocard-${index}`}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                  
                >
                  <motion.div className="portfolio-card">
                    <Link href={item.link ? item.link.value : "#"}>
                      <div className="cta-card-item">
                        <Image
                          width={220}
                          height={450}
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          style={{width: "100%", height: "450px"}}
                          className="bg-primary"
                          priority
                        />
                        <div className="text-container">
                          <div className="d-flex flex-column">
                            <span className="main-head--card">
                              {item.name.value}
                            </span>
                            <span
                              className="sub-head--card mt-1"
                              dangerouslySetInnerHTML={{
                                __html: item.content.value,
                              }}
                            />
                          </div>

                          <div>
                            <button
                              className={`know-more-btn `}
                              style={{ background: item.brandcolorcode.value }}
                            >
                              Know More{" "}
                              <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.4657 4.21318C17.5965 3.39515 17.0395 2.62593 16.2214 2.49507L2.89092 0.362647C2.07289 0.231791 1.30367 0.788853 1.17281 1.60688C1.04196 2.42491 1.59902 3.19413 2.41704 3.32498L14.2664 5.22047L12.3709 17.0698C12.24 17.8879 12.7971 18.6571 13.6151 18.7879C14.4332 18.9188 15.2024 18.3617 15.3332 17.5437L17.4657 4.21318ZM1.8798 16.0427L16.8643 5.19113L15.1047 2.76136L0.120192 13.613L1.8798 16.0427Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTAComponent;
