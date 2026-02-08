"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

// Mock images with different aspect ratios
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop",
    alt: "Laboratory Research",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-21733e99dbb9?q=80&w=800&auto=format&fit=crop",
    alt: "Quality Control",
    aspectRatio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop",
    alt: "Global Distribution",
    aspectRatio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    alt: "Pharmaceutical Products",
    aspectRatio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1556228720-19875c4b223d?q=80&w=800&auto=format&fit=crop",
    alt: "Customer Care",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop",
    alt: "Expert Team",
    aspectRatio: "aspect-square",
  },
];

export function GallerySection() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            {t("section.galleryTitle") ||
              (language === "ar" ? "معرض الصور" : "Our Gallery")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("section.galleryDesc") ||
              (language === "ar"
                ? "إلق نظرة على مرافقنا ومنتجاتنا وفريقنا وهو يعمل."
                : "Take a look at our facilities, products, and our team in action.")}
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="group relative overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600} // Aspect ratio handled by class or layout, but width/height needed for Next/Image
                      className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110`}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 p-3 rounded-full text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
