import { Buttonitem } from "@/models/buttonitem";
import { Homepage } from "@/models/homepage";
import Link from "next/link";
import React from "react";

interface PageDataProps {
  pageData: Homepage | null;
}

const CtaComponent: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) {
    return <></>;
  }
  
  return (
    <section className="cta-banner-component-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner-content">
              <p className="cta-banner-heading">
                {pageData?.endtailheading.value}
              </p>

              <div className="d-flex flex-column flex-lg-row  align-items-lg-center gap-5 justify-content-between">
                <p className="d-flex flex-column gap-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData.endtailcontent.value,
                    }}
                  />
                </p>

                <div className="">
                  {pageData?.endtailbutton.value.map(
                    (m: any, index: number) => {
                      var item: Buttonitem = m;
                      return (
                        <Link href={item.link.value} key={`cta-btn-${index}`}>
                          <button className="registernow-cta">
                            {item.name.value}
                          </button>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaComponent;
