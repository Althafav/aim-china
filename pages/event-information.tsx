import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Aboutpagev2 } from "@/models/aboutpagev2";
import { Seometadata } from "@/models/seometadata";
import { Eventinformationpage } from "@/models/eventinformationpage";
import { Serviceitem } from "@/models/serviceitem";
import { FaAppStore, FaGooglePlay, FaStore } from "react-icons/fa";
import Link from "next/link";

export default function EventInformation({
  pageData,
}: {
  pageData: Eventinformationpage;
}) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:url" content="https://aimcongress.cn/about" />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link rel="canonical" href="https://aimcongress.cn/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="black-replacer-nav" />

      <div className="event-information-page-wrapper">
        <div className="banner-section-wrapper">
          <motion.img
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="event-information-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />

          <div className="content-section-wrapper">
            <div className="container">
              <div className="col-12">
                <h1 className="banner-heading">
                  {pageData.bannerheading.value}
                </h1>
                <h2 className="banner-heading-2">
                  {pageData.bannersubheading.value}
                </h2>
                <p className="text-primary">{pageData.date.value}</p>
              </div>
            </div>
          </div>
        </div>

        {pageData.aboutheading.value && (
          <section>
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-6">
                  <h2 className="heading text-black mb-3">
                    {pageData.aboutheading.value}
                  </h2>
                  <span
                    className="content-wrap"
                    dangerouslySetInnerHTML={{
                      __html: pageData.aboutcontent.value,
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <iframe
                    title="Project Location Map"
                    width="100%"
                    height="480px"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={pageData.locationembedlink.value}
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        )}
        {pageData.themeheading.value && (
          <section className="about-section-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <p className="mb-3">{pageData.themeheading.value}</p>
                  <h2 className="theme-text">{pageData.theme.value}</h2>
                </div>
              </div>
            </div>
          </section>
        )}

        {pageData.directionsheading.value && (
          <section className="direction-section-wrapper">
            <div className="container">
              <div className="row g-3">
                <div className="col-12">
                  <h2 className="text-black mb-4">
                    {pageData.directionsheading.value}
                  </h2>
                </div>

                {pageData.directionitems.value.map((m: any, index: number) => {
                  const item: Serviceitem = m;
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-12 mb-3"
                      key={`direction-${index}`}
                    >
                      <div className="bg-white h-100">
                        <div className="card-body p-3 rounded">
                          <img
                            className="mb-4"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "contain",
                            }}
                            src={item.image.value[0]?.url}
                            alt={item.name.value}
                          />
                          <p className="mb-3 text-primary">
                            <strong>{item.name.value}</strong>
                          </p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {pageData.badgecollection.value && (
          <section className="badge-collection-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-10">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="text-dark mb-4">
                        {pageData.badgecollection.value}
                      </h2>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: pageData.badgecollectioncontent.value,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {pageData.downloadappheading.value && (
          <div
            className="download-app-section-wrapper py-4"
            style={{
              backgroundImage: `url(${pageData.downloadappbg.value[0]?.url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              <div className="row g-3 align-items-center">
                <div className="col-12 col-lg-8">
                  <h4 className="text-white mb-0">
                    {pageData.downloadappheading.value}
                  </h4>
                </div>

                <div className="col-12 col-lg-4 d-flex gap-2 justify-content-lg-end justify-content-center">
                  <Link href={pageData.appstorelink.value} target="_blank">
                    <FaAppStore
                      size={42}
                      className="bg-white text-primary p-1 rounded"
                    />
                  </Link>
                  <Link href={pageData.playstorelink.value} target="_blank">
                    <FaGooglePlay
                      size={42}
                      className="bg-white text-primary p-2 rounded"
                    />
                  </Link>

                  <img
                    style={{
                      width: "42px",
                      height: "42px",
                      objectFit: "contain",
                    }}
                    src={pageData.qrcode.value[0]?.url}
                    alt="AIM Congress 2025 App Qr Code"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {pageData.countersheading.value && (
          <section className="registration-counter-section">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <div>
                    <h2 className="mb-4 text-dark text-center">
                      {pageData.countersheading.value}
                    </h2>
                    <p className="mb-4 text-center">
                      {pageData.counterssubheading.value}
                    </p>
                    <div className="d-flex justify-content-center">
                      <span
                        className="content-wrap"
                        dangerouslySetInnerHTML={{
                          __html: pageData.counterscontent.value,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {pageData.admissionpolicyheading.value && (
          <section className="policy-section-wrapper">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-6">
                  <h2 className="text-black mb-4">
                    {pageData.admissionpolicyheading.value}
                  </h2>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData.admissionpolicycontent.value,
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <h2 className="text-black mb-4">
                    {pageData.badgepolicyheading.value}
                  </h2>

                  <span
                    dangerouslySetInnerHTML={{
                      __html: pageData.badgepolicycontent.value,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}

export async function getStaticProps() {
  const datasourceStr: string = await Globals.KontentClient.item(
    "event_information_page___aim_china"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "3")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const pageData: Eventinformationpage = JSON.parse(datasourceStr);

  return {
    props: {
      pageData,
    },
    revalidate: 60,
  };
}
