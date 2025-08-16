// src/components/TeamSection.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, Phone, Mail, MessageCircle, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

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

  // Hardcoded team members data
  const hardcodedTeamMembers = [
    {
      name: currentLanguage === "en" ? "Mohammed Saif" : "محمد سيف",
      role: currentLanguage === "en" ? "Senior Lawyer" : "محامي أول",
      image: "https://placehold.co/300x300/0A0A0A/FFFFFF?text=Member+1",
      phone: "+1234567890",
      email: "member1@example.com",
      whatsapp: "1234567890",
    },
    {
      name: currentLanguage === "en" ? "Anna Lee" : "آنا لي",
      role: currentLanguage === "en" ? "Associate Lawyer" : "محامي مساعد",
      image: "https://placehold.co/300x300/0A0A0A/FFFFFF?text=Member+2",
      phone: "+1234567891",
      email: "member2@example.com",
      whatsapp: "1234567891",
    },
    {
      name: currentLanguage === "en" ? "David Chen" : "ديفيد تشن",
      role: currentLanguage === "en" ? "Legal Advisor" : "مستشار قانوني",
      image: "https://placehold.co/300x300/0A0A0A/FFFFFF?text=Member+3",
      phone: "+1234567892",
      email: "member3@example.com",
      whatsapp: "1234567892",
    },
    {
      name: currentLanguage === "en" ? "Sarah Ahmed" : "سارة أحمد",
      role: currentLanguage === "en" ? "Paralegal" : "مساعد قانوني",
      image: "https://placehold.co/300x300/0A0A0A/FFFFFF?text=Member+4",
      phone: "+1234567893",
      email: "member4@example.com",
      whatsapp: "1234567893",
    },
  ];

  const membersPerSlide = 3;
  const totalSlides = 5;
  // const totalSlides = Math.ceil(hardcodedTeamMembers.length / membersPerSlide);

  const displayedMembers = hardcodedTeamMembers.slice(
    currentSlideIndex * membersPerSlide,
    (currentSlideIndex + 1) * membersPerSlide
  );

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
          <h2 className="text-3xl lg:text-4xl font-bold text-brown-primary mb-4">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Team Members Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMembers.map((member, index) => (
              <div
                key={member.name + index}
                className="text-center group p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg w-full h-80 bg-brown-light flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name || "Team Member"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold text-brown-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
                  {member.role}
                </p>

                {/* Social Links */}
                <div
                  className={`flex justify-center space-x-4 ${
                    isRTL ? "rtl:space-x-reverse" : ""
                  }`}
                >
                  {member.whatsapp && (
                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                      aria-label={`WhatsApp ${member.name}`}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="text-gray-400 hover:text-brown-accent transition-colors"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-brown-accent transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Only show if there are multiple slides) */}
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
      </div>
    </section>
  );
};

export default TeamSection;
