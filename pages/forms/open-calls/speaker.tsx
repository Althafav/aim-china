// pages/register.tsx

import Head from "next/head";
import React, { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import GenericData from "@/contants/countryData";

import { Form2026 } from "@/models/form2026";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Link from "next/link";

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

export default function RegisterPage({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(
      `/assets/js/open-calls/call-speaker.js`
    );
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    topics: [],
    sessionTitle: "",
    abstract: "",
    shortBio: "",
    previousSpeaking: "No",
    previousSpeakingDetails: "",
    travelSupport: "No",
    additionalNotes: "",
  });

  const handleMultiChange =
    (field: keyof any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setFormData((prev: any) => {
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
    (field: keyof any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev: any) => ({
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
        <meta property="og:url" content="https://aimcongress.cn/forms/open-calls/speaker" />
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

        <link rel="canonical" href="https://aimcongress.cn/forms/open-calls/speaker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="register-interest-form-wrapper-2026  ">
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
          <div className="row py-lg-5 py-3 px-4">
            <div className="col-12">
              <div className="row">
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
                      id="field[377]"
                      name="field[377]"
                      style={{ display: "none" }}
                      value={JSON.stringify(formData)}
                      readOnly
                    />
                    <input type="hidden" name="bioAttachmentUrl" />

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
                        <div className="col-lg-6">
                          <input
                            type="text"
                            itemID="firstname"
                            name="firstname"
                            className="custom-input"
                            placeholder="First Name *"
                            required
                          />
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            itemID="lastname"
                            name="lastname"
                            className="custom-input"
                            placeholder="Last Name *"
                            required
                          />
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            itemID="customer_account"
                            name="customer_account"
                            className="custom-input"
                            placeholder="Organization *"
                            required
                          />
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="custom-input"
                            placeholder="Email *"
                            required
                          />
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            name="field[23]"
                            placeholder="Job Title *"
                            required
                            className="custom-input"
                          />
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
                          <select
                            name="field[3]"
                            itemID="field[3]"
                            className="custom-select"
                            required
                          >
                            <option value="">
                              Select Country of Residence*
                            </option>

                            {CountriesData.map(
                              (country: any, index: number) => {
                                return (
                                  <option
                                    key={`country-${index}`}
                                    value={country.value}
                                  >
                                    {country.label}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            name="Linkedin"
                            className="custom-input"
                            placeholder="LinkedIn Profile / Website"
                          />
                        </div>

                        {/* Presentation Proposal */}
                        <div className="col-12 ">
                          <label className="form-label fw-bold mb-2">
                            Presentation Proposal : (Choose one or more)
                          </label>
                          <div className="d-flex flex-wrap gap-3 px-4">
                            {/* Global Markets */}
                            <div className="w-100 fw-semibold mt-2">
                              Global Markets
                            </div>
                            {[
                              "FDI",
                              "Global Trade",
                              "Global Manufacturing",
                            ].map((topic) => (
                              <label key={topic}>
                                <input
                                  type="checkbox"
                                  name="topics"
                                  value={topic}
                                  onChange={handleMultiChange("topics")}
                                  checked={formData.topics.includes(topic)}
                                  className="form-check-input"
                                />{" "}
                                {topic}
                              </label>
                            ))}
                            {/* Future Economies */}
                            <div className="w-100 fw-semibold mt-2">
                              Future Economies
                            </div>
                            {[
                              "Future Cities",
                              "Future Finance",
                              "Digital Economy",
                            ].map((topic) => (
                              <label
                                key={topic}
                                className="form-check form-check-inline custom-checkbox-box"
                              >
                                <input
                                  type="checkbox"
                                  name="topics"
                                  onChange={handleMultiChange("topics")}
                                  checked={formData.topics.includes(topic)}
                                  value={topic}
                                  className="form-check-input"
                                />
                                <span>{topic}</span>
                              </label>
                            ))}
                            {/* NexGen */}
                            <div className="w-100 fw-semibold mt-2">NexGen</div>
                            {[
                              "Unicorns",
                              "SMEs",
                              "Artificial Intelligence",
                            ].map((topic) => (
                              <label
                                key={topic}
                                className="form-check form-check-inline custom-checkbox-box"
                              >
                                <input
                                  type="checkbox"
                                  name="topics"
                                  onChange={handleMultiChange("topics")}
                                  checked={formData.topics.includes(topic)}
                                  value={topic}
                                  className="form-check-input"
                                />
                                <span>{topic}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Proposed Session Title *
                          </label>
                          <input
                            type="text"
                            name="sessionTitle"
                            value={formData.sessionTitle}
                            onChange={handleSingleChange("sessionTitle")}
                            className="custom-input"
                            placeholder="Proposed Session Title *"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Abstract (150–250 words) :
                          </label>
                          <p className="small">
                            (Briefly describe your proposed session, its
                            objectives, relevance to AIM Congress themes, and
                            key takeaways for the audience)
                          </p>
                          <textarea
                            name="abstract"
                            className="custom-input"
                            value={formData.abstract}
                            onChange={handleSingleChange("abstract")}
                            placeholder="Abstract (150–250 words)"
                            rows={6}
                            required
                          />
                        </div>

                        {/* Speaker Bio & Experience */}
                        <div className="col-12 ">
                          <label className="form-label fw-bold mb-2">
                            Short Bio (100–150 words):
                          </label>
                          <textarea
                            name="shortBio"
                            className="custom-input"
                            rows={4}
                            required
                            value={formData.shortBio}
                            onChange={handleSingleChange("shortBio")}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Bio Attachment (optional)
                          </label>
                          <input
                            type="file"
                            id="bioAttachment"
                            name="bioAttachment"
                            className="custom-input mt-2"
                          />
                          <input
                            type="hidden"
                            className="bioAttachment"
                            name="bioAttachmentUrl"
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Have you spoken at AIM Congress or any similar
                            international events before?
                          </label>
                          <div>
                            <label className="form-check form-check-inline custom-checkbox-box">
                              <input
                                type="radio"
                                name="previousSpeaking"
                                value="Yes"
                                checked={formData.previousSpeaking === "Yes"}
                                onChange={handleSingleChange(
                                  "previousSpeaking"
                                )}
                                className="form-check-input"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="form-check form-check-inline custom-checkbox-box">
                              <input
                                type="radio"
                                name="previousSpeaking"
                                value="No"
                                checked={formData.previousSpeaking === "No"}
                                onChange={handleSingleChange(
                                  "previousSpeaking"
                                )}
                                className="form-check-input"
                              />
                              <span>No</span>
                            </label>
                          </div>
                          <input
                            type="text"
                            name="previousSpeakingDetails"
                            className="custom-input mt-2"
                            value={formData.previousSpeakingDetails}
                            onChange={handleSingleChange(
                              "previousSpeakingDetails"
                            )}
                            placeholder="List relevant speaking engagements or link to sample video"
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Do you require travel or accommodation support?
                          </label>
                          <div>
                            <label className="form-check form-check-inline custom-checkbox-box">
                              <input
                                type="radio"
                                name="travelSupport"
                                value="Yes"
                                checked={formData.travelSupport === "Yes"}
                                onChange={handleSingleChange("travelSupport")}
                                className="form-check-input"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="form-check form-check-inline custom-checkbox-box">
                              <input
                                type="radio"
                                name="travelSupport"
                                value="No"
                                checked={formData.travelSupport === "No"}
                                onChange={handleSingleChange("travelSupport")}
                                className="form-check-input"
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="col-12">
                          <label className="form-label fw-bold mb-2">
                            Any special requests or considerations (e.g.,
                            co-speakers, preferred time slots, accessibility
                            needs)?
                          </label>
                          <textarea
                            name="additionalNotes"
                            className="custom-input"
                            value={formData.additionalNotes}
                            onChange={handleSingleChange("additionalNotes")}
                            placeholder="Additional Notes"
                            rows={4}
                          />
                        </div>

                        <div className="col-lg-6 d-none   ">
                          <select
                            name="field[4]"
                            itemID="field[4]"
                            className="custom-select"
                          >
                            <option value="">Nature of Business *</option>

                            <option key="" value="">
                              ""
                            </option>
                          </select>
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
                                  id="field_228Speaker"
                                  type="checkbox"
                                  name="field[228][]"
                                  value="Speaker"
                                  defaultChecked
                                />
                                <span>
                                  <label>Speaker</label>
                                </span>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      <div className="row px-3">
                        <div className="col-12 my-4">
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                          ></div>
                        </div>
                        <div className="col-12 text-start">
                          <button
                            id="_form_394_submit"
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-pill"
                          >
                            <span>Submit Application</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="_form-thank-you "
                      style={{ display: "none" }}
                    ></div>
                  </form>
                </div>
              </div>
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
    "call_for_speaker__form"
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
