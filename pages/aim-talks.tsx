import ButtonComponent from "@/components/Button/ButtonComponent";
import Globals from "@/modules/Globals";
import React from "react";

function Page({ pageData }: any) {
  return (
    <div className="aim-talks-page">
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
            <h5 className="date-venue text-white">
              {pageData?.bannersubheading.value}
            </h5>
            {pageData.bannercta.value.map((item: any) => {
              return (
                <div>
                  <ButtonComponent
                    name={item.name.value}
                    link={item.link.value}
                    variant="primary"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container mx-auto">
          <span className="bg-secondary text-white small px-4 py-1">
            {pageData.themetag.value}
          </span>

          <h2
            className="mt-2 text-primary section-heading-2026"
            style={{ maxWidth: "1000px" }}
          >
            {pageData.themeheading.value}
          </h2>
        </div>
      </div>

      <div className="aim-china-section py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2
                className="section-heading-2026 text-black text-start"
                style={{ maxWidth: "800px" }}
              >
                {pageData.hostcityheading.value}
              </h2>

              <div
                className="text-muted mt-3"
                dangerouslySetInnerHTML={{
                  __html: pageData.hostcitycontent.value,
                }}
              />
            </div>

            <div className="col-lg-6 h-100">
              <div className="ratio ratio-4x3">
                <img
                  src={pageData.hostcityimage.value[0]?.url}
                  alt=""
                  className="w-100 h-100 rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 container mx-auto">
        <div
          className="p-5 mt-4 rounded-3xl"
          style={{ backgroundColor: "#DCF2FF" }}
        >
          <span className="bg-secondary text-white small px-4 py-1">
            {pageData.hostpartnertag.value}
          </span>
          <div className="mt-4">
            <div className="d-flex flex-wrap justify-content-between">
              <h2
                className="mt-2 text-primary section-heading-2026"
                style={{ maxWidth: "1000px" }}
              >
                {pageData.hostpartnerheading.value}
              </h2>

              <div>
                <img
                  src={pageData.hostpartnerlogo.value[0]?.url}
                  alt=""
                  style={{ width: "150px" }}
                />
              </div>
            </div>
            <div
              className="text-primary mt-3"
              dangerouslySetInnerHTML={{
                __html: pageData.hostpartnercontent.value,
              }}
            />
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container mx-auto">
          <h2
            className="section-heading-2026 text-black text-start"
            style={{ maxWidth: "800px" }}
          >
            {pageData.objectivesheading.value}
          </h2>

          <div className="mt-4">
            <div className="objectives-grid">
              <div className="row g-0">
                {pageData.objectivesitems.value.map(
                  (item: any, index: number) => (
                    <div
                      key={item.system.id}
                      className="col-md-4 objective-item"
                    >
                      <h5 className="text-black">{item.name.value}</h5>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container mx-auto">
          <h2
            className="section-heading-2026 text-black text-start"
            style={{ maxWidth: "800px" }}
          >
            {pageData.sectorsheading.value}
          </h2>

          <div className="mt-4">
            <div className="">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.4fr 1fr",
                  gridTemplateRows: "220px 220px",
                  gap: "12px",
                }}
              >
                {pageData.sectorsitems.value.map((item: any, index: number) => {
                  const gridStyles: Record<number, React.CSSProperties> = {
                    0: { gridColumn: "1", gridRow: "1" }, // Infrastructure
                    1: { gridColumn: "2", gridRow: "1" }, // Advanced Manufacturing
                    2: { gridColumn: "1", gridRow: "2" }, // New Energy
                    3: { gridColumn: "2", gridRow: "2" }, // Industry
                    4: { gridColumn: "3", gridRow: "1 / span 2" }, // Global Trade
                  };
                  const imageUrl = item.image.value[0]?.url;
                  return (
                    <div
                      key={item.system.id}
                      className="sector-item"
                      style={{
                        ...gridStyles[index],
                        backgroundImage: imageUrl
                          ? `url(${imageUrl})`
                          : undefined,
                      }}
                    >
                      <h3 className="sector-label ">{item.name.value}</h3>
                      <div className="sector-hover-content">
                        <h3>{item.name.value}</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container mx-auto">
          <h2 className="text-primary text-center">
            {" "}
            {pageData.ctasectionheading.value}
          </h2>

          <div className="mt-4 d-flex justify-content-center">
            {pageData.bannercta.value.map((item: any) => {
              return (
                <div className="">
                  <ButtonComponent
                    name={item.name.value}
                    link={item.link.value}
                    variant="primary"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";
  const datasourceStr = await Globals.KontentClient.item("aim_talk_page")
    .languageParameter(languageCode)
    .toObservable()
    .toPromise()
    .then((r: any) => JSON.stringify(r.item));

  return {
    props: {
      pageData: JSON.parse(datasourceStr) as any,
    },
    revalidate: 30,
  };
}

export default React.memo(Page);
