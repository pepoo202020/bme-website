"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { StoreFilters } from "@/components/store/store-filters";
import { StoreHeader } from "@/components/store/store-header";
import { ProductGrid } from "@/components/store/product-grid";
import { NewsletterSection } from "@/components/store/newsletter-section";
import { Product } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Extended Mock Data for Store
const allProducts: Product[] = [
  {
    id: "p1",
    name: { en: "Premium Vitamin C Serum", ar: "سيروم فيتامين سي الممتاز" },
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
    description: {
      en: "High potency Vitamin C serum for bright and radiant skin.",
      ar: "سيروم فيتامين سي عالي التركيز لبشرة مشرقة ومتألقة.",
    },
  },
  {
    id: "p2",
    name: { en: "Advanced Pain Relief Gel", ar: "جل متطور لتخفيف الآلام" },
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop",
    category: "medications",
  },
  {
    id: "p3",
    name: {
      en: "Digital Blood Pressure Monitor",
      ar: "جهاز قياس ضغط الدم الرقمي",
    },
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1576091160550-21733e99dbb9?q=80&w=800&auto=format&fit=crop",
    category: "equipment",
  },
  {
    id: "p4",
    name: { en: "Organic Herbal Tea", ar: "شاي عشبي عضوي" },
    price: 12.0,
    image:
      "https://images.unsplash.com/photo-1597481499750-3a6b2263caeb?q=80&w=800&auto=format&fit=crop",
    category: "supplements",
  },
  {
    id: "p5",
    name: { en: "Daily Multivitamin Complex", ar: "مركب فيتامينات يومي" },
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    category: "supplements",
  },
  {
    id: "p6",
    name: { en: "Hydrating Face Cream", ar: "كريم مرطب للوجه" },
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
  },
  {
    id: "p7",
    name: { en: "Surgical Face Masks (50pcs)", ar: "كمامات جراحية (50 قطعة)" },
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1583912267652-325203792015?q=80&w=800&auto=format&fit=crop",
    category: "equipment",
  },
  {
    id: "p8",
    name: { en: "Electronic Thermometer", ar: "ميزان حرارة إلكتروني" },
    price: 19.5,
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    category: "equipment",
  },
  {
    id: "p9",
    name: { en: "Omega 3 Fish Oil", ar: "زيت السمك أوميغا 3" },
    price: 22.5,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "supplements",
  },
  {
    id: "p10",
    name: { en: "Wheelchair Standard", ar: "كرسي متحرك قياسي" },
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "equipment",
  },
  {
    id: "p11",
    name: { en: "Aloe Vera Gel", ar: "جل الصبار" },
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "personal-care",
  },
  {
    id: "p12",
    name: { en: "Paracetamol 500mg", ar: "باراسيتامول 500 مجم" },
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "medications",
  },
];

function StorePageContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  // Initialize from URL if present to avoid flicker
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortOption, setSortOption] = useState("featured");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state with URL manually when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Sync URL to state (handling back/forward navigation)
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam && selectedCategory !== "all") {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    // "newest" and "featured" logic would presumably use dates or flags,
    // for now we'll just leave them as mock order or reverse mock order
    if (sortOption === "newest") {
      result.reverse();
    }

    return result;
  }, [selectedCategory, priceRange, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortOption]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            {t("header.store") || (language === "ar" ? "المتجر" : "Store")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "ar"
              ? "تصفح مجموعتنا الواسعة من المنتجات الطبية عالية الجودة."
              : "Browse our wide range of high-quality medical products."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex-1 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
            <StoreFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minPrice={0}
              maxPrice={200}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <Filter className="w-4 h-4" />
                    {t("store.filters") ||
                      (language === "ar"
                        ? "تصفية المنتجات"
                        : "Filter Products")}
                  </Button>
                </SheetTrigger>
                <SheetContent side={language === "ar" ? "right" : "left"}>
                  <div className="py-4">
                    <StoreFilters
                      selectedCategory={selectedCategory}
                      setSelectedCategory={handleCategoryChange}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      minPrice={0}
                      maxPrice={200}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <StoreHeader
              totalProducts={filteredProducts.length}
              sortOption={sortOption}
              setSortOption={setSortOption}
              layout={layout}
              setLayout={setLayout}
            />

            <ProductGrid products={currentProducts} layout={layout} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage((p) => p - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage((p) => p + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4 text-center">Loading...</div>
      }
    >
      <StorePageContent />
    </Suspense>
  );
}
