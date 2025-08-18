// src/app/services/[slug]/page.tsx
"use client";

import React from "react"; // Removed unused useState, useEffect
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ChevronLeft } from "lucide-react"; // For the back button icon

import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

// Define the structure for a hardcoded service detail
interface HardcodedServiceDetail {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  sections: Array<{
    heading: { en: string; ar: string };
    content: { en: string; ar: string };
    listItems?: Array<{ en: string; ar: string }>;
  }>;
  conclusion: { en: string; ar: string }; // Added for the concluding paragraph
}

const ServiceDetailPage: React.FC<{ params: { slug: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const { slug } = params;

  // Hardcoded content for different services
  const serviceContent: { [key: string]: HardcodedServiceDetail } = {
    "legal-consultation-services": {
      title: {
        en: "Legal Consultation Services",
        ar: "خدمات الاستشارات القانونية",
      },
      description: {
        en: "Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients' needs and offer the best legal solutions in various cases and legal fields, we provide legal consultations services as a follow:",
        ar: "مكتب المحاماة هو أحد المكاتب القانونية الرائدة التي تقدم خدمات استشارية استثنائية للأفراد والشركات على حد سواء. مهمتنا هي تقديم دعم قانوني شامل ومتخصص لتلبية احتياجات عملائنا وتقديم أفضل الحلول القانونية في مختلف القضايا والمجالات القانونية، ونقدم خدمات الاستشارات القانونية على النحو التالي:",
      },
      sections: [
        {
          heading: {
            en: "General Legal Consultations",
            ar: "استشارات قانونية عامة",
          },
          content: {
            en: "At Law Firm, we provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities. Our goal is to offer accurate legal advice based on a deep understanding of local and international laws.",
            ar: "في مكتب المحاماة، نقدم استشارات قانونية شاملة تغطي جميع الجوانب القانونية التي قد يواجهها عملاؤنا في حياتهم اليومية أو أنشطتهم التجارية. هدفنا هو تقديم مشورة قانونية دقيقة بناءً على فهم عميق للقوانين المحلية والدولية.",
          },
        },
        {
          heading: {
            en: "Corporate Legal Consultations",
            ar: "استشارات قانونية للشركات",
          },
          content: {
            en: "We at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses. Our advisory services about:",
            ar: "نحن في مكتب المحاماة ندرك أهمية الاستشارات القانونية للشركات في بناء وتطوير أعمالها. تشمل خدماتنا الاستشارية حول:",
          },
          listItems: [
            {
              en: "- Establishing and registering companies.",
              ar: "- تأسيس وتسجيل الشركات.",
            },
            {
              en: "- All kinds of contracts and agreements.",
              ar: "- جميع أنواع العقود والاتفاقيات.",
            },
            { en: "- Commercial disputes.", ar: "- المنازعات التجارية." },
            {
              en: "- Compliance with local and international laws and regulations.",
              ar: "- الامتثال للقوانين واللوائح المحلية والدولية.",
            },
          ],
        },
        {
          heading: {
            en: "Individual Legal Consultations",
            ar: "استشارات قانونية فردية",
          },
          content: {
            en: "Law Firm offers customized advisory services for individuals, including:",
            ar: "يقدم مكتب المحاماة خدمات استشارية مخصصة للأفراد، بما في ذلك:",
          },
          listItems: [
            {
              en: "- Family issues such as divorce, alimony, and custody.",
              ar: "- قضايا الأسرة مثل الطلاق، والنفقة، والحضانة.",
            },
            {
              en: "- Real estate matters like buying, selling, and renting properties.",
              ar: "- مسائل العقارات مثل شراء وبيع وتأجير العقارات.",
            },
            {
              en: "- Employment issues such as hiring and wrongful termination.",
              ar: "- قضايا التوظيف مثل التوظيف والإنهاء الخاطئ للخدمة.",
            },
            {
              en: "- Criminal cases and defending personal rights.",
              ar: "- القضايا الجنائية والدفاع عن الحقوق الشخصية.",
            },
          ],
        },
      ],
      conclusion: {
        // Added the concluding paragraph content
        en: "At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal solutions. Contact us today to receive professional and comprehensive legal consultation.",
        ar: "في مكتب المحاماة، نهدف إلى تقديم أفضل الخدمات القانونية لضمان حقوقك وتقديم حلول قانونية فعالة. اتصل بنا اليوم للحصول على استشارة قانونية مهنية وشاملة.",
      },
    },
    // Add more service contents here if you have more services based on their slugs
    // For example:
    // 'foreign-investment-services': { ... content ... },
    // 'contracts': { ... content ... },
  };

  const service = serviceContent[slug];

  // Fallback if no matching service is found (e.g., if someone types a wrong URL)
  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <p className="text-xl">Service not found.</p>
      </div>
    );
  }

  // Hardcoded image URLs for the hero section (same as homepage)
  const hardcodedBackgroundImage =
    "https://images.squarespace-cdn.com/content/v1/6411cb044aadc4188f8a33fc/4bd7e015-90c0-4a71-a569-382adb65c32b/Colin_Field_Dempster_DJI_0120.jpg";

  const t = (textObj: { en: string; ar: string }) =>
    isRTL ? textObj.ar : textObj.en;

  return (
    <div className={`min-h-screen relative`}>
      <Header />

      {/* Hero Section - Reusing similar background as homepage. Removed text content. */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hardcodedBackgroundImage}
            alt="Service Page Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-brown-light opacity-20"></div>
        </div>
        {/* Removed the h1 and p tags that previously displayed text over the hero image */}
      </section>

      {/* Main Content Body */}
      <main className="container mx-auto px-4 lg:px-8 py-12 bg-white text-gray-800">
        <button
          onClick={() => router.push("/")} // Changed to redirect to home page
          className={`flex items-center text-brown-primary hover:text-brown-accent transition-colors mb-8 text-lg ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <ChevronLeft className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />{" "}
          {isRTL ? "العودة" : "Back"} {/* Changed text here */}
        </button>

        {/* Main service title - adjusted font size and weight to match screenshot */}
        <h2 className="text-4xl font-extrabold text-brown-dark mb-6">
          {" "}
          {/* Increased text size and weight */}
          {t(service.title)}
        </h2>
        {/* Main service description - adjusted font size and leading */}
        <p className="text-lg leading-relaxed mb-8 text-gray-700">
          {" "}
          {/* Consistent text color */}
          {t(service.description)}
        </p>

        {service.sections.map((section, index) => (
          <div key={index} className="mb-8">
            {/* Section heading with square bullet, spacing, and color */}
            <h3 className="text-xl font-semibold text-brown-dark mb-4 flex items-center">
              {" "}
              {/* Adjusted text size */}
              <span className={`text-brown-accent ${isRTL ? "ml-2" : "mr-2"}`}>
                &#9632;
              </span>{" "}
              {/* Adjusted margin for spacing */}
              {t(section.heading)}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {" "}
              {/* Adjusted font size and margin */}
              {t(section.content)}
            </p>
            {section.listItems && (
              <ul className={`list-none pl-0 mt-2 ${isRTL ? "pr-4" : "pl-4"}`}>
                {" "}
                {/* Adjusted margin */}
                {section.listItems.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`mb-1 text-base text-gray-700 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {" "}
                    {/* Adjusted margin and font size */}
                    {t(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Concluding paragraph */}
        <p className="text-base text-gray-700 leading-relaxed mt-10">
          {" "}
          {/* Added margin top for separation */}
          {t(service.conclusion)}
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
