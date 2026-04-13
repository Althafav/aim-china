import SpinnerComponent from "@/components/UI/SpinnerComponent";
import GenericData from "@/contants/countryData";
import { Form2026 } from "@/models/form2026";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReCaptcha from "@/components/UI/ReCaptcha";
import Head from "next/head";

interface CountryData {
  label: string;
  value: string;
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  pageData: Form2026;
  attendAs: string;
}

interface InvestorData {
  investorTypes: string[];
  investmentTypes: string[];
  investmentSize: string;
  sectors: string[];
  sectorsOtherText: string;
  geography: string[];
  geoOtherText: string;
  participationInterest: string[];
  attendedBefore: string;
}

export default function Page({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  const [investorData, setInvestorData] = useState<InvestorData>({
    investorTypes: [],
    investmentTypes: [],
    investmentSize: "",
    sectors: [],
    sectorsOtherText: "",
    geography: [],
    geoOtherText: "",
    participationInterest: [],
    attendedBefore: "",
  });
  const [confirmedDesclaimer, setConfirmedDesclaimer] = useState(false);
  useEffect(() => {
    JsLoader.loadFile(
      `/assets/js/open-calls/call-investor.js`
    );
  }, []);

  const handleMultiChange =
    (field: keyof InvestorData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInvestorData((prev) => {
        const arr = prev[field] as string[];
        return {
          ...prev,
          [field]: e.target.checked
            ? [...arr, val]
            : arr.filter((x) => x !== val),
        };
      });
    };

  const handleSingleChange =
    (field: keyof InvestorData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvestorData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <div className="form-2026">
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
        <meta
          property="og:url"
          content="https://aimcongress.cn/forms/open-calls/investor"
        />
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

        <link
          rel="canonical"
          href="https://aimcongress.cn/forms/open-calls/investor"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="register-interest-form-wrapper-2026">
          <div className="form-banner-wrapper aspect-ratio-box px-5">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              src={pageData.bannerimage.value[0]?.url}
              alt=""
              className="form-banner-img"
            />
            <div className="container py-3">
              <Link href={pageData.aimlogolink.value}>
                <img
                  className="aim-logo mb-3"
                  src={pageData.aimlogo.value[0]?.url}
                  alt=""
                />
              </Link>

              <h1 className="theme-gradient-text-2 mb-3">
                {" "}
                {pageData.bannerheading.value}
              </h1>

              <div>
                <p className="text-secondary text-end">
                  {" "}
                  {pageData.date.value}
                </p>
              </div>
            </div>
          </div>
          <div className="row py-5 px-4">
            <div className="col-12">
              <form
                method="POST"
                action="//ac.strategic.ae/proc.php"
                id="_form_394_"
                noValidate
              >
                <input type="hidden" name="u" value="394" />
                <input type="hidden" name="f" value="394" />
                <input type="hidden" name="s" />
                <input type="hidden" name="c" value="0" />
                <input type="hidden" name="m" value="0" />
                <input type="hidden" name="act" value="sub" />
                <input type="hidden" name="v" value="2" />
                <input
                  type="hidden"
                  name="or"
                  value="87dd3af2187abe9a07709ed7f1daacda"
                />
                <input
                  type="hidden"
                  name="field[38]"
                  value={pageData.formsubmit.value}
                />
                <input
                  type="hidden"
                  name="leadType"
                  value={pageData.leadtype.value}
                />
                <div className="_form_element _x84632550 _full_width">
                  <div className="_field-wrapper">
                    <textarea
                      id="field[378]"
                      name="field[378]"
                      style={{ display: "none" }}
                      value={JSON.stringify(investorData)}
                      readOnly
                    />
                  </div>
                </div>
                <input type="hidden" name="field[328]" value={mainsource} />
                <input type="hidden" name="field[329]" value={subsource} />
                <div className="_form-content form-grid">
                  <div className="row g-4">
                    <div className="col-12">
                      <h2 className="fs-4 fw-bold mb-3 text-black">
                        {pageData.aboutheading.value}
                      </h2>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: pageData.aboutdescription.value,
                        }}
                      />
                    </div>

                    {/* Basic Information */}
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="firstname"
                        itemID="firstname"
                        className="custom-input"
                        placeholder="First Name *"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="lastname"
                        itemID="lastname"
                        className="custom-input"
                        placeholder="Last Name *"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="custom-input"
                        placeholder="Email Address *"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="field[23]"
                        className="custom-input"
                        placeholder="Job Title *"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        itemID="customer_account"
                        name="customer_account"
                        className="custom-input"
                        placeholder="Organization / Fund / Investment Entity Name"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <select
                        name="field[3]"
                        itemID="field[3]"
                        className="custom-select"
                        required
                      >
                        <option value="">Country of Headquarters *</option>
                        {CountriesData.map((country: any, index: number) => {
                          return (
                            <option
                              key={`country-${index}`}
                              value={country.value}
                            >
                              {country.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-lg-6">
                      <div className="row">
                        <div className="phone-wrapper">
                          <select
                            name="phoneCode"
                            required
                            className="custom-select"
                          >
                            <option value="">Code</option>
                            {CountriesCode.map((code, i) => (
                              <option key={i} value={code.value}>
                                {code.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            name="field[12]"
                            placeholder="Mobile Phone *"
                            required
                            className="custom-input phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="Linkedin"
                        className="custom-input"
                        placeholder="LinkedIn Profile / Website"
                      />
                    </div>
                    {/* Basic Information Ends */}
                  </div>

                  <div className="row g-4 ">
                    {/* Investor Type */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Please select your investor type (select all that
                        apply):
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        {[
                          "Private Equity Firm",
                          "Family Office",
                          "Corporate Investor",
                          "Sovereign Wealth Fund",
                          "Institutional Investor (Pension Fund, Bank, etc.)",
                          "Development Finance Institution",
                          "Impact / ESG-Focused Investor",
                          "Public Investment Fund",
                        ].map((type, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="investorType"
                              value={type}
                              onChange={handleMultiChange("investorTypes")}
                              checked={investorData.investorTypes.includes(
                                type
                              )}
                              id={`invType_${i}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`invType_${i}`}
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Investment Profile */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        What types of investments do you typically make?
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        {[
                          "Equity Investments",
                          "Debt Financing / Loans",
                          "Public Equity",
                          "Private Equity",
                          "Project Finance",
                          "Blended Finance",
                          "Public / Private Partnership",
                          "Mergers & Acquisitions",
                          "Green / Sustainable Finance",
                        ].map((inv) => (
                          <div
                            key={inv}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="investmentTypes"
                              value={inv}
                              onChange={handleMultiChange("investmentTypes")}
                              checked={investorData.investmentTypes.includes(
                                inv
                              )}
                            />
                            <label className="form-check-label">{inv}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typical Investment Size */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Typical Investment Size:
                      </label>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {[
                          "USD 100K – 1M",
                          "USD 1M – 10M",
                          "USD 10M – 100M",
                          "USD 100M+",
                        ].map((size, i) => (
                          <div key={i} className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="investmentSize"
                              onChange={handleSingleChange("investmentSize")}
                              checked={investorData.investmentSize === size}
                              value={size}
                              id={`size_${i}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`size_${i}`}
                            >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sectors of Interest */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Sectors of Interest (select up to 5):
                      </label>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {[
                          "Foreign Direct Investment (FDI Projects)",
                          "Advanced Manufacturing and Industrial Development",
                          "Smart Cities / Urban Infrastructure/ Transport",
                          "Fintech / Future Finance",
                          "Digital Economy (AI, Big Data, Tech Infrastructure)",
                          "Climate Tech / Green Energy / ESG",
                          "Healthcare / Biotech",
                          "Agribusiness/ Food & AgriTech",
                          "Education / Workforce Development",
                          "Tourism / Creative Economy",
                          "Public-Private Partnerships (PPP) / Government – Led Initiatives",
                        ].map((sec, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="sectors"
                              value={sec}
                              id={`sector_${i}`}
                              onChange={handleMultiChange("sectors")}
                              checked={investorData.sectors.includes(sec)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`sector_${i}`}
                            >
                              {sec}
                            </label>
                          </div>
                        ))}

                        <div className="form-check custom-checkbox-box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="sectors"
                            value="Other"
                            id="sector_other"
                            onChange={handleMultiChange("sectors")}
                            checked={investorData.sectors.includes("Other")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="sector_other"
                          >
                            Others:
                          </label>
                        </div>
                      </div>
                      {investorData.sectors.includes("Other") && (
                        <div className="mt-2 ms-3">
                          <input
                            type="text"
                            name="sectorsOtherText"
                            className="custom-input"
                            placeholder="Please specify up to 5"
                            onChange={handleSingleChange("sectorsOtherText")}
                            value={investorData.sectorsOtherText}
                          />
                        </div>
                      )}
                    </div>

                    {/* Geographic Investment Focus */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Geographic Investment Focus:
                      </label>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {[
                          "Global",
                          "GCC",
                          "Middle East & North Africa (MENA)",
                          "Sub-Saharan Africa",
                          "South Asia (India, Pakistan, etc.)",
                          "Southeast Asia (ASEAN)",
                          "East Asia (China, Korea, Japan)",
                          "Europe",
                          "Latin America",
                          "North America",
                        ].map((reg, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="geography"
                              value={reg}
                              id={`geo_${i}`}
                              onChange={handleMultiChange("geography")}
                              checked={investorData.geography.includes(reg)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`geo_${i}`}
                            >
                              {reg}
                            </label>
                          </div>
                        ))}

                        <div className="form-check custom-checkbox-box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="geography"
                            value="Other"
                            id="geo_other"
                            onChange={handleMultiChange("geography")}
                            checked={investorData.geography.includes("Other")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="geo_other"
                          >
                            Others:
                          </label>
                        </div>
                      </div>
                      {investorData.geography.includes("Other") && (
                        <div className="mt-2 ms-3">
                          <input
                            type="text"
                            name="geoOtherText"
                            className="custom-input"
                            placeholder="Please specify"
                            onChange={handleSingleChange("geoOtherText")}
                            value={investorData.geoOtherText}
                          />
                        </div>
                      )}
                    </div>

                    {/* Specific Target Countries */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Are there specific countries you are currently targeting
                        for investment? (Please list up to 5)
                      </label>
                      <input
                        type="text"
                        name={`targetCountry`}
                        className="custom-input"
                        placeholder={`e.g., United Arab Emirates, Saudi Arabia, India, Egypt, Germany`}
                      />
                    </div>

                    {/* Participation Preferences */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        I am interested in the following (select all that
                        apply):
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        {[
                          "1:1 Meetings with Governments / IPAs",
                          "Investment Pitch Sessions",
                          "Closed-Door Investor Roundtables",
                          "Speaking in an Investor Panel",
                          "Co-hosting or Co-sponsoring an investor-focused side event",
                          "Access to curated Deal Room",
                        ].map((pref, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="participationInterest"
                              onChange={handleMultiChange(
                                "participationInterest"
                              )}
                              checked={investorData.participationInterest.includes(
                                pref
                              )}
                              value={pref}
                              id={`partPref_${i}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`partPref_${i}`}
                            >
                              {pref}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prior Attendance */}
                    <div className="col-12">
                      <label className="form-label fw-bold mb-2">
                        Have you attended AIM Congress before?
                      </label>
                      <div className="mt-2">
                        {["Yes", "No"].map((ans) => (
                          <div
                            key={ans}
                            className="form-check form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="attendedBefore"
                              id={`attended_${ans}`}
                              onChange={handleSingleChange("attendedBefore")}
                              value={ans}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`attended_${ans}`}
                            >
                              {ans}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12 mt-4 px-4 d-none">
                      <div className="form-group col-12 col-lg-6 col-xl-6">
                        <fieldset className="_form-fieldset">
                          <div className="_row">
                            <span className="_form-label">
                              Interested to attend as *
                            </span>
                          </div>
                          <input
                            data-autofill="false"
                            type="hidden"
                            id="field[228][]"
                            name="field[228][]"
                            value="~|"
                          />

                          <div className="_row _checkbox-radio">
                            <input
                              id="field_228Investor"
                              type="checkbox"
                              name="field[228][]"
                              value="Investor"
                              defaultChecked
                            />
                            <span>
                              <label>Investor</label>
                            </span>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    {/* Declaration */}
                    <div className="col-12">
                      <div className="form-check mt-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="confirmation"
                          id="confirmation"
                          onChange={(e) =>
                            setConfirmedDesclaimer(e.target.checked)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="confirmation"
                        >
                          I confirm that I am an active investor or represent an
                          investment entity. I understand investor passes are
                          subject to verification.
                        </label>
                      </div>
                    </div>

                    <div className="col-12 my-4">
                      <div
                        className="g-recaptcha"
                        data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                      ></div>
                    </div>
                    <div className=" text-start">
                      <button
                        id="_form_394_submit"
                        type="submit"
                        disabled={!confirmedDesclaimer}
                        className={`px-4 py-2 ${
                          confirmedDesclaimer ? "bg-primary" : "bg-secondary"
                        } text-white rounded-pill`}
                      >
                        <span>Submit Application</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const mainsource = params.mainsource || "website";
  const subsource = params.subsource || "/";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  const datasourceStr: string = await Globals.KontentClient.item(
    "call_for_investor"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });
  const pageData: Form2026 = JSON.parse(datasourceStr);
  return {
    props: {
      mainsource,
      subsource,
      CountriesCode,
      CountriesData,
      pageData,
    },
  };
}
