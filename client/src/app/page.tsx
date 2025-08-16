// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TeamSection from "../components/TeamSection";
import ClientTestimonialsSection from "../components/ClientTestimonialsSection";
import Footer from "../components/Footer"; // Import the new Footer component
import { fetchStrapiData } from "../lib/strapi"; // getStrapiMediaUrl removed
import { HomePageAttributes, StrapiSingleResponse } from "../types/strapi";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

const HomePage: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const [homePageData, setHomePageData] = useState<HomePageAttributes | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // const handlePageNavigation = (path: string) => {
  //   window.history.pushState({}, "", path);
  //   window.dispatchEvent(new Event("popstate"));
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetching HomePage data (no populate for images)
        const response = await fetchStrapiData<
          StrapiSingleResponse<HomePageAttributes>
        >("/home-page", currentLanguage);
        if (response?.data) {
          setHomePageData(response.data.attributes);
        } else {
          setError("Home page data not found in Strapi.");
        }
      } catch (err: any) {
        console.error("Failed to fetch home page data:", err);
        setError(err.message || "Failed to load home page content.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage]);

  // Hardcoded image URLs for the hero section
  const hardcodedBackgroundImage =
    "https://placehold.co/1920x1080/0A0A0A/FFFFFF?text=Hero+Background"; // Example city/highway scene
  const hardcodedPersonImage =
    "https://placehold.co/400x500/4A2A1A/FFFFFF?text=Hero+Person"; // Example person image

  // Hero Slider Logic (using hardcoded images and static content for now)
  const heroSlides = homePageData
    ? [
        {
          id: 1,
          title: homePageData.HeroTitle,
          description: homePageData.HeroDescription,
          backgroundImageSrc: hardcodedBackgroundImage,
          personImageSrc: hardcodedPersonImage,
          personImageAlt: "Hero Person Image", // Hardcoded alt text for now
          videoUrl: homePageData.HeroVideoUrl, // Still checks for video URL from Strapi if present
          ctaText: isRTL ? "اقرأ المزيد" : "Read More",
        },
      ]
    : [];

  const currentHeroSlide = heroSlides[currentSlide];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <p className="text-xl">Loading home page content...</p>
      </div>
    );
  }

  if (error || !homePageData) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 flex-col p-8">
        <p className="text-xl font-bold">
          Error: {error || "Could not load home page data."}
        </p>
        <p className="text-lg mt-2 text-center"></p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative`}>
      <Header />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {currentHeroSlide.videoUrl ? (
            <video
              className="w-full h-full object-cover"
              src={currentHeroSlide.videoUrl}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={currentHeroSlide.backgroundImageSrc}
              alt={currentHeroSlide.backgroundImageSrc || "Hero Background"}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-brown-light opacity-20"></div>
        </div>

        {heroSlides.length > 1 && (
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
              )
            }
            className={`absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-brown-accent transition-colors text-4xl p-2 rounded-full bg-black/30 hover:bg-black/50 ${
              isRTL ? "rtl-flip-arrow" : ""
            }`}
            aria-label="Previous Slide"
          >
            &larr;
          </button>
        )}

        <div
          className={`relative z-10 text-white flex flex-col md:flex-row items-center justify-center p-8 max-w-7xl mx-auto w-full ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex-1 ${
              isRTL ? "md:ml-16 text-right-rtl" : "md:mr-16 text-left"
            } mb-8 md:mb-0`}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {currentHeroSlide.title}
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl opacity-90">
              {currentHeroSlide.description}
            </p>
            <button className="bg-white text-brown-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
              {currentHeroSlide.ctaText}
            </button>
          </div>

          <div
            className={`flex-1 flex ${
              isRTL ? "justify-start" : "justify-end"
            } items-center h-full`}
          >
            <div
              className="relative w-72 h-96 lg:w-80 lg:h-[420px] rounded-lg shadow-2xl overflow-hidden"
              style={{ backgroundColor: "var(--color-brown-testimonials-bg)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={currentHeroSlide.personImageSrc}
                  alt={currentHeroSlide.personImageAlt}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ transform: "scale(1.05)" }}
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </div>

        {heroSlides.length > 1 && (
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {heroSlides.length > 1 && (
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
            }
            className={`absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-brown-accent transition-colors text-4xl p-2 rounded-full bg-black/30 hover:bg-black/50 ${
              isRTL ? "rtl-flip-arrow" : ""
            }`}
            aria-label="Next Slide"
          >
            &rarr;
          </button>
        )}
      </section>
      <TeamSection
        sectionTitle={homePageData.OurTeam}
        sectionDescription={homePageData.OurTeamDes}
      />
      <ClientTestimonialsSection
        sectionTitle={homePageData.TestimonialTitle}
        sectionDescription={homePageData.TestimonialDes}
      />
      <Footer /> {/* Integrate the Footer component here */}
    </div>
  );
};

export default HomePage;
