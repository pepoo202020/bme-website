"use client";

import { useLanguage } from "@/context/language-context";
import Image from "next/image";

// Mock Team Data
const teamMembers = [
  {
    id: 1,
    name: { en: "Dr. Ahmed Hassan", ar: "د. أحمد حسن" },
    role: { en: "CEO & Founder", ar: "الرئيس التنفيذي والمؤسس" },
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: { en: "Sarah Johnson", ar: "سارة جونسون" },
    role: { en: "Head of Research", ar: "رئيس قسم الأبحاث" },
    image:
      "https://images.unsplash.com/photo-1573496359-136d9198758a?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: { en: "Mohamed Ali", ar: "محمد علي" },
    role: { en: "Operations Manager", ar: "مدير العمليات" },
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: { en: "Emily Davis", ar: "إميلي ديفيس" },
    role: { en: "Quality Assurance", ar: "ضمان الجودة" },
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

export function TeamSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t("about.teamTitle") ||
              (language === "ar" ? "أبطالنا" : "Our Heroes")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("about.teamDesc") ||
              (language === "ar"
                ? "تعرف على الفريق المتميز الذي يقود ابتكاراتنا ونجاحنا."
                : "Meet the dedicated team driving our innovation and success.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-muted group-hover:border-primary transition-colors">
                <Image
                  src={member.image}
                  alt={language === "ar" ? member.name.ar : member.name.en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">
                {language === "ar" ? member.name.ar : member.name.en}
              </h3>
              <p className="text-primary font-medium">
                {language === "ar" ? member.role.ar : member.role.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
