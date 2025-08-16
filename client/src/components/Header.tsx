// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/redux/store";
import { setLanguage } from "../lib/redux/languageSlice";
import { setSearchQuery } from "../lib/redux/searchSlice";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Hardcoded text translations for Header
  const headerTranslations = {
    en: {
      home: "Home",
      about: "About us",
      services: "Services",
      blog: "Blog",
      team: "Our Team",
      contact: "Contact us",
      bookAppointment: "Book Appointment",
      searchPlaceholder: "Search...",
    },
    ar: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      blog: "المدونة",
      team: "فريقنا",
      contact: "اتصل بنا",
      bookAppointment: "احجز موعداً",
      searchPlaceholder: "ابحث...",
    },
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = headerTranslations[currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  // Hardcoded services for the dropdown
  const hardcodedServices = [
    {
      title: "Legal Consultation Services",
      slug: "legal-consultation-services",
    },
    {
      title: "Foreign Investment Services",
      slug: "foreign-investment-services",
    },
    { title: "Contracts", slug: "contracts" },
    { title: "Notarization", slug: "notarization" },
    { title: "Insurance", slug: "insurance" },
  ];

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    dispatch(setLanguage(newLanguage));
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      //   window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setIsSearchOverlayOpen(false);
      dispatch(setSearchQuery(""));
    }
  };

  // Hardcoded logo path
  const staticLogoPath = "/logo.png"; // Make sure logo.png is in your public/ directory

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about-us" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.team"), href: "/team" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4 md:py-6">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Manually added */}
          <div className="flex-shrink-0">
            <img
              src={staticLogoPath}
              alt="Your Website Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-brown-accent transition-colors"
              >
                {item.name}
              </a>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="text-white hover:text-brown-accent transition-colors flex items-center group"
              >
                {t("nav.services")}{" "}
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full mt-2 bg-brown-light rounded-lg shadow-lg min-w-[200px] py-2 z-50">
                  {hardcodedServices.length > 0 ? (
                    hardcodedServices.map((service) => (
                      <a
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block px-4 py-2 text-white hover:bg-brown-dark transition-colors"
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        {service.title}
                      </a>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-white/70">
                      No services found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Search, Language, CTA, Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOverlayOpen(!isSearchOverlayOpen)}
              className="text-white hover:text-brown-accent transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-brown-accent transition-colors text-sm font-medium border border-white rounded px-2 py-1"
              aria-label={`Switch to ${
                currentLanguage === "en" ? "Arabic" : "English"
              }`}
            >
              {currentLanguage === "en" ? "AR" : "EN"}
            </button>

            {/* Book Appointment Button (Desktop Only) */}
            <button className="hidden lg:block bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-brown-primary transition-colors">
              {t("nav.bookAppointment")}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
              aria-label="Toggle Mobile Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOverlayOpen && (
          <div className="mt-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-white/20 text-white placeholder-white/70 border-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-accent"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-brown-dark rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white hover:text-brown-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Services Dropdown in Mobile */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                  className="w-full text-left text-white hover:text-brown-accent transition-colors flex items-center justify-between pr-4"
                >
                  {t("nav.services")}{" "}
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {isServicesDropdownOpen && (
                  <div className="mt-2 bg-brown-light rounded-lg shadow-inner py-2">
                    {hardcodedServices.length > 0 ? (
                      hardcodedServices.map((service) => (
                        <a
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block px-4 py-2 text-white hover:bg-brown-dark transition-colors text-sm"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsServicesDropdownOpen(false);
                          }}
                        >
                          {service.title}
                        </a>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-white/70 text-sm">
                        No services found.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button className="w-full bg-white text-brown-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                {t("nav.bookAppointment")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
