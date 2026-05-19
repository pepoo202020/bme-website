"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import type { HeroSlide } from "@/generated/prisma/client";

interface HeroSectionProps {
  hero: HeroSlide | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { language } = useLanguage();

  // Helper to get content based on language
  const getContent = (en: string | null, ar: string | null) => {
    return language === "ar" ? ar || "" : en || "";
  };

  const isRTL = language === "ar";

  if (!hero) {
    return (
      <section className="relative h-[600px] w-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No hero image configured</p>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt={getContent(hero.english_title, hero.arabic_title)}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-0">
        <div
          className={`max-w-2xl text-white ${isRTL ? "text-right mr-0 ml-auto" : "text-left"}`}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-sm">
            {getContent(hero.english_subtitle, hero.arabic_subtitle)}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {getContent(hero.english_title, hero.arabic_title)}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {getContent(hero.english_description, hero.arabic_description)}
          </p>
          {getContent(hero.english_buttonText, hero.arabic_buttonText) && (
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 rounded-full"
            >
              <Link
                href={
                  getContent(hero.english_buttonLink, hero.arabic_buttonLink) ||
                  "#"
                }
              >
                {getContent(hero.english_buttonText, hero.arabic_buttonText)}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
