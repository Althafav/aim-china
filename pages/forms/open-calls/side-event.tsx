import SpinnerComponent from "@/components/UI/SpinnerComponent";
import GenericData from "@/contants/countryData";
import { Form2026 } from "@/models/form2026";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JsLoader from "@/modules/JsLoader";
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
}

interface sideEventDataType {
  eventTitle: string;
  eventType: string;
  eventTypeOther: string;
  eventTopic: string;
  eventDescription: string;
  attendeeRange: string;
  targetAudience: string[];
  targetAudienceOther: string;
  setup: string[];
  setupOther: string;
  interpretation: string;
  interpretationLanguages: string;
  priorEvent: string;
  additionalNotes: string;
}

export default function Page({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(
      `/assets/js/open-calls/call-for-sideEvents.js`
    );
  }, []);
  const [sideEventData, setSideEventData] = useState<sideEventDataType>({
    eventTitle: "",
    eventType: "",
    eventTypeOther: "",
    eventTopic: "",
    eventDescription: "",
    attendeeRange: "",
    targetAudience: [],
    targetAudienceOther: "",
    setup: [],
    setupOther: "",
    interpretation: "",
    interpretationLanguages: "",
    priorEvent: "",
    additionalNotes: "",
  });

  const [confirmedDesclaimer, setConfirmedDesclaimer] = useState(false);

  const handleMultiChange =
    (field: keyof sideEventDataType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSideEventData((prev: any) => {
        const arr = prev[field] as string[];
        const newArr = e.target.checked
          ? [...arr, val]
          : arr.filter((x) => x !== val);

        console.log({ ...prev, [field]: newArr }, "will be next");
        return {
          ...prev,
          [field]: newArr,
        };
      });
    };

  const handleSingleChange =
    (field: keyof sideEventDataType) => (e: React.ChangeEvent<any>) => {
      setSideEventData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const audienceOptions = [
    "Government / Policy Makers",
    "Investors",
    "Corporates",
    "SMEs / Startups",
    "Trade Organizations",
  ];

  const setupOptions = [
    "Boardroom Style",
    "Theatre Style",
    "Round Tables",
    "Reception Style",
  ];
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
          content="https://aimcongress.cn/forms/open-calls/side-event"
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
          href="https://aimcongress.cn/forms/open-calls/side-event"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="register-interest-form-wrapper-2026">
          <div className="form-banner-wrapper aspect-ratio-box px-4">
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

                <textarea
                  id="field[375]"
                  name="field[375]"
                  style={{ display: "none" }}
                  value={JSON.stringify(sideEventData)}
                  readOnly
                />
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

                    <div className="col-12">
                      <h4 className="mt-4 text-black">Organizer Details</h4>
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
                        placeholder="Organization / Company"
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
                        <option value="">Country of Operation *</option>
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

                    {/* Side Event Proposal */}
                    <div className="col-12">
                      <h4 className="mt-4 text-black">Side Event Proposal</h4>
                    </div>
                    <div className="col-12">
                      <label>Proposed Event Title:</label>
                      <input
                        type="text"
                        id="field[374]"
                        name="field[374]"
                        className="custom-input mt-2"
                        onChange={handleSingleChange("eventTitle")}
                        value={sideEventData.eventTitle}
                      />
                    </div>

                    {/* Event Type */}
                    <div className="col-12">
                      <label>Event Type (select one):</label>
                      <div className="mt-2">
                        {[
                          "Roundtable",
                          "Closed-Door Meeting",
                          "Forum",
                          "Networking Reception",
                          "Other",
                        ].map((type) => (
                          <div
                            key={type}
                            className="form-check form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="eventType"
                              value={type}
                              id={`eventType_${type.replace(/\s+/g, "_")}`}
                              onChange={handleSingleChange("eventType")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`eventType_${type.replace(/\s+/g, "_")}`}
                            >
                              {type === "Other" ? "Other:" : type}
                            </label>
                          </div>
                        ))}

                        {sideEventData.eventType.includes("Other") && (
                          <div className="mt-2 ms-3">
                            <input
                              type="text"
                              name="eventTypeOther"
                              className="custom-input"
                              placeholder="Please specify"
                              onChange={handleSingleChange("eventTypeOther")}
                              value={sideEventData.eventTypeOther}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <label>Proposed Topic / Theme:</label>
                      <input
                        type="text"
                        name="eventTopic"
                        className="custom-input mt-2"
                        onChange={handleSingleChange("eventTopic")}
                        value={sideEventData.eventTopic}
                      />
                    </div>
                    <div className="col-12">
                      <label>Event Description (150–300 words):</label>
                      <textarea
                        name="eventDescription"
                        rows={4}
                        className="custom-input mt-2"
                        onChange={handleSingleChange("eventDescription")}
                        value={sideEventData.eventDescription}
                      />
                    </div>
                    <div className="col-12">
                      <label>Estimated Number of Attendees:</label>
                      <div className="mt-2">
                        {["Up to 30", "30–50", "50–100", "100+"].map(
                          (range, i) => (
                            <div
                              key={i}
                              className="form-check form-check-inline"
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="attendeeRange"
                                value={range}
                                id={`attendRange_${i}`}
                                onChange={handleSingleChange("attendeeRange")}
                                checked={sideEventData.attendeeRange === range}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`attendRange_${i}`}
                              >
                                {range}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div className="col-12">
                      <label>Target Audience:</label>
                      <div className="mt-2 d-flex flex-wrap gap-3">
                        {audienceOptions.map((aud, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="targetAudience"
                              value={aud}
                              id={`aud_${i}`}
                              onChange={handleMultiChange("targetAudience")}
                              checked={sideEventData.targetAudience.includes(
                                aud
                              )}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`aud_${i}`}
                            >
                              {aud}
                            </label>
                          </div>
                        ))}

                        <div className="form-check custom-checkbox-box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="targetAudience"
                            value="Other"
                            id="aud_other"
                            onChange={handleMultiChange("targetAudience")}
                            checked={sideEventData.targetAudience.includes(
                              "Other"
                            )}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="aud_other"
                          >
                            Other:
                          </label>
                        </div>
                      </div>

                      {sideEventData.targetAudience.includes("Other") && (
                        <div className="mt-2 ms-3">
                          <input
                            type="text"
                            name="targetAudienceOther"
                            className="custom-input"
                            placeholder="Please specify"
                            onChange={handleSingleChange("targetAudienceOther")}
                            value={sideEventData.targetAudienceOther}
                          />
                        </div>
                      )}
                    </div>

                    {/* Logistical Requirements */}
                    <div className="col-12">
                      <h4 className="mt-4 text-black">
                        Logistical Requirements
                      </h4>
                    </div>
                    <div className="col-12">
                      <label>What type of setup will you require?</label>
                      <div className="mt-2 d-flex flex-wrap gap-3">
                        {setupOptions.map((setup, i) => (
                          <div
                            key={i}
                            className="form-check custom-checkbox-box"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="setup"
                              value={setup}
                              id={`setup_${i}`}
                              onChange={handleMultiChange("setup")}
                              checked={sideEventData.setup.includes(setup)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`setup_${i}`}
                            >
                              {setup}
                            </label>
                          </div>
                        ))}

                        <div className="form-check custom-checkbox-box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="setup"
                            value="Other"
                            id="setup_other"
                            onChange={handleMultiChange("setup")}
                            checked={sideEventData.setup.includes("Other")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="setup_other"
                          >
                            Other:
                          </label>
                        </div>
                      </div>

                      {sideEventData.setup.includes("Other") && (
                        <div className="mt-2 ms-3">
                          <input
                            type="text"
                            name="setupOther"
                            className="custom-input"
                            placeholder="Please specify"
                            onChange={handleSingleChange("setupOther")}
                            value={sideEventData.setupOther}
                          />
                        </div>
                      )}
                    </div>

                    {/* Interpretation */}
                    <div className="col-12">
                      <label>
                        Do you require interpretation or multilingual support?
                      </label>
                      <div className="mt-2">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="interpretation"
                            value="Yes"
                            id="interp_yes"
                            onChange={handleSingleChange("interpretation")}
                            checked={sideEventData.interpretation === "Yes"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="interp_yes"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="interpretation"
                            value="No"
                            id="interp_no"
                            onChange={handleSingleChange("interpretation")}
                            checked={sideEventData.interpretation === "No"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="interp_no"
                          >
                            No
                          </label>
                        </div>

                        {sideEventData.interpretation.includes("Yes") && (
                          <div className="mt-2 ms-3">
                            <input
                              type="text"
                              name="interpretationLanguages"
                              className="custom-input"
                              placeholder="Please list languages"
                              onChange={handleSingleChange(
                                "interpretationLanguages"
                              )}
                              value={sideEventData.interpretationLanguages}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="col-12">
                      <h4 className="mt-4 text-black">
                        Additional Information
                      </h4>
                    </div>
                    <div className="col-12">
                      <label>
                        Have you organized a side event at AIM Congress before?
                      </label>
                      <div className="mt-2">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priorEvent"
                            value="Yes"
                            id="prior_yes"
                            onChange={handleSingleChange("priorEvent")}
                            checked={sideEventData.priorEvent === "Yes"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="prior_yes"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="priorEvent"
                            value="No"
                            id="prior_no"
                            onChange={handleSingleChange("priorEvent")}
                            checked={sideEventData.priorEvent === "No"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="prior_no"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label>
                        Additional Notes or Special Requests (optional):
                      </label>
                      <textarea
                        name="additionalNotes"
                        rows={3}
                        className="custom-input mt-2"
                        onChange={handleSingleChange("additionalNotes")}
                        value={sideEventData.additionalNotes}
                      />
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
                              id="field_228Side Event Organizer"
                              type="checkbox"
                              name="field[228][]"
                              value="Side Event Organizer"
                              defaultChecked
                            />
                            <span>
                              <label>Side Event Organizer</label>
                            </span>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    {/* Confirmation */}
                    <div className="col-12">
                      <div className="form-check mt-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="acknowledgement"
                          id="acknowledgement"
                          onChange={(e) =>
                            setConfirmedDesclaimer(e.target.checked)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="acknowledgement"
                        >
                          I understand that side events are subject to approval
                          and applicable hosting fees. I am open to discussing
                          available packages and logistics upon acceptance of
                          this proposal.
                        </label>
                      </div>
                    </div>

                    <div className="col-12 my-4">
                      <div
                        className="g-recaptcha"
                        data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                      ></div>
                    </div>
                    <div className="col-12 text-left mt-4">
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
  const mainsource = params.mainsource || "/";
  const subsource = params.subsource || "/";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  const datasourceStr: string = await Globals.KontentClient.item(
    "call_for_side_events___form"
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
