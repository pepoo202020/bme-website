"use client";

import { useLanguage } from "@/context/language-context";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox"; // Kept for potential future use or multi-select
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // If installed, otherwise use <hr />

interface StoreFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
}

export function StoreFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
}: StoreFiltersProps) {
  const { t, language } = useLanguage();

  const categories = [
    { id: "all", label: { en: "All Categories", ar: "كل الأقسام" } },
    { id: "medications", label: { en: "Medications", ar: "الأدوية" } },
    {
      id: "equipment",
      label: { en: "Medical Equipment", ar: "المعدات الطبية" },
    },
    {
      id: "personal-care",
      label: { en: "Personal Care", ar: "العناية الشخصية" },
    },
    {
      id: "supplements",
      label: { en: "Supplements", ar: "المكملات الغذائية" },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">
          {t("store.categories") ||
            (language === "ar" ? "الأقسام" : "Categories")}
        </h3>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="space-y-3"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <RadioGroupItem value={category.id} id={category.id} />
              <Label htmlFor={category.id} className="cursor-pointer">
                {language === "ar" ? category.label.ar : category.label.en}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">
          {t("store.priceRange") ||
            (language === "ar" ? "نطاق السعر" : "Price Range")}
        </h3>
        <div className="px-1 mb-6">
          <Slider
            defaultValue={[minPrice, maxPrice]}
            value={priceRange}
            max={maxPrice}
            min={minPrice}
            step={1}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="my-4"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="border rounded px-3 py-1 bg-muted/20">
            ${priceRange[0]}
          </div>
          <span className="text-muted-foreground">-</span>
          <div className="border rounded px-3 py-1 bg-muted/20">
            ${priceRange[1]}
          </div>
        </div>
      </div>

      {/* Reset Filter Button (Optional but good UX) */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory("all");
          setPriceRange([minPrice, maxPrice]);
        }}
      >
        {t("store.resetFilters") ||
          (language === "ar" ? "إعادة تعيين" : "Reset Filters")}
      </Button>
    </div>
  );
}
