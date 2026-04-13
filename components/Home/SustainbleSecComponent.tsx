import { Homepage } from "@/models/homepage";
import React from "react";

interface PageDataProps {
  pageData: Homepage | null;
}

const SustainbleSecComponent: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) {
    return <></>;
  }
  return (
    <section
      className="sustainable-section-wrapper "
      style={{
        backgroundImage: `url('/assets/imgs/sustainable-bg.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row g-2">
          <div className="col-lg-4">
            <div className="left-section">
              <h1 className="section-heading--sustainable">
                {pageData.sustainableheading.value}
              </h1>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="right-section">
              <p
                className="paragraph"
                dangerouslySetInnerHTML={{
                  __html: pageData.sustainablecontent1.value,
                }}
              />

              <img
                src={pageData.sustainableimage.value[0]?.url}
                alt="Aim congress Sustainable Development"
                className="mt-3 mb-3 w-100 cover"
              />

              <p
                className="paragraph"
                dangerouslySetInnerHTML={{
                  __html: pageData.sustainablecontent2.value,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainbleSecComponent;
