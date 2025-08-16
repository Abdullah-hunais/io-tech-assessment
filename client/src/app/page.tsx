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
  const [currentSlide, setCurrentSlide] = useState(0); // For the Hero Slider (if multiple slides were implemented)

  // This function is for simulating page navigation, currently not directly used
  // but kept for future use if routing is implemented.
  const handlePageNavigation = (path: string) => {
    // In a real Next.js app, you'd use `router.push(path)`
    // For this sandbox, we'll manually change the URL and rely on component re-render
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
          ["HeroBackgroundImage", "HeroPersonImage"] // Explicitly populate image and video fields
        );

        if (response?.data) {
          setHomePageData(response.data.attributes);
        } else {
          // If response.data is null, it means no data was found or an empty response
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
  }, [currentLanguage]); // Re-fetch data when language changes

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
  const defaultHeroVideoUrl = null; // No default video URL

  // If data is loading or an error occurred, use hardcoded defaults
  const currentHomePageData = homePageData || {
    HeroTitle: defaultHeroTitle,
    HeroDescription: defaultHeroDescription,
    OurTeam: defaultOurTeamTitle,
    OurTeamDes: defaultOurTeamDes,
    TestimonialTitle: defaultTestimonialTitle,
    TestimonialDes: defaultTestimonialDes,
    HeroVideoUrl: defaultHeroVideoUrl,
  };

  const hardcodedBackgroundImage =
    "https://placehold.co/1920x1080/0A0A0A/FFFFFF?text=Hero+Background";
  const hardcodedPersonImage =
    "https://placehold.co/400x500/4A2A1A/FFFFFF?text=Hero+Person";

  // Hero Slider Logic - now uses potentially fetched data for images/video
  const heroSlides = [
    {
      id: 1,
      title: currentHomePageData.HeroTitle,
      description: currentHomePageData.HeroDescription,
      backgroundImage: currentHomePageData.HeroBackgroundImage, // Now uses fetched data
      personImage: currentHomePageData.HeroPersonImage, // Now uses fetched data
      videoUrl: currentHomePageData.HeroVideoUrl,
      ctaText: isRTL ? "اقرأ المزيد" : "Read More",
    },
  ];

  const currentHeroSlide = heroSlides[currentSlide];

  // Render loading state if still loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <p className="text-xl">Loading home page content...</p>
      </div>
    );
  }

  // Render error state if fetching failed and data is not available
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

  // Get image URLs, using getStrapiMediaUrl or hardcoded fallbacks
  const backgroundImageSrc =
    getStrapiMediaUrl(
      currentHeroSlide.backgroundImage,
      1920,
      1080,
      "Hero Background"
    ) || hardcodedBackgroundImage;
  const personImageSrc =
    getStrapiMediaUrl(
      currentHeroSlide.personImage,
      400,
      500,
      currentHeroSlide.personImage?.alternativeText || "Hero Person"
    ) || hardcodedPersonImage;

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
              src={backgroundImageSrc}
              alt={
                currentHeroSlide.backgroundImage?.alternativeText ||
                "Hero Background"
              }
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-brown-light opacity-20"></div>
        </div>

        {/* Removed slider navigation conditional rendering for simplicity as we are not using multiple slides for now */}

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
                  src={personImageSrc}
                  alt={
                    currentHeroSlide.personImage?.alternativeText ||
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

      <Footer />
    </div>
  );
};

export default HomePage;
