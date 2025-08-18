// src/components/Footer.tsx
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// Re-import standard Lucide icons for Facebook, Twitter. Using Chrome as a generic Google-like icon.
import { Facebook, Twitter, Chrome } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const isRTL = useSelector(
    (state: RootState) => state.language.direction === "rtl"
  );

  const [subscribeMessage, setSubscribeMessage] = useState<string>("");
  const [subscribeMessageType, setSubscribeMessageType] = useState<
    "success" | "error" | ""
  >("");

  // Hardcoded text translations for Footer
  const footerTranslations = {
    en: {
      subscribePlaceholder: "Email",
      subscribeButton: "Subscribe",
      contacts: "Contacts",
      about: "About",
      strategy: "Our Strategy",
      advantages: "Our Advantages",
      responsibility: "Social Responsibility",
      services: "Our Services",
      copyright: "© 2024 . All rights reserved.",
      subscriptionSuccess: "Subscription successful! Thank you.",
      subscriptionExists:
        "This email is already subscribed (hardcoded simulation).",
      subscriptionFailed: "Subscription failed (hardcoded simulation).",
    },
    ar: {
      subscribePlaceholder: "البريد الإلكتروني",
      subscribeButton: "اشترك",
      contacts: "جهات الاتصال",
      about: "من نحن",
      strategy: "استراتيجيتنا",
      advantages: "مميزاتنا",
      responsibility: "المسؤولية الاجتماعية",
      services: "خدماتنا",
      copyright: "© 2024 . جميع الحقوق محفوظة.",
      subscriptionSuccess: "تم الاشتراك بنجاح! شكرا لك.",
      subscriptionExists: "هذا البريد الإلكتروني مشترك بالفعل (محاكاة).",
      subscriptionFailed: "فشل الاشتراك (محاكاة).",
    },
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = footerTranslations[currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  // Formik validation schema for email subscription
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setSubscribeMessage("");
      setSubscribeMessageType("");

      try {
        // SIMULATED API CALL - NO ACTUAL FETCH TO STRAPI HERE for UI purposes
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

        // Simulate checking if email exists
        if (values.email === "test@example.com") {
          // Hardcoded condition for 'existing' email
          setSubscribeMessage(t("subscriptionExists"));
          setSubscribeMessageType("error");
        } else {
          setSubscribeMessage(t("subscriptionSuccess"));
          setSubscribeMessageType("success");
          resetForm(); // Clear the form on success
        }
      } catch (err: any) {
        setSubscribeMessage(t("subscriptionFailed"));
        setSubscribeMessageType("error");
      } finally {
        setSubmitting(false);
        setTimeout(() => {
          // Clear message after 3 seconds
          setSubscribeMessage("");
          setSubscribeMessageType("");
        }, 3000);
      }
    },
  });

  const footerNavLinks = [
    { text: t("about"), href: "/about-us" },
    { text: t("strategy"), href: "/strategy" },
    { text: t("advantages"), href: "/advantages" },
    { text: t("responsibility"), href: "/responsibility" },
    { text: t("services"), href: "/services" },
  ];

  return (
    <footer className="bg-[var(--color-brown-dark)] text-[var(--foreground)]">
      <div className="container bg-brown-dark mx-auto px-4 lg:px-8 py-12">
        {/* Top Section: Email Form, Contacts Text, Social Links - All aligned right */}
        {/* Using lg:gap-x-8 for consistent spacing between major items on larger screens */}
        <div className="flex flex-col lg:flex-row items-center justify-end mb-8 lg:gap-x-8">
          {/* Newsletter section (including form and messages) */}
          {/* Newsletter section: aligned to the right before Contacts */}
          <div className="flex ml-auto mb-6 lg:mb-0">
            <div
              className={`flex items-center w-[300px] rounded-lg bg-white px-2 py-1 ${
                isRTL ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("subscribePlaceholder")}
                className="flex-1 px-3 py-2 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-0"
                disabled={formik.isSubmitting}
              />
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-[var(--color-brown-dark)] text-white text-sm font-semibold px-3 py-1 rounded hover:bg-brown-accent transition-colors disabled:opacity-50"
              >
                {formik.isSubmitting ? "..." : t("subscribeButton")}
              </button>
            </div>
          </div>

          {/* Social Links & Contact Info */}
          {/* Adjusted spacing and flex order for mobile vs desktop */}
          <div
            className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 ${
              isRTL ? "md:space-x-reverse" : ""
            }`}
          >
            <span
              className={`text-lg font-semibold ${isRTL ? "ml-4" : "mr-4"}`}
            >
              {t("contacts")}
            </span>
            <div
              className={`flex space-x-4 text-white ${
                isRTL ? "rtl:space-x-reverse" : ""
              }`}
            >
              {/* Twitter Filled Icon */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 hover:text-brown-accent transition-colors fill-current" />
              </a>
              {/* Facebook Filled Icon */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 hover:text-brown-accent transition-colors fill-current" />
              </a>
              {/* Google Icon (Using Chrome as a generic filled Google icon from Lucide) */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Plus"
              >
                <Chrome className="w-6 h-6 hover:text-brown-accent transition-colors fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/20 my-8" />

        {/* Bottom Section: Links (Left) & Copyright (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
          {/* Footer Navigation Links */}
          <div
            className={`flex flex-wrap justify-center lg:justify-start gap-4 mb-4 lg:mb-0 text-white`}
          >
            {footerNavLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-brown-accent transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white/80 text-sm">{t("copyright")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
