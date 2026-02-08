"use client";

import { useLanguage } from "@/context/language-context";
import { FullGallery } from "@/components/gallery/full-gallery";

export default function GalleryPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-12 md:py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t("header.gallery") ||
              (language === "ar" ? "معرض الصور" : "Media Gallery")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === "ar"
              ? "استكشف لحظاتنا، ومرافقنا، ومنتجاتنا من خلال عدسة الكاميرا."
              : "Explore our moments, facilities, and products through our lens."}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 flex-1 pb-16">
        <FullGallery />
      </main>
    </div>
  );
}
