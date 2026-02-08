"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const allImages = [
  {
    src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop",
    alt: "Laboratory Research",
    category: "facilities",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-21733e99dbb9?q=80&w=800&auto=format&fit=crop",
    alt: "Quality Control",
    category: "facilities",
    aspectRatio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop",
    alt: "Global Distribution",
    category: "events",
    aspectRatio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    alt: "Pharmaceutical Products",
    category: "products",
    aspectRatio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1556228720-19875c4b223d?q=80&w=800&auto=format&fit=crop",
    alt: "Customer Care",
    category: "team",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop",
    alt: "Expert Team",
    category: "team",
    aspectRatio: "aspect-square",
  },
  // Additional Mock Images for Load More
  {
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop",
    alt: "Conference 2023",
    category: "events",
    aspectRatio: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop",
    alt: "New Lab Equipment",
    category: "facilities",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1576602976116-5a2a5dc8af54?q=80&w=800&auto=format&fit=crop",
    alt: "Product Launch",
    category: "events",
    aspectRatio: "aspect-[16/9]",
  },
  {
    src: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=800&auto=format&fit=crop",
    alt: "Team Meeting",
    category: "team",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
    alt: "Medical Supplies",
    category: "products",
    aspectRatio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=800&auto=format&fit=crop",
    alt: "Production Line",
    category: "facilities",
    aspectRatio: "aspect-[3/4]",
  },
];

const filters = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "facilities", label: { en: "Facilities", ar: "المرافق" } },
  { id: "products", label: { en: "Products", ar: "المنتجات" } },
  { id: "events", label: { en: "Events", ar: "الفعاليات" } },
  { id: "team", label: { en: "Team", ar: "الفريق" } },
];

export function FullGallery() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter Images
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return allImages;
    return allImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  // Visible Images
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // Handlers
  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6); // Reset visible count on filter change
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 500);
  };

  const hasMore = visibleCount < filteredImages.length;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedCategory === filter.id ? "default" : "outline"}
            onClick={() => handleFilterChange(filter.id)}
            className="rounded-full px-6"
          >
            {language === "ar" ? filter.label.ar : filter.label.en}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {visibleImages.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {visibleImages.map((image, index) => (
            <div key={`${image.src}-${index}`} className="break-inside-avoid">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative overflow-hidden rounded-xl cursor-pointer bg-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className={cn(
                        "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110",
                        // Fallback aspect ratio if needed, but 'h-auto' preserves mostly
                      )}
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
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-xl">
          <p className="text-muted-foreground">
            {language === "ar"
              ? "لا توجد صور في هذا القسم."
              : "No images found in this category."}
          </p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            size="lg"
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="min-w-[150px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "ar" ? "جاري التحميل..." : "Loading..."}
              </>
            ) : language === "ar" ? (
              "تحميل المزيد"
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
