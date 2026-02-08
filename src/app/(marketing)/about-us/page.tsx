"use client";

import { useLanguage } from "@/context/language-context";
import { WhoWeAreSection } from "@/components/marketing/who-we-are-section";
import { VisionMissionSection } from "@/components/about/vision-mission";
import { TeamSection } from "@/components/about/team-section";
import { WorkingDaysSection } from "@/components/about/working-days";

export default function AboutUsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t("header.about") || (language === "ar" ? "من نحن" : "About Us")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === "ar"
              ? "تعرف على قصتنا، وقيمنا، والأشخاص الذين يقفون وراء نجاحنا."
              : "Discover our story, our values, and the people behind our success."}
          </p>
        </div>
      </div>

      <main className="flex-1">
        {/* Who We Are (Reuse existing component but maybe tweak if needed, for now standard usage) */}
        <WhoWeAreSection />

        {/* Vision & Mission */}
        <VisionMissionSection />

        {/* Team / Heroes */}
        <TeamSection />

        {/* Working Days */}
        <WorkingDaysSection />
      </main>
    </div>
  );
}
