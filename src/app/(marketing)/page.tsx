"use client";

import { HeroSlider } from "@/components/marketing/hero-slider";
import type { SlideData } from "@/components/marketing/hero-slide";
import { CategoriesSection } from "@/components/marketing/categories-section";
import type { Category } from "@/components/marketing/category-card";
import { FeaturedProductsSection } from "@/components/marketing/featured-products-section";
import { WhoWeAreSection } from "@/components/marketing/who-we-are-section";
import { GallerySection } from "@/components/marketing/gallery-section";
import { StatisticsSection } from "@/components/marketing/statistics-section";
import type { Product } from "@/types";

const heroSlides: SlideData[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1920&auto=format&fit=crop",
    subtitle: {
      en: "Advanced Healthcare",
      ar: "رعاية صحية متقدمة",
    },
    title: {
      en: "Innovating for a Healthier Tomorrow",
      ar: "نبتكر لغدٍ أكثر صحة",
    },
    description: {
      en: "We provide cutting-edge pharmaceutical solutions to improve the quality of life for patients worldwide.",
      ar: "نقدم حلولاً صيدلانية متطورة لتحسين جودة حياة المرضى في جميع أنحاء العالم.",
    },
    buttonText: {
      en: "About Us",
      ar: "عن الشركة",
    },
    buttonLink: "#about-us",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1576091160550-21733e99dbb9?q=80&w=1920&auto=format&fit=crop",
    subtitle: {
      en: "Quality Assurance",
      ar: "ضمان الجودة",
    },
    title: {
      en: "Committed to Excellence",
      ar: "ملتزمون بالتميز",
    },
    description: {
      en: "Our products undergo rigorous testing to ensure safety, efficacy, and compliance with global standards.",
      ar: "منتجاتنا تخضع لاختبارات صارمة لضمان السلامة والفعالية والامتثال للمعايير العالمية.",
    },
    buttonText: {
      en: "About Us",
      ar: "عن الشركة",
    },
    buttonLink: "#about-us",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1920&auto=format&fit=crop",
    subtitle: {
      en: "Global Reach",
      ar: "وصول عالمي",
    },
    title: {
      en: "Serving Communities Everywhere",
      ar: "نخدم المجتمعات في كل مكان",
    },
    description: {
      en: "From local pharmacies to major hospitals, BME Pharma is a trusted partner in healthcare delivery.",
      ar: "من الصيدليات المحلية إلى المستشفيات الكبرى، بي إم إي فارما هي شريك موثوق في تقديم الرعاية الصحية.",
    },
    buttonText: {
      en: "About Us",
      ar: "عن الشركة",
    },
    buttonLink: "#about-us",
  },
];

const categories: Category[] = [
  {
    id: "1",
    name: { en: "Medications", ar: "الأدوية" },
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    itemCount: 120,
    href: "/store?category=medications",
  },
  {
    id: "2",
    name: { en: "Medical Equipment", ar: "المعدات الطبية" },
    image:
      "https://images.unsplash.com/photo-1583912267652-325203792015?q=80&w=800&auto=format&fit=crop",
    itemCount: 45,
    href: "/store?category=equipment",
  },
  {
    id: "3",
    name: { en: "Personal Care", ar: "العناية الشخصية" },
    image:
      "https://images.unsplash.com/photo-1556228720-19875c4b223d?q=80&w=800&auto=format&fit=crop",
    itemCount: 80,
    href: "/store?category=personal-care",
  },
  {
    id: "4",
    name: { en: "Supplements", ar: "المكملات الغذائية" },
    image:
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=800&auto=format&fit=crop",
    itemCount: 30,
    href: "/store?category=supplements",
  },
];

const featuredProducts: Product[] = [
  {
    id: "p1",
    name: { en: "Premium Vitamin C Serum", ar: "سيروم فيتامين سي الممتاز" },
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "Skin Care",
  },
  {
    id: "p2",
    name: { en: "Advanced Pain Relief Gel", ar: "جل متطور لتخفيف الآلام" },
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop",
    category: "Medications",
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
    category: "Medical Equipment",
  },
  {
    id: "p4",
    name: { en: "Organic Herbal Tea", ar: "شاي عشبي عضوي" },
    price: 12.0,
    image:
      "https://images.unsplash.com/photo-1597481499750-3a6b2263caeb?q=80&w=800&auto=format&fit=crop",
    category: "Supplements",
  },
  {
    id: "p5",
    name: { en: "Daily Multivitamin Complex", ar: "مركب فيتامينات يومي" },
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    category: "Supplements",
  },
  {
    id: "p6",
    name: { en: "Hydrating Face Cream", ar: "كريم مرطب للوجه" },
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop",
    category: "Skin Care",
  },
  {
    id: "p7",
    name: { en: "Surgical Face Masks (50pcs)", ar: "كمامات جراحية (50 قطعة)" },
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1583912267652-325203792015?q=80&w=800&auto=format&fit=crop",
    category: "Medical Supplies",
  },
  {
    id: "p8",
    name: { en: "Electronic Thermometer", ar: "ميزان حرارة إلكتروني" },
    price: 19.5,
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    category: "Medical Equipment",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex-1">
        <HeroSlider slides={heroSlides} />
        <CategoriesSection categories={categories} />
        <FeaturedProductsSection products={featuredProducts} />

        {/* Placeholder for other sections */}
        <div className="container mx-auto py-12 text-center text-muted-foreground">
          <p>More content coming soon...</p>
        </div>

        {/* Who We Are Section */}
        <WhoWeAreSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Statistics Section */}
        <StatisticsSection />
      </main>
    </div>
  );
}
