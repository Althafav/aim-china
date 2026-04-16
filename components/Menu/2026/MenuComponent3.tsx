import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import Globals from "@/modules/Globals";
import { useRouter } from "next/router";

import { CiSearch } from "react-icons/ci";
import SearchBarComponent from "../../UI/SearchBarComponent";

import { Newmenuitem } from "@/models/newmenuitem";
import Helper from "@/modules/Helper";
import {
  FaArrowCircleRight,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Buttonitem } from "@/models/buttonitem";
import { Global2026 } from "@/models/global2026";
import { Menuitem2026 } from "@/models/menuitem2026";

import { MdKeyboardArrowDown } from "react-icons/md";
import SearchBar from "../SearchBar";
import PromoBannerSlider from "../PromoBannerSlider";
import PromotionBannerSwiper from "../PromoBannerSlider";

export default function MenuComponent3() {
  const [pageData, setPageData] = useState<Global2026 | null>(null);
  const [isSearchToggle, setIsSearchToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const { asPath, locale, push, locales } = useRouter();
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

  const handleToggle = () => {
    setIsToggle((prevState) => !prevState);
  };

  const toggleSubmenu = (index: any) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);

    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!pageData) {
    return <></>;
  }

  const promoBanner = pageData.promobanneritems.value;

  return (
    <nav
      className={`menu-wrapperv2   ${!isVisible ? "translate-y" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container ">
        <div className="row">
          <div className="col-12 top-items-container">
            <div className=" row justify-content-between align-items-center py-1">
              <div className="col-lg-8 d-flex align-items-center gap-5 justify-content-between justify-content-lg-start">
                <div className="d-flex gap-3 align-items-center">
                  <Link href="/" className="logo-wrapper">
                    <img
                      src="/assets/imgs/AIM-logo.png"
                      alt="Logo"
                      className="menu-logo white-logo aim-logo p-1"
                    />
                  </Link>
                  <div className="logo-wrapper">
                    {pageData.ministrylogos?.value
                      ?.slice(0, 1)
                      .map((item: any) => (
                        <Link
                        href={item.link.value || "#"}
                          key={item.system.id}
                          className=""
                          title={item?.name?.value}
                        >
                          <img
                            src={item?.image?.value?.[0]?.url}
                            alt={item?.image?.value?.[0]?.name}
                            className="menu-logo white-logo aim-logo p-1"
                          />
                        </Link>
                      ))}
                  </div>
                </div>

                <motion.div className="menu-icon-wrapper d-lg-none d-flex gap-2">
                  {isToggle ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IoMdClose
                        size={32}
                        className="menu-icon"
                        cursor="pointer"
                        onClick={handleToggle}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiOutlineMenuAlt2
                        size={32}
                        className="menu-icon"
                        cursor="pointer"
                        onClick={handleToggle}
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* <div className="d-lg-flex d-none">
                  <img
                    src="/assets/imgs/Ministry logos.png"
                    alt="aimcongress 2025"
                    className="ministry-logo"
                    style={{ width: "280px", objectFit: "contain" }}
                  />
                </div> */}
              </div>
              <div className="col-lg-4 d-lg-flex d-none">
                <PromotionBannerSwiper promoBanners={promoBanner} />
              </div>
            </div>
          </div>
        </div>

        <div className="d-lg-flex d-none  align-items-center justify-content-between py-1">
          <div className="d-flex flex-column gap-4">
            <div>
              {isSearchToggle ? (
                <>
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 backdrop-blur"
                    style={{ zIndex: 1040 }}
                  ></div>

                  <div ref={searchRef}>
                    <SearchBar />
                  </div>
                </>
              ) : (
                <ul className="menu-items">
                  <Link href="/">
                    <img
                      src="/assets/logos/AIM Logomark White.png"
                      alt=""
                      style={{ width: "60px", objectFit: "contain" }}
                      className="aim-logo-icon rounded-pill"
                    />
                  </Link>
                  {pageData.menuitems.value.map((m: any, index: number) => {
                    var item: Menuitem2026 = m;

                    if (item.name.value === "GET INVOLVED AS") {
                      return null;
                    }

                    return (
                      <div key={`menu-${index}`}>
                        <div className="menu-item ">
                          <Link
                            href={item.link.value}
                            target={
                              item.isexternal.value[0]?.name === "Yes"
                                ? "_blank"
                                : "_self"
                            }
                          >
                            <span className="menu-label">
                              {" "}
                              {item.name.value}
                            </span>

                            {item.subitems.value.length > 0 && (
                              <MdKeyboardArrowDown
                                color="white"
                                className={`
                    ml-2 transform transition-transform duration-300
                   
                  `}
                                size={20}
                              />
                            )}
                          </Link>

                          {item.subitems.value.length > 0 && (
                            <div className="dropdown">
                              {item.subitems.value.map(
                                (s: any, subIndex: number) => {
                                  var subItem: Menuitem2026 = s;
                                  return (
                                    <div
                                      className="subitem-wrapper"
                                      key={subIndex}
                                    >
                                      <div
                                        className="dropdown-item "
                                        key={`s-${subIndex}`}
                                      >
                                        <Link
                                          href={subItem.link.value}
                                          target={
                                            subItem.isexternal.value[0]
                                              ?.name === "Yes"
                                              ? "_blank"
                                              : "_self"
                                          }
                                          className="d-flex gap-3 align-items-center justify-content-between"
                                        >
                                          <span className="menu-label">
                                            {" "}
                                            {subItem.name.value}
                                          </span>
                                          {subItem.subitems.value.length >
                                            0 && <FaArrowCircleRight />}
                                        </Link>
                                      </div>

                                      {subItem.subitems.value.length > 0 && (
                                        <div className="dropdown2">
                                          {subItem.subitems.value.map(
                                            (s: any, subIndex2: number) => {
                                              var subItem2: Menuitem2026 = s;
                                              return (
                                                <div
                                                  className="dropdown-item "
                                                  key={`s-${subIndex2}`}
                                                >
                                                  <Link
                                                    href={subItem2.link.value}
                                                    target={
                                                      subItem2.isexternal
                                                        .value[0]?.name ===
                                                      "Yes"
                                                        ? "_blank"
                                                        : "_self"
                                                    }
                                                    className="d-flex gap-3 align-items-center"
                                                  >
                                                    <span className="menu-label">
                                                      {" "}
                                                      {subItem2.name.value}
                                                    </span>
                                                  </Link>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {pageData.menuitems.value.map((m: any, index: number) => {
                    var item: Menuitem2026 = m;

                    if (item.name.value !== "GET INVOLVED AS") {
                      return null;
                    }

                    return (
                      <div key={`menu-${index}`}>
                        <div className="menu-item ">
                          <Link
                            href={item.link.value}
                            target={
                              item.isexternal.value[0]?.name === "Yes"
                                ? "_blank"
                                : "_self"
                            }
                            className=" d-flex align-items-center gap-2 border border-primary px-3 py-2 rounded-pill"
                          >
                            <span className="menu-label">
                              {" "}
                              {item.name.value}
                            </span>

                            {item.subitems.value.length > 0 && (
                              <MdKeyboardArrowDown
                                color="white"
                                className={`
                    ml-2 transform transition-transform duration-300
                   
                  `}
                                size={20}
                              />
                            )}
                          </Link>

                          {item.subitems.value.length > 0 && (
                            <div className="dropdown">
                              {item.subitems.value.map(
                                (s: any, subIndex: number) => {
                                  var subItem: Menuitem2026 = s;
                                  return (
                                    <div
                                      className="subitem-wrapper"
                                      key={subIndex}
                                    >
                                      <div
                                        className="dropdown-item "
                                        key={`s-${subIndex}`}
                                      >
                                        <Link
                                          href={subItem.link.value}
                                          target={
                                            subItem.isexternal.value[0]
                                              ?.name === "Yes"
                                              ? "_blank"
                                              : "_self"
                                          }
                                          className="d-flex gap-3 align-items-center justify-content-between"
                                        >
                                          <span className="menu-label">
                                            {" "}
                                            {subItem.name.value}
                                          </span>
                                          {subItem.subitems.value.length >
                                            0 && <FaArrowCircleRight />}
                                        </Link>
                                      </div>

                                      {subItem.subitems.value.length > 0 && (
                                        <div className="dropdown2">
                                          {subItem.subitems.value.map(
                                            (s: any, subIndex2: number) => {
                                              var subItem2: Menuitem2026 = s;
                                              return (
                                                <div
                                                  className="dropdown-item "
                                                  key={`s-${subIndex2}`}
                                                >
                                                  <Link
                                                    href={subItem2.link.value}
                                                    target={
                                                      subItem2.isexternal
                                                        .value[0]?.name ===
                                                      "Yes"
                                                        ? "_blank"
                                                        : "_self"
                                                    }
                                                    className="d-flex gap-3 align-items-center"
                                                  >
                                                    <span className="menu-label">
                                                      {" "}
                                                      {subItem2.name.value}
                                                    </span>
                                                  </Link>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="d-lg-flex gap-2 align-items-center d-none">
            {/* <div className="d-flex align-items-center p-2">
              <div onClick={() => setIsSearchToggle(!isSearchToggle)}>
                {!isSearchToggle ? (
                  <CiSearch color="white" size={30} cursor="pointer" />
                ) : (
                  <div className="text-white d-flex flex-column">
                    <IoMdClose color="white" size={20} cursor="pointer" />
                  </div>
                )}
              </div>
            </div> */}

            {pageData.ctabutton.value.map((m: any, index: number) => {
              const item: Buttonitem = m;
              return (
                <Link
                  href={item.link.value}
                  className="menu-cta-wrapper"
                  key={`register-btn-${index}`}
                >
                  <button className={`register-interest-cta `}>
                    {item.name.value}
                  </button>
                </Link>
              );
            })}

            {/* <div className="d-flex">
              {locales!.map((loc) => (
                <button
                  key={loc}
                  className={`bg-primary text-white px-2 py-1 rounded ${
                    loc === locale ? "active" : ""
                  }`}
                  onClick={() => push(asPath, asPath, { locale: loc })}
                >
                  {loc === "en" ? "En" : "中文"}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isToggle && (
          <motion.div
            className="menu__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-nav d-lg-none d-block"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-menu-items list-unstyled m-0 p-0">
                {/* Close */}
                <li className="px-4 py-3 text-end">
                  <IoMdClose
                    size={32}
                    cursor="pointer"
                    onClick={handleToggle}
                  />
                </li>

                {/* Search */}
                <li className="px-4 pb-3">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="global-search-bar-sm"
                  >
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="global-search-input-sm form-control"
                      autoFocus
                    />
                  </form>
                </li>

                {/* Top-level items */}
                {pageData.menuitems.value.map((m, idx) => {
                  const item = m as Newmenuitem;
                  const href = item.link?.value || "";
                  const hasChildren = !!item.subitems?.value.length;

                  return (
                    <li key={idx} className="mobile-menu-item">
                      <div className="d-flex align-items-center justify-content-between px-4 py-1">
                        {/* Label: Link if href, else span */}
                        {href ? (
                          <Link
                            href={href}
                            target={
                              item.isexternal.value?.[0]?.name === "Yes"
                                ? "_blank"
                                : "_self"
                            }
                            className="menu-label flex-grow-1"
                            onClick={handleToggle}
                          >
                            {item.name.value}
                          </Link>
                        ) : (
                          <span className="menu-label flex-grow-1">
                            {item.name.value}
                          </span>
                        )}

                        {/* Submenu toggle */}
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => toggleSubmenu(idx.toString())}
                            className="submenu-toggle-btn"
                            aria-label="Toggle submenu"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              marginLeft: 8,
                              color: "white",
                            }}
                          >
                            <IoMdArrowDropdown
                              size={20}
                              style={{
                                transform: openSubmenus[idx]
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s",
                              }}
                            />
                          </button>
                        )}
                      </div>

                      {/* First-level submenu */}
                      {hasChildren && openSubmenus[idx] && (
                        <ul className="mobile-dropdown list-unstyled ps-4">
                          {item.subitems.value.map((s: any, sidx: number) => {
                            const sub = s as Newmenuitem;
                            const subHref = sub.link?.value || "";
                            const hasSub2 = !!sub.subitems?.value.length;

                            return (
                              <li key={sidx} className="dropdown-item py-2">
                                <div className="d-flex align-items-center justify-content-between">
                                  {subHref ? (
                                    <Link
                                      href={subHref}
                                      className="flex-grow-1"
                                      onClick={handleToggle}
                                    >
                                      {sub.name.value}
                                    </Link>
                                  ) : (
                                    <span className="flex-grow-1">
                                      {sub.name.value}
                                    </span>
                                  )}

                                  {hasSub2 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleSubmenu(`${idx}-${sidx}`)
                                      }
                                      className="submenu-toggle-btn"
                                      aria-label="Toggle sub-submenu"
                                      style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        marginLeft: 8,
                                        color: "white",
                                      }}
                                    >
                                      <IoMdArrowDropdown
                                        size={18}
                                        style={{
                                          transform: openSubmenus[
                                            `${idx}-${sidx}`
                                          ]
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                          transition: "transform 0.3s",
                                        }}
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* Second-level submenu */}
                                {hasSub2 && openSubmenus[`${idx}-${sidx}`] && (
                                  <ul className="list-unstyled ps-3 pt-1">
                                    {sub.subitems.value.map(
                                      (s2: any, i2: number) => {
                                        const sub2Href = s2.link?.value || "";
                                        return (
                                          <li
                                            key={i2}
                                            className="dropdown-item py-1"
                                          >
                                            {sub2Href ? (
                                              <Link
                                                href={sub2Href}
                                                onClick={handleToggle}
                                              >
                                                {s2.name.value}
                                              </Link>
                                            ) : (
                                              <span>{s2.name.value}</span>
                                            )}
                                          </li>
                                        );
                                      },
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}

                {/* Contact CTA */}
                <li className="mobile-menu-item px-4 py-3">
                  <Link href="/register-interest" onClick={handleToggle}>
                    <button className="register-interest-cta w-100">
                      Register Your Interest
                    </button>
                  </Link>
                </li>

                <div className="d-flex px-4">
                  {locales!.map((loc) => (
                    <button
                      key={loc}
                      className={`bg-primary text-white px-2 py-1 ${
                        loc === locale ? "active" : ""
                      }`}
                      onClick={() => push(asPath, asPath, { locale: loc })}
                    >
                      {loc === "en" ? "En" : "CN"}
                    </button>
                  ))}
                </div>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
