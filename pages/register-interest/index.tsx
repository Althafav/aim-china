// pages/register.tsx

import Head from "next/head";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import GenericData from "@/contants/countryData";
import { businessTypes } from "@/contants/NatureOfBusiness";
import { Form2026 } from "@/models/form2026";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Script from "next/script";
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
  attendAs,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/registerInterest.js`);
  }, []);

  const handleCheck = (
    checkboxId: string,
    yesFieldId: string,
    noFieldId: string,
  ) => {
    const checkbox = document.getElementById(
      checkboxId,
    ) as HTMLInputElement | null;
    const yesInput = document.getElementById(
      yesFieldId,
    ) as HTMLInputElement | null;
    const noInput = document.getElementById(
      noFieldId,
    ) as HTMLInputElement | null;
    if (!checkbox || !yesInput || !noInput) {
      console.warn("Missing checkbox or hidden input fields.");
      return;
    }

    if (checkbox.checked) {
      yesInput.checked = true;
      noInput.checked = false;
    } else {
      yesInput.checked = false;
      noInput.checked = true;
    }
  };

  useEffect(() => {
    if (attendAs) {
      const formatted = attendAs.toLowerCase();
      const options = [
        "Speaker",
        "Sponsor",
        "Supporting Partner",
        "Media Partner",
        "Conference/Workshop Delegate",
      ];

      options.forEach((label, index) => {
        if (label.toLowerCase() === formatted) {
          const checkbox = document.getElementById(
            `field_228_${index}`,
          ) as HTMLInputElement;
          if (checkbox) checkbox.checked = true;
        }
      });
    }
  }, [attendAs]);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="form-2026">
      <div className="container">
        <div className="register-interest-form-wrapper-2026 ">
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
          <div className="row py-lg-5 py-3 px-lg-3">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <form
                    method="POST"
                    action="https://strategic31677.activehosted.com/proc.php"
                    id="_form_514_"
                    noValidate
                  >
                    <input type="hidden" name="u" value="514" />
                    <input type="hidden" name="f" value="514" />
                    <input type="hidden" name="s" />
                    <input type="hidden" name="c" value="0" />
                    <input type="hidden" name="m" value="0" />
                    <input type="hidden" name="act" value="sub" />
                    <input type="hidden" name="v" value="2" />
                    <input
                      type="hidden"
                      name="or"
                      value="d752b407fb8e3cce37eb9b21d7005c7f"
                    />
                    <input
                      type="hidden"
                      name="field[38]"
                      value={`${
                        attendAs
                          ? `AIM China 2025 - ${attendAs} RYI`
                          : "AIM China 2025 - RYI"
                      }`}
                    />
                    <input type="hidden" name="field[328]" value={mainsource} />
                    <input type="hidden" name="field[329]" value={subsource} />
                    <input
                      type="hidden"
                      name="leadType"
                      value={
                        attendAs === "Speaker"
                          ? "Conference Leads"
                          : "AIM China Lead"
                      }
                    />
                    <div className="_form-content form-grid px-4">
                      <div className="row g-3">
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
                            itemID="email"
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
                            <option value="">Select Country*</option>

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
                              },
                            )}
                          </select>
                        </div>

                        <div className="col-lg-6">
                          <select
                            id="field[99]"
                            name="field[99]"
                            className="custom-select"
                            required
                          >
                            <option value="">Select Nationality*</option>

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
                              },
                            )}
                          </select>
                        </div>

                        <div className="col-lg-12">
                          <select
                            name="field[4]"
                            itemID="field[4]"
                            className="custom-select"
                            required
                          >
                            <option value="">Nature of Business *</option>
                            {businessTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className={`col-12 mt-4 px-4 ${
                            attendAs.length > 1 && "d-none"
                          }`}
                        >
                          <label className="form-label fw-bold mb-2 ">
                            Interested to attend as{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <div className={`"d-flex flex-wrap gap-3"`}>
                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Exhibitor`}
                                value="Exhibitor"
                                defaultChecked={attendAs === "Exhibitor"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Exhibitor`}
                              >
                                Exhibitor
                              </label>
                            </div>
                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Speaker`}
                                value="Speaker"
                                defaultChecked={attendAs === "Speaker"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Speaker`}
                              >
                                Speaker
                              </label>
                            </div>
                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Sponsor`}
                                value="Sponsor"
                                defaultChecked={attendAs === "Sponsor"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Sponsor`}
                              >
                                Sponsor
                              </label>
                            </div>

                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Supporting Partner`}
                                value="Supporting Partner"
                                defaultChecked={
                                  attendAs === "Supporting Partner"
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Supporting Partner`}
                              >
                                Supporting Partner
                              </label>
                            </div>

                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Media Partner`}
                                value="Media Partner"
                                defaultChecked={attendAs === "Media Partner"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Media Partner`}
                              >
                                Media Partner
                              </label>
                            </div>

                            <div className="form-check form-check-inline custom-checkbox-box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="field[228][]"
                                id={`field_228_Conference/Workshop Delegate`}
                                value="Conference/Workshop Delegate"
                                defaultChecked={attendAs === "Delegate"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`field_228_Conference/Workshop Delegate`}
                              >
                                Conference Delegate
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="options-row px-2 d-none">
                        <label className="custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="brochure"
                            onClick={() =>
                              handleCheck(
                                "brochure",
                                "field_229Yes",
                                "field_229No",
                              )
                            }
                          />
                          <span>Download Brochure</span>
                        </label>
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            id="newsletter"
                            className="form-check-input"
                            onClick={() =>
                              handleCheck(
                                "newsletter",
                                "field_231Yes",
                                "field_231No",
                              )
                            }
                          />
                          <span>Subscribe to our Newsletter</span>
                        </label>
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
                            id="_form_514_submit"
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-pill"
                          >
                            <span>Submit</span>
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
  const attendAs = params.attend || "";
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";
  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  let codename = "form___register_interest___aim_china_chapter";

  if (attendAs.toLowerCase() === "exhibitor") {
    codename = "form___register_interest___aim_china_chapter_exhibitor";
  } else if (attendAs.toLowerCase() === "sponsor") {
    codename = "form___register_interest___aim_talk_sponsor";
  } else if (attendAs.toLowerCase() === "speaker") {
    codename = "form___register_interest___aim_talk_speaker";
  } else if (attendAs.toLowerCase() === "media partner") {
    codename = "form___register_interest___aim_talk_media_partner";
  } else if (attendAs.toLowerCase() === "supporting partner") {
    codename = "form___register_interest___aim_talk_media_partner";
  }
  const datasourceStr: string = await Globals.KontentClient.item(codename)
    .languageParameter(languageCode)
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
      attendAs,
    },
  };
}
