"use client";

import { useLanguage } from "@/context/language-context";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactUsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-12 md:py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t("header.contact") ||
              (language === "ar" ? "اتصل بنا" : "Contact Us")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === "ar"
              ? "نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو دعم."
              : "We are here to help. Reach out to us for any inquiries or support."}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 flex-1 pb-16 space-y-12">
        {/* Contact Info Grid */}
        <ContactInfo />

        {/* Map and Form Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="h-full min-h-[400px] w-full bg-muted rounded-2xl overflow-hidden border relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60379286259!2d31.18842345579899!3d30.059618498418385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1707400000000!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>

          {/* Form */}
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
