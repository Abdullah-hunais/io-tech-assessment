// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react"; // Re-import useState, useEffect
import Header from "../components/Header";
import TeamSection from "../components/TeamSection";
import ClientTestimonialsSection from "../components/ClientTestimonialsSection";
import Footer from "../components/Footer";
import { fetchStrapiData, getStrapiMediaUrl } from "../lib/strapi"; // Re-import Strapi functions
import { HomePageAttributes, StrapiSingleResponse } from "../types/strapi"; // Re-import Strapi types

import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import "./globals.css";

const HomePage: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const [homePageData, setHomePageData] = useState<HomePageAttributes | null>(
    null
  ); // Re-add homePageData state
  const [loading, setLoading] = useState(true); // Re-add loading state
  const [error, setError] = useState<string | null>(null); // Re-add error state
  const [currentSlide, setCurrentSlide] = useState(0); // For the Hero background slider

  // This function is for simulating page navigation, currently not directly used
  const handlePageNavigation = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // Fetching HomePage data from Strapi with image population
        const response = await fetchStrapiData<
          StrapiSingleResponse<HomePageAttributes>
        >(
          "/home-page",
          currentLanguage,
          ["HeroBackgroundImage", "HeroPersonImage"] // Populate multiple background images
        );

        if (response?.data) {
          setHomePageData(response.data);
        } else {
          setError(
            "Home page data not found in Strapi. Please ensure content is published."
          );
        }
      } catch (err: any) {
        console.error("Failed to fetch home page data:", err);
        setError(
          `Failed to load home page content: ${err.message || "Unknown error."}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage]);

  // Auto-slide background images every 5 seconds
  useEffect(() => {
    if (loading || !homePageData) {
      return;
    }
    if (homePageData!.HeroBackgroundImage!.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % homePageData!.HeroBackgroundImage!.length
        );
      }, 5000); // change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [homePageData]);

  if (loading || !homePageData) {
    return <></>;
  }

  // Use hardcoded placeholder values as defaults while loading or if an error occurs
  const defaultHeroTitle =
    currentLanguage === "en"
      ? "Empowering Your Vision Through Law"
      : "تمكين رؤيتك من خلال القانون";
  const defaultHeroDescription =
    currentLanguage === "en"
      ? "We provide expert legal consultation for building websites, ensuring your online presence is fully compliant and legally sound. Our seasoned attorneys specialize in digital law, data privacy, and intellectual property."
      : "نقدم استشارات قانونية متخصصة لإنشاء المواقع الإلكترونية، مما يضمن أن وجودك على الإنترنت متوافق تمامًا وسليم قانونيًا. يتخصص محامونا المتمرسون في القانون الرقمي، وخصوصية البيانات، والملكية الفكرية.";
  const defaultOurTeamTitle =
    currentLanguage === "en"
      ? "Meet Our Expert Team"
      : "تعرف على فريق الخبراء لدينا";
  const defaultOurTeamDes =
    currentLanguage === "en"
      ? "Our team is a unique blend of legal experts and digital enthusiasts. We combine our deep knowledge of internet law and data privacy with a practical understanding of how websites are built and operated. We're dedicated to helping you navigate the legal landscape of the web so you can launch and grow your business with complete confidence."
      : "فريقنا هو مزيج فريد من الخبراء القانونيين والمتحمسين للرقمنة. نحن نجمع معرفتنا العميقة بقانون الإنترنت وخصوصية البيانات مع فهم عملي لكيفية بناء وتشغيل المواقع الإلكترونية. نحن ملتزمون بمساعدتك على اجتياز المشهد القانوني للويب حتى تتمكن من إطلاق وتنمية عملك بثقة تامة.";
  const defaultTestimonialTitle =
    currentLanguage === "en"
      ? "What Our Clients Are Saying"
      : "ماذا يقول عملاؤنا";
  const defaultTestimonialDes =
    currentLanguage === "en"
      ? "Our clients range from individual investors, to local, international as well as fortune 500 companies. Their success stories speak volumes about our commitment to excellence."
      : "عملاؤنا يتراوحون من المستثمرين الأفراد إلى الشركات المحلية والعالمية، وكذلك شركات فورتشن 500. قصص نجاحهم تتحدث عن التزامنا بالتميز.";
  const defaultHeroVideoUrl = null;

  const currentHomePageData = homePageData || {
    HeroTitle: defaultHeroTitle,
    HeroDescription: defaultHeroDescription,
    OurTeam: defaultOurTeamTitle,
    OurTeamDes: defaultOurTeamDes,
    TestimonialTitle: defaultTestimonialTitle,
    TestimonialDes: defaultTestimonialDes,
    HeroVideoUrl: defaultHeroVideoUrl,
  };

  const hardcodedPersonImage =
    "https://placehold.co/400x500/4A2A1A/FFFFFF?text=Hero+Person";

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <p className="text-xl">Loading home page content...</p>
      </div>
    );
  }

  // Render error state
  if (error && !homePageData) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 flex-col p-8">
        <p className="text-xl font-bold">Error: {error}</p>
        <p className="text-lg mt-2 text-center">
          Please ensure your Strapi server is running, the `HomePage` Single
          Type is populated and published for locale '{currentLanguage}', and
          public `find` permissions are granted.
        </p>
      </div>
    );
  }

  // Get current background image from slider
  const backgroundImageSrc =
    getStrapiMediaUrl(
      homePageData?.HeroBackgroundImage?.[currentSlide],
      1920,
      1080,
      homePageData?.HeroBackgroundImage?.[currentSlide]?.alternativeText ||
        "Hero Background"
    ) || "";

  const personImageSrc =
    getStrapiMediaUrl(
      currentHomePageData.HeroPersonImage,
      400,
      500,
      currentHomePageData.HeroPersonImage?.alternativeText || "Hero Person"
    ) || hardcodedPersonImage;

  return (
    <div className={`min-h-screen relative`}>
      <Header />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {currentHomePageData.HeroVideoUrl ? (
            <video
              className="w-full h-full object-cover"
              src={currentHomePageData.HeroVideoUrl}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={backgroundImageSrc}
              alt="Hero Background"
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-brown-light opacity-20"></div>
        </div>

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
              {currentHomePageData.HeroTitle}
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl opacity-90">
              {currentHomePageData.HeroDescription}
            </p>
            <button className="bg-white text-[var(--color-brown-dark)] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
              {isRTL ? "اقرأ المزيد" : "Read More"}
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
                  src={personImageSrc}
                  alt={
                    currentHomePageData.HeroPersonImage?.alternativeText ||
                    "Hero Person Image"
                  }
                  className="w-full h-full object-cover rounded-lg"
                  style={{ transform: "scale(1.05)" }}
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection
        sectionTitle={currentHomePageData.OurTeam}
        sectionDescription={currentHomePageData.OurTeamDes}
      />
      <ClientTestimonialsSection
        sectionTitle={currentHomePageData.TestimonialTitle}
        sectionDescription={currentHomePageData.TestimonialDes}
      />
      <div className="h-5 bg-white"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
