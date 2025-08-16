// src/components/ClientTestimonialsSection.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

interface ClientTestimonialsSectionProps {
  sectionTitle: string;
  sectionDescription: string;
}

const ClientTestimonialsSection: React.FC<ClientTestimonialsSectionProps> = ({
  sectionTitle,
  sectionDescription,
}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Hardcoded testimonials data
  const hardcodedTestimonials = [
    {
      name: currentLanguage === "en" ? "Mohammed Saif" : "محمد سيف",
      position: currentLanguage === "en" ? "Director" : "مدير",
      company: currentLanguage === "en" ? "Company A" : "الشركة أ",
      testimonial:
        currentLanguage === "en"
          ? "Working with them was an incredible part of Al Dar in marketing I received my car from the first time I went to see it. They follow up consistently and clearly explained all the rules and they agreed on a price for trade."
          : "التعامل معهم كان جزءاً لا يصدق من رحلة التسويق في الدار. استلمت سيارتي من أول زيارة، ويتابعون بانتظام ويوضحون كل القواعد بوضوح، ووافقوا على سعر للتبادل.",
      image: "https://placehold.co/150x150/0A0A0A/FFFFFF?text=Client+1",
      logo: "https://placehold.co/300x300/4A2A1A/FFFFFF?text=Logo+A",
    },
    {
      name: currentLanguage === "en" ? "Jane Doe" : "جين دو",
      position: currentLanguage === "en" ? "Founder, TechNova" : "مؤسس، تكنوفا",
      company: currentLanguage === "en" ? "TechNova" : "تكنوفا",
      testimonial:
        currentLanguage === "en"
          ? "Their guidance was a game-changer. We're now confident our website is fully compliant and secure."
          : "توجيهاتهم كانت نقطة تحول. نحن الآن واثقون من أن موقعنا متوافق وآمن بالكامل.",
      image: "https://placehold.co/150x150/0A0A0A/FFFFFF?text=Client+2",
      logo: "https://placehold.co/300x300/4A2A1A/FFFFFF?text=Logo+B",
    },
    {
      name: currentLanguage === "en" ? "John Smith" : "جون سميث",
      position: currentLanguage === "en" ? "CEO" : "الرئيس التنفيذي",
      company: currentLanguage === "en" ? "Global Corp" : "جلوبال كورب",
      testimonial:
        currentLanguage === "en"
          ? "Professional, efficient, and truly knowledgeable about the legal aspects of online business, a seamless experience."
          : "محترفون، فعالون، ولديهم معرفة حقيقية بالجوانب القانونية للأعمال التجارية عبر الإنترنت، تجربة سلسة.",
      image: "https://placehold.co/150x150/0A0A0A/FFFFFF?text=Client+3",
      logo: "https://placehold.co/300x300/4A2A1A/FFFFFF?text=Logo+C",
    },
  ];

  const displayedTestimonial = hardcodedTestimonials[currentTestimonialIndex];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev + 1) % hardcodedTestimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) =>
        (prev - 1 + hardcodedTestimonials.length) % hardcodedTestimonials.length
    );
  };

  return (
    <section className="py-16 bg-brown-testimonials-bg text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title */}
        <div className={`text-center mb-12`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Client Info and Quote */}
          <div
            className={`space-y-6 ${
              isRTL ? "lg:order-last" : "lg:order-first"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
              <p className="text-lg mb-6 leading-relaxed">
                "{displayedTestimonial.testimonial}"
              </p>
              <div
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 bg-brown-accent rounded-full flex items-center justify-center overflow-hidden mr-4 ${
                    isRTL ? "ml-4 mr-0" : ""
                  }`}
                >
                  <img
                    src={displayedTestimonial.image}
                    alt={displayedTestimonial.name || "Client Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {displayedTestimonial.name}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {displayedTestimonial.position}
                    {displayedTestimonial.company &&
                      `, ${displayedTestimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder/Visual Element (e.g., a large Client Logo) */}
          <div
            className={`flex items-center justify-center ${
              isRTL ? "lg:justify-start" : "lg:justify-end"
            }`}
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 bg-white/20 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
              <img
                src={displayedTestimonial.logo}
                alt={displayedTestimonial.name || "Client Logo"}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          {hardcodedTestimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
                  isRTL ? "translate-x-4" : "-translate-x-4"
                } bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-30`}
                aria-label="Previous Testimonial"
              >
                <ChevronDown
                  className={`w-6 h-6 text-brown-primary transform ${
                    isRTL ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </button>

              <button
                onClick={nextTestimonial}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                  isRTL ? "-translate-x-4" : "translate-x-4"
                } bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-30`}
                aria-label="Next Testimonial"
              >
                <ChevronDown
                  className={`w-6 h-6 text-brown-primary transform ${
                    isRTL ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonialsSection;
