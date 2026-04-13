import Link from "next/link";
import ButtonComponent from "../Button/ButtonComponent";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";

export default function PillarSection({ pageData }: any) {
  const { locale } = useRouter();
  return (
    <div className="pillar-section-wrapper py-5 bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 ">
          <div className="">
            <h2
              className="section-heading-2026 text-black text-start"
              style={{ maxWidth: "800px" }}
            >
              {pageData.pillarheading.value}
            </h2>
          </div>
          <div className=" d-flex justify-content-lg-end px-lg-4">
            <div>
              <ButtonComponent
                name={pageData.pillarctabuttontext.value}
                link={pageData.pillarctalink.value}
              />
            </div>
          </div>
        </div>

        <div className="row pillar-columns g-4 ">
          {pageData.pillaritems.value.map((item: any, index: number) => (
            <div key={index} className="col-md-4">
              <div className=" pillar-item position-relative ">
                <h5 className="pillar-item-heading text-dark">
                  {item.name.value}
                </h5>
                <div
                  className="text-muted mt-3"
                  dangerouslySetInnerHTML={{ __html: item.content.value }}
                />

                {item.link.value && (
                  <div className="mt-4">
                    <Link
                      href={item.link.value}
                      className="text-muted d-flex gap-2 align-items-center "
                    >
                      <span>{locale === "cn" ? "了解更多" : "Read more"}</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                )}
                {index < 2 && (
                  <div className="pillar-divider d-none d-md-block"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
