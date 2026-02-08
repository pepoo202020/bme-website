"use client";

import { useLanguage } from "@/context/language-context";
import { Target, Lightbulb } from "lucide-react";

export function VisionMissionSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {t("about.visionTitle") ||
                (language === "ar" ? "رؤيتنا" : "Our Vision")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.visionDesc") ||
                (language === "ar"
                  ? "أن نكون الشركة الرائدة في مجال الحلول الصيدلانية في المنطقة، معترف بنا لابتكارنا وجودتنا وتفانينا في تحسين الصحة العالمية."
                  : "To be the leading pharmaceutical solutions provider in the region, recognized for our innovation, quality, and dedication to improving global health.")}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {t("about.missionTitle") ||
                (language === "ar" ? "مهمتنا" : "Our Mission")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.missionDesc") ||
                (language === "ar"
                  ? "توفير منتجات رعاية صحية عالية الجودة ويمكن الوصول إليها والتي تعزز رفاهية المجتمعات التي نخدمها، من خلال الممارسات الأخلاقية والتحسين المستمر."
                  : "To provide high-quality, accessible healthcare products that enhance the well-being of the communities we serve, through ethical practices and continuous improvement.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
