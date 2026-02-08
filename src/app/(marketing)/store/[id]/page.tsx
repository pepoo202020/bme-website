"use client";

import { use, useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { ProductImageGallery } from "@/components/store/product-images";
import { ProductInfo } from "@/components/store/product-info";
import { ProductTabs } from "@/components/store/product-tabs";
import { ProductGrid } from "@/components/store/product-grid"; // Reusing grid for "Related"
import { Product } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock Data (matches store page mock data roughly, but with more details)
const mockProduct: Product = {
  id: "p1",
  name: { en: "Premium Vitamin C Serum", ar: "سيروم فيتامين سي الممتاز" },
  price: 29.99,
  discount: 10,
  image:
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop",
  ],
  category: "personal-care",
  description: {
    en: "High potency Vitamin C serum for bright and radiant skin. Enriched with Hyaluronic Acid and Vitamin E.",
    ar: "سيروم فيتامين سي عالي التركيز لبشرة مشرقة ومتألقة. غني بحمض الهيالورونيك وفيتامين هـ.",
  },
  sku: "BME-VITC-001",
  stock: 15,
  rating: 4.5,
  reviews: 124,
};

// Mock Related Products
const relatedProducts: Product[] = [
  {
    id: "p6",
    name: { en: "Hydrating Face Cream", ar: "كريم مرطب للوجه" },
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
    rating: 4.0,
    stock: 5,
  },
  {
    id: "p11",
    name: { en: "Aloe Vera Gel", ar: "جل الصبار" },
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
    rating: 4.8,
    stock: 20,
  },
  // Add more...
];

export default function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t, language } = useLanguage();
  const resolvedParams = use(params); // React 19 / Next.js 15+ way to unwrap params if needed in client components, though usually params are props.
  // Wait, in Next 15 client components params is a promise.
  const [product, setProduct] = useState<Product | null>(null);

  // Simulate Fetching
  useEffect(() => {
    // In a real app we'd fetch by resolvedParams.id
    setProduct(mockProduct);
  }, [resolvedParams.id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  const categoryLabel = {
    "personal-care": { en: "Personal Care", ar: "العناية الشخصية" },
    // ... others
  }[product.category] || { en: product.category, ar: product.category };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                {t("header.home") || (language === "ar" ? "الرئيسية" : "Home")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rtl:rotate-180" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/store">
                {t("header.store") || (language === "ar" ? "المتجر" : "Store")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rtl:rotate-180" />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/store?category=${product.category}`}>
                {language === "ar" ? categoryLabel.ar : categoryLabel.en}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rtl:rotate-180" />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {language === "ar" ? product.name.ar : product.name.en}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <ProductImageGallery
          mainImage={product.image}
          images={product.images}
          title={language === "ar" ? product.name.ar : product.name.en}
        />

        {/* Info */}
        <ProductInfo product={product} />
      </div>

      {/* Tabs */}
      <ProductTabs product={product} />

      {/* Related Products */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {language === "ar" ? "منتجات قد تعجبك" : "You Might Also Like"}
          </h2>
          <Link href="/store">
            <Button variant="link">
              {language === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </Link>
        </div>
        <ProductGrid products={relatedProducts} layout="grid" />
      </div>
    </div>
  );
}
