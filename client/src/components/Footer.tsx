// src/components/Footer.tsx
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"; // Removed Phone, Mail, MapPin if not displayed

import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
// fetchStrapiData is not used for data loading in this hardcoded version
// Removed imports for Strapi types related to GlobalSettingsAttributes, StrapiSingleResponse

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
      subscriptionExists: "This email is already subscribed.",
      subscriptionFailed: "Subscription failed. Please try again.",
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
      subscriptionExists: "هذا البريد الإلكتروني مشترك بالفعل.",
      subscriptionFailed: "فشل الاشتراك. الرجاء المحاولة مرة أخرى.",
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
        // NOTE: This part still attempts to hit your Strapi API for the Subscriber collection.
        // It will only work if your Strapi server is running and the 'Subscriber' collection
        // type exists with an 'Email' field and Public 'create' permission.
        // If Strapi is not running or configured, this will fail.

        // Check if email already exists
        const checkResponse = await fetch(
          `http://localhost:1337/api/subscribers?filters[Email][$eq]=${values.email}`
        );
        const checkData = await checkResponse.json();

        if (checkData.data && checkData.data.length > 0) {
          setSubscribeMessage(t("subscriptionExists"));
          setSubscribeMessageType("error");
        } else {
          // If not exists, proceed with subscription
          const subscribeResponse = await fetch(
            "http://localhost:1337/api/subscribers",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  Email: values.email,
                },
              }),
            }
          );

          if (!subscribeResponse.ok) {
            const errorData = await subscribeResponse.json();
            throw new Error(
              errorData.error?.message || t("subscriptionFailed")
            );
          }

          setSubscribeMessage(t("subscriptionSuccess"));
          setSubscribeMessageType("success");
          resetForm();
        }
      } catch (err: any) {
        console.error("Subscription error:", err);
        setSubscribeMessage(err.message || t("subscriptionFailed"));
        setSubscribeMessageType("error");
      } finally {
        setSubmitting(false);
        setTimeout(() => {
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
    <footer className="bg-brown-dark text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Top Section: Newsletter & Social Links */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          {/* Newsletter */}
          <div
            className={`flex-1 mb-6 lg:mb-0 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <form onSubmit={formik.handleSubmit} className="flex max-w-md">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("subscribePlaceholder")}
                className="flex-1 px-4 py-2 rounded-l-lg text-brown-primary focus:outline-none focus:ring-2 focus:ring-brown-accent"
                disabled={formik.isSubmitting}
              />
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-brown-accent px-6 py-2 rounded-r-lg hover:bg-opacity-80 transition-colors disabled:opacity-50 font-semibold"
              >
                {formik.isSubmitting ? "..." : t("subscribeButton")}
              </button>
            </form>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-300">{formik.errors.email}</p>
            )}
            {subscribeMessage && (
              <p
                className={`mt-2 text-sm ${
                  subscribeMessageType === "success"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {subscribeMessage}
              </p>
            )}
          </div>

          {/* Social Links & Contact Info */}
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
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 hover:text-brown-accent transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 hover:text-brown-accent transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 hover:text-brown-accent transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 hover:text-brown-accent transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/20 my-8" />

        {/* Bottom Section: Links & Copyright */}
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
