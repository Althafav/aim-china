import { Global2026 } from "@/models/global2026";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import Helper from "@/modules/Helper";
import { Menuitem2026 } from "@/models/menuitem2026";
import { useRouter } from "next/router";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<Global2026 | null>(null);
  const { locale } = useRouter();
  const languageCode = locale === "cn" ? "China" : "default";
  useEffect(() => {
    
    Globals.KontentClient.item("global_component_2026___aim_china")
      .languageParameter(languageCode)
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, [locale]);

  useEffect(() => {
    if (!pageData) return;
    JsLoader.loadFile(`/assets/js/newsLetter.js`);
  }, [pageData]);

  if (!pageData) {
    return <></>;
  }

  return (
    <div className="footer-component-wrapper ">
      <img
        src="/assets/imgs/2026/AIMGradient2.png"
        alt=""
        className="footer-bg"
      />

      <div className="container">
        <div className="row footer-content">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="">
              <div className="logos d-flex gap-3">
                <Link
                  href={pageData.sociallinksFacebookurl?.value}
                  target="_blank"
                >
                  <FaFacebook color="white" />
                </Link>

                <Link
                  href={pageData.sociallinks__whatsappurl?.value}
                  target="_blank"
                >
                  <FaWhatsapp color="white" />
                </Link>

                <Link
                  href={pageData.sociallinksLinkedinurl?.value}
                  target="_blank"
                >
                  <FaLinkedin color="white" />
                </Link>

                <Link
                  href={pageData.sociallinksInstagramurl?.value}
                  target="_blank"
                >
                  <FaInstagram color="white" />
                </Link>

                <Link
                  href={pageData.sociallinks__threadurl?.value}
                  target="_blank"
                >
                  <FaThreads color="white" />
                </Link>

                <Link
                  href={pageData.sociallinksYoutubeurl?.value}
                  target="_blank"
                >
                  <FaYoutube color="white" />
                </Link>

                <Link href={pageData.sociallinksXurl?.value} target="_blank">
                  <FaXTwitter color="white" />
                </Link>

                <Link
                  href={pageData.sociallinks__tiktokurl?.value}
                  target="_blank"
                >
                  <FaTiktok color="white" />
                </Link>
              </div>

              <div className="mt-5 mb-4 mb-lg-0">
                <label htmlFor="newsletter" className="text-white mb-2">
                  Signup for Newsletter
                </label>
                <form
                  method="POST"
                  action="https://strategic31677.activehosted.com/proc.php"
                  id="_form_110_"
                  className="_form _form_110 _inline-form  _dark"
                  noValidate
                  data-styles-version="5"
                >
                  <input type="hidden" name="u" value="110" />
                  <input type="hidden" name="f" value="110" />
                  <input type="hidden" name="s" />
                  <input type="hidden" name="c" value="0" />
                  <input type="hidden" name="m" value="0" />
                  <input type="hidden" name="act" value="sub" />
                  <input type="hidden" name="v" value="2" />
                  <input
                    type="hidden"
                    name="or"
                    value="1ffdd0662ea595757fa40fe1acafbb6a"
                  />
                  <div className="_form-content">
                    <div className="row">
                      <div className="col-lg-9">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control  rounded m-0 mb-2"
                          placeholder="Enter your email"
                          required
                        />

                        <div>
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="row"></div>

                    <div className="row">
                      <div className="col-12">
                        <button
                          className="newslettercta-btn"
                          type="submit"
                          id="_form_110_submit"
                          style={{ display: "block", marginTop: "10px" }}
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="_form-newsletter-thank-you subscribe-message text-success _form-thank-you"
                    style={{ display: "none" }}
                  ></div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="row g-3">
                  {pageData.footermenuitems.value.map(
                    (m: any, index: number) => {
                      const item: Menuitem2026 = m;
                      return (
                        <div className="col-lg-4 col-md-6 col-12" key={index}>
                          <div className="mb-1">
                            <Link
                              href={item.link.value}
                              className="footer-nav-head"
                              style={{
                                textTransform: "uppercase",
                                letterSpacing: "0",
                              }}
                            >
                              {item.name.value}
                            </Link>
                          </div>
                          <div className="footer-nav">
                            {item.subitems.value.map(
                              (s: any, index: number) => {
                                const subItem: Menuitem2026 = s;
                                return (
                                  <Link href={subItem.link.value} key={index}>
                                    <h6 className="footer-nav-label mb-2">
                                      {subItem.name.value}
                                    </h6>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-12 mb-4 mb-lg-0">
                <h5
                  className="footer-nav-head mb-4"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0",
                  }}
                >
                  Get In Touch
                </h5>
                <div className="footer-nav">
                  <Link
                    href={`tel:${pageData.phone.value}`}
                    className="footer-nav-label mb-1"
                  >
                    {pageData.phone.value}
                  </Link>
                  <h5 className="footer-nav-label mb-1">
                    {pageData.address.value}
                  </h5>
                  <Link
                    href={`mailto:${pageData.email.value}`}
                    className="footer-nav-label mb-1"
                  >
                    {pageData.email.value}
                  </Link>
                </div>

                <div className="mt-4">
                  <Link href="/register-interest">
                    <span className="cta-btn bg-primary">Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={"/assets/imgs/aim-white-horizontal.png"}
              alt=""
              className="aim-logo-white"
            />
          </div>
          <div className="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
            <p className="copy-right">© Copyright AIM Global Foundation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
