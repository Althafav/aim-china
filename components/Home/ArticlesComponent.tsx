import { Blogitems } from "@/models/blogitems";
import { Blogs } from "@/models/blogs";
import Globals from "@/modules/Globals";
import Helper from "@/modules/Helper";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import ButtonComponent from "../Button/ButtonComponent";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function ArticlesComponent(props: any) {
  const [pageData, setPageData] = useState<Blogs | null>(null);

  React.useEffect(() => {
    const subscription = Globals.KontentClient.item("blog_page")
      .toObservable()
      .subscribe((response: any) => {
        console.log("API Response:", response);
        setPageData(response.item);
      });

    return () => subscription.unsubscribe();
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const limitedArticles = pageData?.articlesItems.value.slice(0, 5);

  return (
    <div className="articles-component-wrapper py-5" ref={ref}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div className="">
            <h2 className="section-heading-2026 theme-gradient-text  text-center">
              {props.heading}
            </h2>
          </div>
          {props.buttonCTALink && (
            <div className=" d-flex justify-content-lg-end">
              <div>
                <ButtonComponent
                  name={props.buttonCTAName}
                  link={props.buttonCTALink}
                />
              </div>
            </div>
          )}
        </div>
        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {limitedArticles?.map((m: any, index: number) => {
            const item: Blogitems = m;
            let colClass = "col-lg-4 col-md-6 col-12"; // default

            if (index === 3) {
              colClass = "col-lg-8 col-md-6 col-12";
            } else if (index === 4) {
              colClass = "col-lg-4 col-md-6 col-12";
            }

            return (
              <motion.div
                className={`${colClass} mb-3`}
                key={`article-card-${index}`}
                variants={cardVariants}
              >
                <Link
                  className="cursor-pointer"
                  passHref
                  legacyBehavior
                  href={`/article/${Helper.formatUrlParameter(
                    item.heading.value
                  )}`}
                >
                  <div className="article-card">
                    <div className="article-badge rounded">Latest</div>
                    <Image
                      width={450}
                      height={250}
                      src={item.image.value[0].url}
                      alt={item.heading.value}
                    />
                    <div className="content">
                      <p className="heading small">{item.heading.value}</p>
                      <p className="small text-secondary">
                        {item.system.lastModified
                          ? new Date(
                              item.system.lastModified
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
