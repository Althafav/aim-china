import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Globals from '@/modules/Globals';
import { useRouter } from 'next/router';
import StartupMenuComponent from './Portfolio/startup/StartupMenuComponent';
import FDIMenuComponent from './Portfolio/FDI/FDIMenuComponent';
import { RoutesData } from '@/contants/menuRoutesData';
import { CiSearch } from 'react-icons/ci';
import SearchBarComponent from './UI/SearchBarComponent';
import DEMenuComponent from './Portfolio/digital-economy/DEMenuComponent';
import FCMenuComponent from './Portfolio/Future-Cities/FCMenuComponent';
import GlobalTradeMenuComponent from './Portfolio/global-trade/GlobalTradeMenuComponent';
import GMMenuComponent from './Portfolio/global-manufacturing/GMMenuComponent';
import FFMenuComponent from './Portfolio/future-finance/FFMenuComponent';

export default function MenuComponent() {
  const [isSearchToggle, setIsSearchToggle] = useState(false)
  const [query, setQuery] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  const handleToggle = () => {
    setIsToggle(prevState => !prevState);
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
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const currentRouteData = RoutesData.find((data) => router.pathname.startsWith(data.route));

  const isStartupRoute = router.pathname.startsWith('/startup');
  const isFdiRoute = router.pathname.startsWith('/foreign-direct-investment')
  const isGTRoute = router.pathname.startsWith('/global-trade')
  const isDERoute = router.pathname.startsWith('/digital-economy')
  const isFCRoute = router.pathname.startsWith('/future-cities')
  const isGMRoute = router.pathname.startsWith('/global-manufacturing')
  const isFFRoute = router.pathname.startsWith('/future-finance')

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {

      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchToggle(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        targetUrl = "https://fdi.aimcongress.com/agenda?portfolio=foreign-direct-investment";
        break;
      case "trade.aimcongress.com":
        targetUrl = "https://trade.aimcongress.com/agenda?portfolio=global-trade";
        break;
      case "manufacturing.aimcongress.com":
        targetUrl = "https://manufacturing.aimcongress.com/agenda?portfolio=global-manufacturing";
        break;
      case "futurecities.aimcongress.com":
        targetUrl = "https://futurecities.aimcongress.com/agenda?portfolio=future-cities";
        break;
      case "digitaleconomy.aimcongress.com":
        targetUrl = "https://digitaleconomy.aimcongress.com/agenda?portfolio=digital-economy";
        break;
      case "futurefinance.aimcongress.com":
        targetUrl = "https://futurefinance.aimcongress.com/agenda?portfolio=future-finance";
        break;
      case "startup.aimcongress.com":
        targetUrl = "https://startup.aimcongress.com/agenda?portfolio=Startups-Unicorns";
        break;
      case "entrepreneurs.aimcongress.com":
        targetUrl = "https://entrepreneurs.aimcongress.com/agenda?portfolio=entrepreneurs";
        break;
      default:

        targetUrl = "https://www.aimcongress.com/agenda";
        break;
    }


    window.location.href = targetUrl;
  }

  return (
    <nav className={`menu-wrapper  ${isStartupRoute ? 'portfolio-solid-menu' : ''}  ${!isVisible ? 'translate-y' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="top-items-container d-flex justify-content-between align-items-center mb-1  mt-1">

              <div className='d-flex align-items-end gap-3'>
                <Link href={`${Globals.BASE_URL}`} className="logo-wrapper pt-3">
                  <img src={`/assets/imgs/AIM-logo.png`} alt="Logo"
                    className='menu-logo white-logo' />

                </Link>

                {currentRouteData && (
                  <Link href={currentRouteData.route} className="logo-wrapper d-flex flex-column align-items-center gap-3">
                    <img src={currentRouteData.logo} alt="Logo" className='nav-bar-portfoio-logo' />
                    <span className='portfolio-logo-name'>{currentRouteData.name}</span>
                  </Link>
                )}

              </div>
              <div className="d-flex gap-5 align-items-center  top-items">
                <div className='top-item pt-3'>
                  <img src="/assets/imgs/Ministry logos.png" alt="aimcongress 2025" className='ministry-logo' />
                </div>
                {/* <div className='top-item'><span style={{ textDecoration: "underline" }}>LOGIN</span></div> */}
                {/* <div className='top-item'><CiGlobe size={20} /> <span>EN</span></div> */}

              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-end justify-content-between pb-3 pt-1">
          <div className='d-flex align-items-end gap-3'>



          </div>

          <div className="d-flex flex-column gap-4">
            <div ref={searchRef}>

              {isSearchToggle ? (
                <div className="row">
                  <div className="col-12">
                    <form onSubmit={handleSearchSubmit} className=" global-search-bar-lg">
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
                <ul className='menu-items'>
                  <li className='menu-item'>
                    <Link href="/about">
                      ABOUT AIM
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link href="/event-highlights" className='aim-2025'>
                      AIM 2025
                    </Link>
                  </li>

                  <li className='menu-item'>
                    <Link href="/awards" className='aim-2025'>
                      AIM AWARDS
                    </Link>
                  </li>
                  <li className='menu-item hover-menu-container' onMouseEnter={togglePortfolioDropdown} onMouseLeave={togglePortfolioDropdown}>
                    <span>PORTFOLIOS</span>

                    {isPortfolioDropdownOpen && (
                      <ul className="dropdown">

                        <li className="dropdown-item">

                          <Link href="https://fdi.aimcongress.com/foreign-direct-investment" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/fdi-logo.png" alt="fdi" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            <span>Foreign Direct Investment</span>
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="https://trade.aimcongress.com/global-trade" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/global-trade-logo.png" alt="globaltrade" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Global Trade
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://manufacturing.aimcongress.com/global-manufacturing" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/global-manufacturing.png" alt="" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Global Manufacturing
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://futurecities.aimcongress.com/future-cities" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/future-cities-logo.png" alt="futurecities" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Future Cities
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://digitaleconomy.aimcongress.com/digital-economy" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/digital-economy-logo.png" alt="" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Digital Economy
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://futurefinance.aimcongress.com/future-finance" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/futurefinance-logo.png" alt="futurefinance" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Future Finance
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://startup.aimcongress.com/startup" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/startup-logo.png" alt="startups-unicorns" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Startups & Unicorns
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="https://entrepreneurs.aimcongress.com/entrepreneurs" className='d-flex gap-3 align-items-center'>
                            <img src="/assets/logos/entrepreneurs-logo.png" alt="entrepreneurs" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                            Entrepreneurs
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className='menu-item agenda-link'>
                    <Link href="#" onClick={(e) => { e.preventDefault(); CheckAgenda(); }} className="agenda">
                      AGENDA
                    </Link>
                  </li>
                  <li className='menu-item hover-menu-container' onMouseEnter={toggleResourcesDropdown} onMouseLeave={toggleResourcesDropdown}>
                    <span>RESOURCES</span>
                    {isResourcesDropdownOpen && (
                      <ul className="dropdown">
                        {/* <li className="dropdown-item">
                    <li className="dropdown-item">
                      <Link href="https://entrepreneurs.aimcongress.com/entrepreneurs" className='d-flex gap-3 align-items-center'>
                        <img src="/assets/logos/entrepreneurs-logo.png" alt="entrepreneurs" style={{ width: "20px", objectFit: "contain" }} className='portfolio-menu-logo' />
                        Entrepreneurs
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className='menu-item agenda-link d-none'>
                <Link href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    CheckAgenda();
                  }}
                  className='agenda'>
                  AGENDA
                </Link>
              </li>
              <li className='menu-item hover-menu-container' onMouseEnter={toggleResourcesDropdown} onMouseLeave={toggleResourcesDropdown}>
                <span>RESOURCES</span>
                {isResourcesDropdownOpen && (
                  <ul className="dropdown">
                    {/* <li className="dropdown-item">
                      <Link href="/travel-partner">
                        Album
                      </Link>
                    </li> */}
                        <li className="dropdown-item">
                          <Link href="/brochure">
                            Brochure
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="/press-releases">
                            Press Release
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="/postshow-reports">
                            Post Show Reports
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="/articles">
                            Blogs
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="/media-partners">
                            Media Partners
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="/our-partners">
                            AIM Congress 2025 Partners
                          </Link>
                        </li>

                        <li className="dropdown-item">
                          <Link href="/partners-2024">
                            AIM Congress 2024 Partners
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className='menu-item hover-menu-container' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <span>LOGISTICS</span>
                    {isDropdownOpen && (
                      <ul className="dropdown">
                        <li className="dropdown-item">
                          <Link href="/hotels">
                            Hotels 2025
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="/travel-partner">
                            Travel Partner
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="/flight">
                            Official Airline Carrier
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link href="/stand-builder">
                            Official Contractor
                          </Link>
                        </li>


                      </ul>
                    )}
                  </li>

                </ul>
              )}
            </div>


          </div>

          <div className='d-lg-flex gap-2 align-items-center d-none'>

            <div>

              <div onClick={() => setIsSearchToggle(!isSearchToggle)}>
                {!isSearchToggle ? (
                  <CiSearch
                    color="white"
                    size={30}
                    cursor="pointer"

                  />
                ) : (
                  <div className='text-white d-flex flex-column'>
                    <IoMdClose
                      color="white"
                      size={20}
                      cursor="pointer" />

                  </div>
                )}

              </div>
            </div>
            <Link href={`/packages?portfolio=${currentRouteData?.linkName?.toLowerCase() ?? ''}&source=website`} className='menu-cta-wrapper'>

              <button className={`register-interest-cta `} style={{ background: `${currentRouteData ? currentRouteData.colorCode : ''}` }}>Register Now</button>
            </Link>

          </div>

          <motion.div
            className="menu-icon-wrapper d-lg-none d-flex gap-2"


          >

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
                <IoMdClose size={32} className='menu-icon' cursor="pointer" onClick={handleToggle} />
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
                <HiOutlineMenuAlt2 size={32} className='menu-icon' cursor="pointer" onClick={handleToggle} />
              </motion.div>
            )}
          </motion.div>

        </div>


      </div>

      {isStartupRoute && (
        <StartupMenuComponent />
      )}

      {isFdiRoute && (
        <FDIMenuComponent />
      )}

      {isGTRoute && (
        <GlobalTradeMenuComponent />
      )}

      {isDERoute && (
        <DEMenuComponent />
      )}

      {isFCRoute && (
        <FCMenuComponent />
      )}

      {isGMRoute && (
        <GMMenuComponent />
      )}

      {isFFRoute && (
        <FFMenuComponent />
      )}

      <AnimatePresence>
        {isToggle && (
          <motion.div
            className="mobile-menu-nav d-lg-none d-block"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <ul className='mobile-menu-items'>
              <li>
                <div className='d-flex justify-content-between px-4 py-3'>
                  <Link href="https://aimcongress.cn/" className="logo-wrapper">
                    <img src={`/assets/imgs/AIM-logo.png`} alt="Logo"
                      className='menu-logo white-logo' />

                  </Link>
                  <IoMdClose size={32} className='menu-icon' cursor="pointer" onClick={handleToggle} />
                </div>
              </li>

              <li className='mobile-menu-item'>
                <Link href="/about" onClick={handleToggle}>
                  ABOUT AIM
                </Link>
              </li>
              <li className='mobile-menu-item'>
                <Link href="/event-highlights" onClick={handleToggle}>
                  AIM 2025
                </Link>
              </li>

              <li className='mobile-menu-item'>
                <Link href="/awards" onClick={handleToggle}>
                  AIM AWARDS
                </Link>
              </li>
              <li className='mobile-menu-item' onClick={togglePortfolioDropdown}>
                <span className='d-flex align-items-center justify-content-between'>PORTFOLIOS  {!isPortfolioDropdownOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</span>
                {isPortfolioDropdownOpen && (
                  <ul className="mobile-dropdown">
                    <li className="dropdown-item">
                      <Link href="https://fdi.aimcongress.com/foreign-direct-investment" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/fdi-logo.png" alt="fdi" style={{ width: "20px", objectFit: "contain" }} />
                        Foreign Direct Investment
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="https://trade.aimcongress.com/global-trade" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/global-trade-logo.png" alt="globaltrade" style={{ width: "20px", objectFit: "contain" }} />
                        Global Trade
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="https://manufacturing.aimcongress.com/global-manufacturing" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/global-manufacturing.png" alt="" style={{ width: "20px", objectFit: "contain" }} />
                        Global Manufacturing
                      </Link>
                    </li>



                    <li className="dropdown-item">
                      <Link href="https://futurecities.aimcongress.com/future-cities" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/future-cities-logo.png" alt="futurecities" style={{ width: "20px", objectFit: "contain" }} />
                        Future Cities
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="https://futurefinance.aimcongress.com/digital-economy" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/digital-economy-logo.png" alt="" style={{ width: "20px", objectFit: "contain" }} />
                        Digital Economy
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="https://futurefinance.aimcongress.com/future-finance" onClick={handleToggle} className='d-flex gap-2 align-items-center'>
                        <img src="/assets/logos/futurefinance-logo.png" alt="futurefinance" style={{ width: "20px", objectFit: "contain" }} />
                        Future Finance
                      </Link>
                    </li>

                    <li className="dropdown-item"  >
                      <Link href="https://startup.aimcongress.com/" className='d-flex gap-2 align-items-center' onClick={handleToggle} >
                        <img src="/assets/logos/startup-logo.png" alt="startups-unicorns" style={{ width: "20px", objectFit: "contain" }} />
                        Startups & Unicorns
                      </Link>
                    </li>

                    <li className="dropdown-item" onClick={handleToggle} >
                      <Link href="https://entrepreneurs.aimcongress.com/entrepreneurs" className='d-flex gap-2 align-items-center' onClick={handleToggle} >
                        <img src="/assets/logos/entrepreneurs-logo.png" alt="entrepreneurs" style={{ width: "20px", objectFit: "contain" }} />
                        Entrepreneurs
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className='mobile-menu-item'>
                <Link href="#" onClick={(e) => { e.preventDefault(); CheckAgenda(); }} className="agenda">
                  AGENDA
                </Link>
              </li>
              <li className='mobile-menu-item' onClick={toggleResourcesDropdown}>
                <span className='d-flex align-items-center justify-content-between'>RESOURCES  {!isResourcesDropdownOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</span>
                {isResourcesDropdownOpen && (
                  <ul className="mobile-dropdown">
                    <li className="dropdown-item">
                      <Link href="/brochure" onClick={handleToggle}>
                        Brochure
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/press-releases" onClick={handleToggle}>
                        Press Release
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/postshow-reports" onClick={handleToggle}>
                        Post Show Reports
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/articles" onClick={handleToggle}>
                        Blogs
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/media-partners" onClick={handleToggle}>
                        Media Partners
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/our-partners" onClick={handleToggle}>
                        AIM Congress 2025 Partners
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link href="/partners-2024" onClick={handleToggle}>
                        AIM Congress 2024 Partners
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className='mobile-menu-item' onClick={toggleDropdown}>
                <span className='d-flex align-items-center justify-content-between'>LOGISTICS  {!isDropdownOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</span>
                {isDropdownOpen && (
                  <ul className="mobile-dropdown">
                    <li className="dropdown-item">
                      <Link href="/hotels" onClick={handleToggle}>
                        Hotels 2025
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/travel-partner" onClick={handleToggle}>
                        Travel Partner
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/flight" onClick={handleToggle}>
                        Official Airline Carrier
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/stand-builder" onClick={handleToggle}>
                        Official Contractor
                      </Link>
                    </li>




                  </ul>
                )}
              </li>

              <li className='mobile-menu-item'>

                <Link href="/contact-us" onClick={handleToggle}>
                  <div className='menu-cta-wrapper w-100'>
                    <button className='register-interest-cta'>Contact Us</button>
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
