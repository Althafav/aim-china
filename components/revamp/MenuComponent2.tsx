import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import Globals from "@/modules/Globals";
import { useRouter } from "next/router";
import StartupMenuComponent from "../Portfolio/startup/StartupMenuComponent";
import FDIMenuComponent from "../Portfolio/FDI/FDIMenuComponent";
import { RoutesData } from "@/contants/menuRoutesData";
import { CiSearch } from "react-icons/ci";
import SearchBarComponent from "../UI/SearchBarComponent";
import DEMenuComponent from "../Portfolio/digital-economy/DEMenuComponent";
import FCMenuComponent from "../Portfolio/Future-Cities/FCMenuComponent";
import GlobalTradeMenuComponent from "../Portfolio/global-trade/GlobalTradeMenuComponent";
import GMMenuComponent from "../Portfolio/global-manufacturing/GMMenuComponent";
import FFMenuComponent from "../Portfolio/future-finance/FFMenuComponent";
import { Menuv2 } from "@/models/menuv2";
import { Newmenuitem } from "@/models/newmenuitem";
import Helper from "../../modules/Helper";
import { FaGlobe } from "react-icons/fa";
import { Buttonitem } from "@/models/buttonitem";

export default function MenuComponent2() {
  const [pageData, setPageData] = useState<Menuv2 | null>(null);
  const [isSearchToggle, setIsSearchToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleLanguageChange = (code: string) => {
    Helper.setLanguage(code);
    window.location.reload();
  };

  useEffect(() => {
    var languageCode = Helper.getLanguageCode();
    Globals.KontentClient.item("menu2025")
      .languageParameter(Helper.getLanguageName(languageCode))
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  const handleToggle = () => {
    setIsToggle((prevState) => !prevState);
  };

  const toggleSubmenu = (index: number) => {
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  const togglePortfolioDropdown = () => {
    setIsPortfolioDropdownOpen(!isPortfolioDropdownOpen);
  };

  const router = useRouter();

  const currentRouteData = RoutesData.find((data) =>
    router.pathname.startsWith(data.route)
  );

  const isStartupRoute = router.pathname.startsWith("/startup");
  const isFdiRoute = router.pathname.startsWith("/foreign-direct-investment");
  const isGTRoute = router.pathname.startsWith("/global-trade");
  const isDERoute = router.pathname.startsWith("/digital-economy");
  const isFCRoute = router.pathname.startsWith("/future-cities");
  const isGMRoute = router.pathname.startsWith("/global-manufacturing");
  const isFFRoute = router.pathname.startsWith("/future-finance");

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

  function CheckAgenda() {
    if (typeof window === "undefined") return;

    const { host } = window.location;

    let targetUrl;

    switch (host.toLowerCase()) {
      case "fdi.aimcongress.com":
        targetUrl =
          "https://fdi.aimcongress.com/agenda?portfolio=foreign-direct-investment";
        break;
      case "trade.aimcongress.com":
        targetUrl =
          "https://trade.aimcongress.com/agenda?portfolio=global-trade";
        break;
      case "manufacturing.aimcongress.com":
        targetUrl =
          "https://manufacturing.aimcongress.com/agenda?portfolio=global-manufacturing";
        break;
      case "futurecities.aimcongress.com":
        targetUrl =
          "https://futurecities.aimcongress.com/agenda?portfolio=future-cities";
        break;
      case "digitaleconomy.aimcongress.com":
        targetUrl =
          "https://digitaleconomy.aimcongress.com/agenda?portfolio=digital-economy";
        break;
      case "futurefinance.aimcongress.com":
        targetUrl =
          "https://futurefinance.aimcongress.com/agenda?portfolio=future-finance";
        break;
      case "startup.aimcongress.com":
        targetUrl =
          "https://startup.aimcongress.com/agenda?portfolio=Startups-Unicorns";
        break;
      case "entrepreneurs.aimcongress.com":
        targetUrl =
          "https://entrepreneurs.aimcongress.com/agenda?portfolio=entrepreneurs";
        break;
      default:
        targetUrl = "https://www.aimcongress.com/agenda";
        break;
    }

    window.location.href = targetUrl;
  }

  if (!pageData) {
    return <></>;
  }

  return (
    <nav
      className={`menu-wrapperv2  ${
        isStartupRoute ? "portfolio-solid-menu" : ""
      }  ${!isVisible ? "translate-y" : ""} ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="top-items-container d-flex justify-content-between align-items-center mb-1  mt-1">
              <div className="d-flex align-items-end gap-3">
                <Link
                  href={`${Globals.BASE_URL}`}
                  className="logo-wrapper pt-3"
                >
                  <img
                    src={pageData?.aimlogo.value[0]?.url}
                    alt="Logo"
                    className="menu-logo white-logo aim-logo"
                  />
                </Link>

                {currentRouteData && (
                  <Link
                    href={currentRouteData.route}
                    className="logo-wrapper d-flex flex-column align-items-center gap-3"
                  >
                    <img
                      src={currentRouteData.logo}
                      alt="Logo"
                      className="nav-bar-portfoio-logo"
                    />
                    <span className="portfolio-logo-name">
                      {currentRouteData.name}
                    </span>
                  </Link>
                )}
              </div>
              <div className="d-flex gap-5 align-items-center  top-items">
                <div className="top-item pt-3">
                  {isGMRoute ? (
                    <img
                      src="/assets/logos/ministry-logo-gm.png"
                      alt="aimcongress 2025"
                      className="ministry-logo"
                    />
                  ) : (
                    <img
                      src="/assets/imgs/Ministry logos.png"
                      alt="aimcongress 2025"
                      className="ministry-logo"
                    />
                  )}
                </div>
                {/* <div className='top-item'><span style={{ textDecoration: "underline" }}>LOGIN</span></div> */}
                {/* <div className='top-item'><CiGlobe size={20} /> <span>EN</span></div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-end justify-content-between pb-3 pt-1">
       

          <div className="d-flex flex-column gap-4">
            <div ref={searchRef}>
              {isSearchToggle ? (
                <div className="row">
                  <div className="col-12">
                    <form
                      onSubmit={handleSearchSubmit}
                      className=" global-search-bar-lg"
                    >
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What are you looking for?"
                        className="global-search-input-lg form-control"
                        autoFocus
                      />
                    </form>
                  </div>
                </div>
              ) : (
                <ul className="menu-items">
                  <Link href="/">
                    <img
                      src="/assets/logos/aimlogoicon.png"
                      alt=""
                      className="aim-logo-icon"
                    />
                  </Link>
                  {pageData.menuitems.value.map((m: any, index: number) => {
                    var item: Newmenuitem = m;

                    return (
                      <div key={`menu-${index}`}>
                        {item.isagenda.value[0]?.name === "True" ? (
                          <li className="menu-item ">
                            <Link
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                CheckAgenda();
                              }}
                              className="agenda"
                            >
                              AGENDA
                            </Link>
                          </li>
                        ) : (
                          <li className="menu-item ">
                            <Link href={item.link.value}>
                              <span className="menu-label">
                                {" "}
                                {item.name.value}
                              </span>
                            </Link>

                            {item.subitem.value.length > 0 && (
                              <ul className="dropdown">
                                {item.subitem.value.map(
                                  (s: any, subIndex: number) => {
                                    var subItem: Newmenuitem = s;
                                    return (
                                      <li
                                        className="dropdown-item "
                                        key={`s-${subIndex}`}
                                      >
                                        <Link
                                          href={subItem.link.value}
                                          className="d-flex gap-3 align-items-center"
                                        >
                                          {subItem.image.value.length > 0 && (
                                            <img
                                              src={subItem.image.value[0]?.url}
                                              alt={item.name.value}
                                              style={{
                                                width: "20px",
                                                objectFit: "contain",
                                              }}
                                              className="portfolio-menu-logo"
                                            />
                                          )}
                                          <span> {subItem.name.value}</span>
                                        </Link>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            )}
                          </li>
                        )}
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="d-lg-flex gap-2 align-items-center d-none">
            <div className="d-flex align-items-center">
              <div onClick={() => setIsSearchToggle(!isSearchToggle)}>
                {!isSearchToggle ? (
                  <CiSearch color="white" size={30} cursor="pointer" />
                ) : (
                  <div className="text-white d-flex flex-column">
                    <IoMdClose color="white" size={20} cursor="pointer" />
                  </div>
                )}
              </div>
            </div>

            {pageData.ctabutton.value.map((m: any, index: number) => {
              const item: Buttonitem = m;
              return (
                <Link
                  href={item.link.value}
                  className="menu-cta-wrapper"
                  key={`register-btn-${index}`}
                >
                  <button
                    className={`register-interest-cta `}
                    style={{
                      background: `${
                        currentRouteData ? currentRouteData.colorCode : ""
                      }`,
                    }}
                  >
                    {item.name.value}
                  </button>
                </Link>
              );
            })}

            {/* <Link href={`/packages?portfolio=${currentRouteData?.linkName?.toLowerCase() ?? ''}&source=website`} className='menu-cta-wrapper'>

                            <button className={`register-interest-cta `} style={{ background: `${currentRouteData ? currentRouteData.colorCode : ''}` }}>Register Now</button>
                        </Link> */}

            {/* language toggle here */}
            {/* <div className="dropdown ">
              <button
                className=" bg-transparent text-white dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaGlobe color="white" />
              </button>
              <ul
                className="dropdown-menu "
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <span
                    className="dropdown-item cursor-pointer"
                    onClick={() => handleLanguageChange("en-US")}
                  >
                    English
                  </span>
                </li>
                <li>
                  <span
                    className="dropdown-item cursor-pointer"
                    onClick={() => handleLanguageChange("ru-RU")}
                  >
                    Russia
                  </span>
                </li>
              </ul>
            </div> */}
          </div>

          <motion.div className="menu-icon-wrapper d-lg-none d-flex gap-2">
            <div>
              <SearchBarComponent />
            </div>
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
        </div>
      </div>

      {isStartupRoute && <StartupMenuComponent />}

      {isFdiRoute && <FDIMenuComponent />}

      {isGTRoute && <GlobalTradeMenuComponent />}

      {isDERoute && <DEMenuComponent />}

      {isFCRoute && <FCMenuComponent />}

      {isGMRoute && <GMMenuComponent />}

      {isFFRoute && <FFMenuComponent />}

      <AnimatePresence>
        {isToggle && (
          <motion.div
            className="mobile-menu-nav d-lg-none d-block"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-menu-items">
              <li>
                <div className="d-flex justify-content-between px-4 py-3">
                  <Link
                    href="https://aimcongress.cn/"
                    className="logo-wrapper"
                  >
                    <img
                      src={`/assets/imgs/AIM-logo.png`}
                      alt="Logo"
                      className="menu-logo white-logo"
                    />
                  </Link>
                  <IoMdClose
                    size={32}
                    className="menu-icon"
                    cursor="pointer"
                    onClick={handleToggle}
                  />
                </div>
              </li>

              {pageData.menuitems.value.map((m: any, index: number) => {
                var item: Newmenuitem = m;

                return (
                  <div key={`mobile-menu-${index}`}>
                    {item.isagenda.value[0]?.name === "True" ? (
                      <li className="mobile-menu-item">
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            CheckAgenda();
                          }}
                          className="agenda"
                        >
                          AGENDA
                        </Link>
                      </li>
                    ) : (
                      <li className="mobile-menu-item">
                        {item.subitem?.value.length > 0 ? (
                          <div
                            className="d-flex align-items-center justify-content-between"
                            onClick={() => toggleSubmenu(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="menu-label">{item.name.value}</div>
                            {item.subitem?.value.length > 0 && (
                              <IoMdArrowDropdown
                                color="white"
                                size={20}
                                className="submenu-toggle"
                                cursor="pointer"
                                style={{
                                  transform: openSubmenus[index]
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "0.3s",
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          <Link href={item.link.value} onClick={handleToggle}>
                            <span className="menu-label">
                              {item.name.value}
                            </span>
                          </Link>
                        )}

                        {openSubmenus[index] && (
                          <ul className="mobile-dropdown">
                            {item.subitem.value.map(
                              (s: any, subIndex: number) => {
                                var subItem: Newmenuitem = s;
                                return (
                                  <li
                                    className="dropdown-item "
                                    key={`submenu${index}-${subIndex}`}
                                  >
                                    <Link
                                      href={subItem.link.value}
                                      className="d-flex gap-3 align-items-center"
                                      onClick={handleToggle}
                                    >
                                      {subItem.image.value.length > 0 && (
                                        <img
                                          src={subItem.image.value[0]?.url}
                                          alt={item.name.value}
                                          style={{
                                            width: "20px",
                                            objectFit: "contain",
                                          }}
                                          className="portfolio-menu-logo"
                                        />
                                      )}
                                      <span> {subItem.name.value}</span>
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </li>
                    )}
                  </div>
                );
              })}

              <li className="mobile-menu-item">
                <Link href="/contact-us" onClick={handleToggle}>
                  <div className="menu-cta-wrapper w-100">
                    <button className="register-interest-cta">
                      Contact Us
                    </button>
                  </div>
                </Link>
              </li>
            </ul>
            <div className="menu__overlay"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
