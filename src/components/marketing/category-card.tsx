"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface Category {
  id: string;
  name: { en: string; ar: string };
  image: string;
  itemCount?: number;
  href: string;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getName = (name: { en: string; ar: string }) => {
    return language === "ar" ? name.ar : name.en;
  };

  return (
    <Link href={category.href} className="group block h-full">
      <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-card group-hover:-translate-y-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={category.image}
            alt={getName(category.name)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {getName(category.name)}
              </h3>
              {category.itemCount !== undefined && (
                <p className="text-sm text-muted-foreground">
                  {category.itemCount} {language === "ar" ? "منتج" : "Products"}
                </p>
              )}
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 rtl:-translate-x-2 rtl:group-hover:translate-x-0">
              <ArrowIcon className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
