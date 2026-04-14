import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Homepage2026 } from "@/models/homepage2026";
import Link from "next/link";
import ButtonComponent from "../Button/ButtonComponent";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const ThemeSectionComponent: React.FC<PageDataProps> = ({ pageData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!pageData) return null;

  const themeLine1 = pageData.themeline1.value.split(" ");
  const themeLine2 = pageData.themeline2.value.split(" ");

  return (
    <div
      ref={ref}
      className="theme-section-wrapper section-wrapper py-5"
      style={{ overflowX: "hidden" }}
    >
      <div className="container">
        <div className="row g-5">
          <div className="col-12">
            <div className="mb-4">
              <span className="bg-primary px-4 py-2 text-white">
               {pageData.themetag.value}
              </span>
            </div>
            <div className="sub-head">
              <motion.span
                className="main-head"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {themeLine1.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    className="theme-gradient-text"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    style={{ lineHeight: "1.3" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}

                {/* explicit break into second line */}
              </motion.span>
              <motion.span
                className="main-head"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {/* {themeLine1.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    className="theme-gradient-text"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    style={{ lineHeight: "1.3" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))} */}

                {/* explicit break into second line */}

                {themeLine2.map((word, i) => (
                  <motion.div
                    key={`l2-${i}`}
                    className="theme-gradient-text"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {word}
                  </motion.div>
                ))}
              </motion.span>
            </div>
          </div>

          {/* <div className="col-12 ">
            <div className="theme-cta-wrapper">
              <motion.p
                className="cta-heading mb-4 mb-lg-0"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                {pageData.themectatext.value}
              </motion.p>

              <div>
                <ButtonComponent
                  name={pageData.themectabuttontext.value}
                  link={pageData.themectalink.value}
                  variant="primary"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ThemeSectionComponent;
