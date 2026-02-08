"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  mainImage: string;
  images?: string[];
  title: string;
}

export function ProductImageGallery({
  mainImage,
  images = [],
  title,
}: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);

  // Combine main image with additional images, filtering duplicates
  const allImages = Array.from(new Set([mainImage, ...images]));

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[500px] hide-scrollbar">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative w-20 h-20 border-2 rounded-lg overflow-hidden shrink-0 transition-all",
              activeImage === img
                ? "border-primary"
                : "border-transparent hover:border-primary/50",
            )}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-square md:aspect-auto md:h-[500px] bg-muted rounded-xl overflow-hidden">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
