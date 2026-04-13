// pages/register.tsx

import Head from "next/head";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import GenericData from "@/contants/countryData";
import { businessTypes } from "@/contants/NatureOfBusiness";

import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Form2026 } from "@/models/form2026";
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
  email: string;
  pageData: Form2026;
}

export default function RegisterPage({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,

  email,
  pageData,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(`${Globals.BASE_URL}assets/js/team-contact.js`);
  }, []);

  const handleCheck = (
    checkboxId: string,
    yesFieldId: string,
    noFieldId: string
  ) => {
    const checkbox = document.getElementById(
      checkboxId
    ) as HTMLInputElement | null;
    const yesInput = document.getElementById(
      yesFieldId
    ) as HTMLInputElement | null;
    const noInput = document.getElementById(
      noFieldId
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

  if (!CountriesData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="form-2026">
      <Head>
        <title>{`${Globals.SITE_NAME} | Team Contact`}</title>
        <meta name="title" content={`${Globals.SITE_NAME} | Team Contact`} />
        <meta
          name="description"
          content={`${Globals.SITE_NAME} | Team Contact`}
        />
      </Head>
      <div className="container">
        <div className="register-interest-form-wrapper-2026  ">
          <div className="form-banner-wrapper aspect-ratio-box px-3">
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
                      value="AIM 2026-Register Your Interest Team"
                    />
                    <input type="hidden" name="field[328]" value={mainsource} />
                    <input type="hidden" name="field[329]" value={subsource} />
                    <input type="hidden" name="teamEmail" value={email} />
                    <div className="_form-content form-grid">
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
                              }
                            )}
                          </select>
                        </div>

                        <div className="col-lg-6">
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

                        <div className="col-12 mt-4 px-4">
                          <label className="form-label fw-bold mb-3 ">
                            Interested to attend as{" "}
                          </label>

                          <div className="d-flex flex-wrap gap-3">
                            {[
                              "Exhibitor",
                              "Sponsor",
                              "Supporting Partner",
                              "Media Partner",
                              "Investment Destination Presenter",
                              "Conference/Workshop Delegate",
                              "Visitor",
                            ].map((label, i) => (
                              <div
                                key={i}
                                className="form-check form-check-inline custom-checkbox-box"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="field[228][]"
                                  id={`field_228_${i}`}
                                  value={label}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`field_228_${i}`}
                                >
                                  {label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-md-12 ">
                          <textarea
                            id="field[6]"
                            name="field[6]"
                            className="custom-input"
                            aria-label="With textarea"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>

                      <div className="options-row px-2">
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            id="newsletter"
                            className="form-check-input"
                            onClick={() =>
                              handleCheck(
                                "newsletter",
                                "field_231Yes",
                                "field_231No"
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
                            id="_form_394_submit"
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
  const mainsource = params.mainsource || "/our-team";
  const subsource = params.subsource || "/";
  const id = params.id || "";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  let email = "";
  const teamData = await Globals.KontentClient.items()
    .equalsFilter("system.id", id)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((response: any) => response.firstItem);

  email = teamData.email.value;

  const datasourceStr: string = await Globals.KontentClient.item(
    "form___register_interest"
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
      email,
      pageData,
    },
  };
}
