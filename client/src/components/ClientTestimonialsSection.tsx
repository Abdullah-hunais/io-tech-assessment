// src/components/ClientTestimonialsSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import { fetchStrapiData, getStrapiMediaUrl } from "../lib/strapi";

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
  const [loading, setLoading] = useState(false);
  const [testimonialsData, setTestimonialsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching HomePage data from Strapi with image population
        const response = await fetchStrapiData<any>(
          "/client-testimonials",
          currentLanguage,
          ["ClientImage"]
        );

        if (response?.data) {
          setTestimonialsData(response.data);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Failed to fetch home page data:", err);
      }
    };

    fetchData();
  }, [currentLanguage]); // Re-fetch data when language changes

  if (loading || !testimonialsData) {
    return <></>;
  }

  // Hardcoded testimonials data

  const displayedTestimonial = testimonialsData[currentTestimonialIndex];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  return (
    <section className="py-20 bg-[var(--color-primary-brown)] text-[var(--foreground)]">
      {/* Centered container for the whole content */}
      <div className="mx-auto max-w-5xl px-6 lg:px-16 flex flex-col gap-12">
        {/* Left: Title + Description */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-3xl lg:text-4xl font-bold">{sectionTitle}</h2>
          <p className="text-white/80 text-base lg:text-lg leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Main content: Image + Quote */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Column: Image */}
          <div className="flex-shrink-0">
            <div className="w-56 h-56 rounded-md overflow-hidden shadow-lg">
              <img
                src={getStrapiMediaUrl(
                  displayedTestimonial.ClientImage,
                  1920,
                  1080,
                  "Member Image"
                )}
                alt={displayedTestimonial.ClientName || "Client"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Quote + Client */}
          <div className="flex flex-col justify-center max-w-2xl text-left">
            <p className="text-lg leading-relaxed mb-6">
              "{displayedTestimonial.Quote}"
            </p>
            <h4 className="font-bold text-lg">
              {displayedTestimonial.ClientName}
            </h4>
            <p className="text-white/70 text-sm">
              {displayedTestimonial.ClientRole}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        {testimonialsData.length > 1 && (
          <div className="flex justify-end gap-4">
            <button
              onClick={prevTestimonial}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronDown className="w-5 h-5 text-white transform rotate-90" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronDown className="w-5 h-5 text-primary-brown transform -rotate-90" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientTestimonialsSection;
