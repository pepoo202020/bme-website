"use client";

import { useLanguage } from "@/context/language-context";
import { Clock, Calendar } from "lucide-react";

export function WorkingDaysSection() {
  const { t, language } = useLanguage();

  const workingHours = [
    {
      day: { en: "Sunday", ar: "الأحد" },
      hours: { en: "9:00 AM - 5:00 PM", ar: "٩:٠٠ ص - ٥:٠٠ م" },
    },
    {
      day: { en: "Monday", ar: "الاثنين" },
      hours: { en: "9:00 AM - 5:00 PM", ar: "٩:٠٠ ص - ٥:٠٠ م" },
    },
    {
      day: { en: "Tuesday", ar: "الثلاثاء" },
      hours: { en: "9:00 AM - 5:00 PM", ar: "٩:٠٠ ص - ٥:٠٠ م" },
    },
    {
      day: { en: "Wednesday", ar: "الأربعاء" },
      hours: { en: "9:00 AM - 5:00 PM", ar: "٩:٠٠ ص - ٥:٠٠ م" },
    },
    {
      day: { en: "Thursday", ar: "الخميس" },
      hours: { en: "9:00 AM - 5:00 PM", ar: "٩:٠٠ ص - ٥:٠٠ م" },
    },
    {
      day: { en: "Friday", ar: "الجمعة" },
      hours: { en: "Closed", ar: "مغلق" },
      isClosed: true,
    },
    {
      day: { en: "Saturday", ar: "السبت" },
      hours: { en: "10:00 AM - 3:00 PM", ar: "١٠:٠٠ ص - ٣:٠٠ م" },
    },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center lg:justify-start rtl:lg:justify-end gap-3">
              <Clock className="w-8 h-8" />
              {t("about.workingDaysTitle") ||
                (language === "ar" ? "أيام العمل" : "Working Days")}
            </h2>
            <p className="text-primary-foreground/90 text-lg leading-relaxed max-w-xl">
              {t("about.workingDaysDesc") ||
                (language === "ar"
                  ? "نحن متواجدون لخدمتكم طوال أيام الأسبوع باستثناء أيام العطلات الرسمية. تفضلوا بزيارتنا أو اتصلوا بنا في الأوقات التالية."
                  : "We are available to serve you throughout the week except on public holidays. Visit us or contact us during the following hours.")}
            </p>
          </div>

          {/* Table/List */}
          <div className="flex-1 w-full max-w-lg bg-background/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="space-y-4">
              {workingHours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 border-b border-white/10 last:border-0 ${
                    item.isClosed ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 font-medium">
                    <Calendar className="w-4 h-4 opacity-70" />
                    <span>{language === "ar" ? item.day.ar : item.day.en}</span>
                  </div>
                  <span
                    className={item.isClosed ? "font-bold text-red-200" : ""}
                  >
                    {language === "ar" ? item.hours.ar : item.hours.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
