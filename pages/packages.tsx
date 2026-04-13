import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { Delegatepackagepage } from "@/models/delegatepackagepage";
import Globals from "@/modules/Globals";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Head from "next/head";

export default function PackagesPage({
  pageData,
  invitee,
  source,
}: {
  pageData: Delegatepackagepage;
  invitee: string;
  source: string;
}) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = pageData.eventdate.value;
    const targetDate = new Date(eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      if (timeRemaining < 0) {
        clearInterval(interval);
      } else {
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <motion.div
      className="packagesPage3-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>{`${Globals.SITE_NAME} | ${pageData.metadataMetatitle.value}`}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:url" content={`${Globals.BASE_URL}packages`} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta
          name="twitter:image:alt"
          content={pageData.metadataMetatitle.value}
        />
        <link href={`${Globals.BASE_URL}packages`} rel="canonical" />
      </Head>

      <div className="inner-banner-packages">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="banner-image"
        />

        <div className="container text-content">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h5 className="text-center title">
                {pageData.bannerheading.value}
              </h5>
              {/* <h1 className="banner-heading text-center">{pageData?.bannerheading.value}</h1> */}
              {/* <h3 className="banner-subheading text-center">{pageData.bannersubheading.value}</h3> */}

              <div className=" mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <div className="counter-wrapper ">
                    <ul className="row g-lg-5 g-3">
                      <li className="col-3 d-flex flex-column align-items-center">
                        <div className="count-number days">
                          {countdown.days}
                        </div>
                        <div className="count-label days">Days</div>
                      </li>

                      <li className="col-3 d-flex flex-column align-items-center">
                        <div className="count-number hours ">
                          {countdown.hours}
                        </div>
                        <div className="count-label hours">Hours</div>
                      </li>

                      <li className="col-3 d-flex flex-column align-items-center">
                        <div className="count-number minutes">
                          {countdown.minutes}
                        </div>
                        <div className="count-label minutes">Minutes</div>
                      </li>

                      <li className="col-3 d-flex flex-column align-items-center">
                        <div className="count-number seconds ">
                          {countdown.seconds}
                        </div>
                        <div className="count-label seconds">Seconds</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-4">
        <div className="row g-3 justify-content-center">
          {pageData.packageitems.value.map((item: any, index: number) => {
            return (
              <PackageCard
                key={item.system.id}
                item={item}
                invitee={invitee}
                source={source}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const invitee = params.invitee || "";
  const source = params.source || "";
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";

  const datasourceStr: string = await Globals.KontentClient.item(
    "delegate_packages_2025___aim_china"
  )
    .withParameter("depth", "4")
    .languageParameter(languageCode)
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });
  const pageData: Delegatepackagepage = JSON.parse(datasourceStr);
  return {
    props: {
      pageData,
      invitee,
      source,
    },
  };
}

// --- NEW: Small card component that handles pillar selection & features ---
function PackageCard({
  item,
  invitee,
  source,
}: {
  item: any;
  invitee: string;
  source: string;
}) {
  const pillars = item?.items?.value ?? [];

  // Default to first pillar (if any)
  const [selectedPillarId, setSelectedPillarId] = React.useState<string | null>(
    pillars.length ? pillars[0]?.system?.id ?? null : null
  );

  const selectedPillar =
    pillars.find((p: any) => p.system.id === selectedPillarId) ?? null;

  const featuresStr: string =
    selectedPillar?.features?.value ?? item?.features?.value ?? "";

  const features: string[] = featuresStr
    .split("|")
    .map((f: string) => f.trim())
    .filter(Boolean);

  const linkBase = selectedPillar?.ctalink?.value?.trim() || item.ctalink.value;
  const LocallinkBase =
    selectedPillar?.localctalink?.value?.trim() || item.localctalink.value;

  const registerHref = `${linkBase}${
    linkBase.includes("?") ? "&" : "?"
  }source=${invitee && !source ? "invitee" : !source ? "website" : source}${
    invitee ? `&invitee=${invitee}` : ""
  }`;

  const LocalregisterHref = `${LocallinkBase}${
    LocallinkBase.includes("?") ? "&" : "?"
  }source=${invitee && !source ? "invitee" : !source ? "website" : source}${
    invitee ? `&invitee=${invitee}` : ""
  }`;

  return (
    <div className="col-12 col-lg-6" key={item.system.id}>
      <div className="deligate-package-card" id="DelegatePass">
        <div className="card-head--deligate">
          <img
            src="/assets/imgs/Gradient.png"
            alt="standard-pass"
            className="pass-gradient-image"
          />
          <div className="content-wrap">
            <div className="left-wrap">
              <span className="price">{item.price.value}</span>
              <span className="pass-name mt-3">{item.name.value}</span>
            </div>
          </div>
        </div>

        {/* Pillar selector (only if pillars exist) */}
        {pillars.length > 0 && (
          <div className=" px-3 py-2">
            <div className="select-wrap">
              <div className="label mb-2">Select your preferred Pillar</div>

              <select
                style={{
                  color: selectedPillar?.colorcode.value,
                  border: `1px solid ${selectedPillar.colorcode.value}`,
                }}
                className="form-select"
                id={`pillar-dropdown-${item.system.id}`}
                value={selectedPillarId ?? ""}
                onChange={(e) => setSelectedPillarId(e.target.value)}
              >
                {pillars.map((pillar: any) => (
                  <option key={pillar.system.id} value={pillar.system.id}>
                    {pillar?.name?.value ?? "Untitled pillar"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="card-body-deligate p-3">
          <div className="feature-items ">
            {/* {features.length ? (
              features.map((feature: string, idx: number) => (
                <div className="feature-name-wrap" key={`feature-${idx}`}>
                  <div>
                    <FaCheckCircle color={selectedPillar?.colorcode.value} />
                  </div>
                  <p className="feature-name">{feature}</p>
                </div>
              ))
            ) : (
              <li className="feature-name-wrap">
                <p className="feature-name text-muted">
                  No features listed for this selection.
                </p>
              </li>
            )} */}
            <div
              className="delegate-item-feature-content"
              dangerouslySetInnerHTML={{ __html: item.featurescontent.value }}
            />

            <hr className="text-black my-3" />
            <div className=" d-flex gap-4 p-2 flex-wrap  justify-content-between">
              <div>
                <p className="text-secondary fw-bold small text-center">{item.ctalabel.value}</p>
                <Link
                  href={registerHref}
                  className="px-4 py-2  text-center rounded-pill small text-center"
                  target="_blank"
                  style={{
                    background: selectedPillar
                      ? selectedPillar.colorcode.value
                      : item.colorcode.value,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "200px", // same width
                    height: "42px", // same height
                  }}
                >
                  {item.ctaname.value}
                </Link>
              </div>

              <div>
                <p className="text-secondary fw-bold small text-center">
                  {item.localctalabel.value}
                </p>
                <Link
                  href={LocalregisterHref}
                  className="px-4 py-2 text-center rounded-pill small text-center"
                  style={{
                    background: selectedPillar
                      ? selectedPillar.colorcode.value
                      : item.colorcode.value,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "200px", // same width
                    height: "42px", // same height
                  }}
                >
                  {item.localctaname.value}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
