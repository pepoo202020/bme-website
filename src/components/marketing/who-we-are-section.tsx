"use client";

import { useLanguage } from "@/context/language-context";
import { Award, Globe, Users, Headset } from "lucide-react";
import Image from "next/image";

const features = [
  {
    key: "quality",
    icon: Award,
    title: { en: "Certified Quality", ar: "جودة معتمدة" },
    description: {
      en: "ISO certified products ensuring the highest standards.",
      ar: "منتجات حاصلة على شهادة ISO تضمن أعلى المعايير.",
    },
  },
  {
    key: "global",
    icon: Globe,
    title: { en: "Global Reach", ar: "وصول عالمي" },
    description: {
      en: "Delivering health solutions to over 50 countries.",
      ar: "تقديم حلول صحية لأكثر من 50 دولة.",
    },
  },
  {
    key: "expert",
    icon: Users,
    title: { en: "Expert Team", ar: "فريق خبير" },
    description: {
      en: "Dedicated professionals with decades of experience.",
      ar: "محترفون متخصصون يتمتعون بعقود من الخبرة.",
    },
  },
  {
    key: "support",
    icon: Headset,
    title: { en: "24/7 Support", ar: "دعم 24/7" },
    description: {
      en: "Always here to answer your questions and concerns.",
      ar: "موجودون دائمًا للإجابة على أسئلتكم واستفساراتكم.",
    },
  },
];

export function WhoWeAreSection() {
  const { t, language } = useLanguage();

  const getData = (item: (typeof features)[0]) => ({
    title: language === "ar" ? item.title.ar : item.title.en,
    description: language === "ar" ? item.description.ar : item.description.en,
  });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop"
          alt="BME Pharma Background"
          fill
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-0">
        <div className="text-center max-w-3xl mx-auto mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {t("section.whoWeAreTitle") ||
              (language === "ar" ? "من نحن" : "Who We Are")}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            {t("section.whoWeAreDesc") ||
              (language === "ar"
                ? "بي إم إي فارما هي شركة رائدة في مجال المستحضرات الدوائية، ملتزمة بتحسين الصحة العالمية من خلال الابتكار والجودة والنزاهة."
                : "BME Pharma is a leading pharmaceutical company committed to improving global health through innovation, quality, and integrity.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const { title, description } = getData(feature);
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
