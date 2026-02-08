"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

// Define the shape of the data for a slide
export interface SlideData {
  id: number;
  image: string;
  subtitle: { en: string; ar: string };
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  buttonText: { en: string; ar: string };
  buttonLink: string;
}

interface HeroSlideProps {
  slide: SlideData;
}

export function HeroSlide({ slide }: HeroSlideProps) {
  const { language } = useLanguage();

  // Helper to get content based on language
  const getContent = (content: { en: string; ar: string }) => {
    return language === "ar" ? content.ar : content.en;
  };

  const isRTL = language === "ar";

  return (
    <div className="relative h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt={getContent(slide.title)}
          fill
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
            {getContent(slide.subtitle)}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {getContent(slide.title)}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {getContent(slide.description)}
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
            <Link href={slide.buttonLink}>{getContent(slide.buttonText)}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
