// src/components/TeamSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Phone, Mail, MessageCircle, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import { fetchStrapiData, getStrapiMediaUrl } from "../lib/strapi";

interface TeamSectionProps {
  sectionTitle: string;
  sectionDescription: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  sectionTitle,
  sectionDescription,
}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [teamMembersData, setTeamMembersData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching HomePage data from Strapi with image population
        const response = await fetchStrapiData<any>(
          "/team-members",
          currentLanguage,
          ["Image"]
        );

        if (response?.data) {
          setTeamMembersData(response.data);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Failed to fetch home page data:", err);
      }
    };

    fetchData();
  }, [currentLanguage]); // Re-fetch data when language changes

  if (loading || !teamMembersData) {
    return <></>;
  }

  const membersPerSlide = 3;
  const totalSlides = teamMembersData.length;

  const displayedMembers = teamMembersData;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title */}
        <div className={`text-center mb-12`}>
          <h2 className="text-3xl lg:text-4xl font-bold [color:var(--color-brown-dark)] mb-4">
            {sectionTitle}
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>
        {/* Team Members Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMembers.map((member: any, index: number) => (
              <div
                key={member.Name + index}
                className="text-center group p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg w-full h-80 bg-brown-light flex items-center justify-center">
                  <img
                    src={getStrapiMediaUrl(
                      member.Image,
                      1920,
                      1080,
                      "Member Image"
                    )}
                    alt={member.Name || "Team Member"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold [color:var(--color-brown-dark)] text-brown-primary mb-2">
                  {member.Name}
                </h3>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
                  {member.Role}
                </p>

                {/* Social Links */}
                {
                  <div
                    className={`flex justify-center space-x-4 ${
                      isRTL ? "rtl:space-x-reverse" : ""
                    }`}
                  >
                    {member.Whatsapp && (
                      <a
                        href={`https://wa.me/971555555`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-green-500 transition-colors"
                        aria-label={`WhatsApp ${member.Name}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    {member.Phone && (
                      <a
                        href={`tel:971555555`}
                        className="text-gray-400 hover:text-brown-accent transition-colors"
                        aria-label={`Call ${member.Name}`}
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                    {member.Email && (
                      <a
                        href={`mailto:lawyer@gmail`}
                        className="text-gray-400 hover:text-brown-accent transition-colors"
                        aria-label={`Email ${member.Name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                }
              </div>
            ))}
          </div>

          {/* Navigation Arrows  */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
                  isRTL ? "translate-x-12" : "-translate-x-12"
                } bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-30`}
                aria-label="Previous Team Member Slide"
              >
                <ChevronDown
                  className={`w-6 h-6 text-brown-primary transform ${
                    isRTL ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </button>

              <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                  isRTL ? "-translate-x-12" : "translate-x-12"
                } bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-30`}
                aria-label="Next Team Member Slide"
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
        */
      </div>
    </section>
  );
};

export default TeamSection;
