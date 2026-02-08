"use client";

import { useLanguage } from "@/context/language-context";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactInfo() {
  const { t, language } = useLanguage();

  const contactDetails = [
    {
      icon: MapPin,
      title: { en: "Office Address", ar: "عنوان المكتب" },
      value: {
        en: "123 Pharmacy Street, Medical District, Cairo, Egypt",
        ar: "١٢٣ شارع الصيدلة، الحي الطبي، القاهرة، مصر",
      },
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Phone,
      title: { en: "Phone Number", ar: "رقم الهاتف" },
      value: { en: "+20 123 456 7890", ar: "+٢٠ ١٢٣ ٤٥٦ ٧٨٩٠" },
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Mail,
      title: { en: "Email Address", ar: "البريد الإلكتروني" },
      value: { en: "info@bmepharma.com", ar: "info@bmepharma.com" },
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Clock,
      title: { en: "Working Hours", ar: "ساعات العمل" },
      value: { en: "Sun - Thu: 9AM - 5PM", ar: "الأحد - الخميس: ٩ ص - ٥ م" },
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactDetails.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-card border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bg} ${item.color}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              {language === "ar" ? item.title.ar : item.title.en}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === "ar" ? item.value.ar : item.value.en}
            </p>
          </div>
        );
      })}
    </div>
  );
}
