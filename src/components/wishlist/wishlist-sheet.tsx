"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/context/store-context";
import { useLanguage } from "@/context/language-context";
import { useCurrency } from "@/context/currency-context";
import { toast } from "sonner";
import { useMemo } from "react";
// We need to fetch product details because wishlist only stores IDs
// In a real app we'd fetch from API. Here we'll Mock import or filter from a known list.
// However, allProducts is in page files. We should probably accessible constant.
// For now, I'll move allProducts to a shared data file or define a mock subset here
// OR better, I will assume the StoreContext *should* ideally provide the full product objects for wishlist too
// but it currently only stores string[].
// Let's modify StoreContext to helper find products, or just mock it here for now.
// Actually, looking at StoreContext, it doesn't have a product lookup method.
// I will temporarily define a mock getter or import mock data if possible.
// Since I can't easily import 'allProducts' from the page file, I will create a temporary mock data file or just
// use a hook if available. Ideally, I'd refactor allProducts to `src/data/products.ts`.
// For now, let's create a partial lookup mock since we have the data in store/page.tsx
// I will quick-fix by importing a 'getAllProducts' if I create it, or just use a small mock list here matching IDs p1-p12.

// Mock data mirror - effectively a "database"
const PRODUCTS_DB = [
  {
    id: "p1",
    name: { en: "Premium Vitamin C Serum", ar: "سيروم فيتامين سي الممتاز" },
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
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
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    category: "supplements",
  },
  {
    id: "p10",
    name: { en: "Wheelchair Standard", ar: "كرسي متحرك قياسي" },
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    category: "equipment",
  },
  {
    id: "p11",
    name: { en: "Aloe Vera Gel", ar: "جل الصبار" },
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "personal-care",
  },
  {
    id: "p12",
    name: { en: "Paracetamol 500mg", ar: "باراسيتامول 500 مجم" },
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1556228578-8d8442c55e41?q=80&w=800&auto=format&fit=crop",
    category: "medications",
  },
];

export function WishlistSheet() {
  const { wishlist, toggleWishlist, addToCart, setIsWishlistOpen } = useStore();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();

  const wishlistItems = useMemo(() => {
    return PRODUCTS_DB.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(
      language === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart",
      {
        description: language === "ar" ? item.name.ar : item.name.en,
      },
    );
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {language === "ar"
            ? "قائمة الأمنيات فارغة"
            : "Your wishlist is empty"}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-xs">
          {language === "ar"
            ? "حفظ العناصر لوقت لاحق. أضف العناصر المفضلة لديك هنا."
            : "Save items for later. Add your favorite items here."}
        </p>
        <Button onClick={() => setIsWishlistOpen(false)} asChild>
          <Link href="/store">
            {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SheetHeader className="px-4 py-4">
        <SheetTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          {t("header.wishlist")} ({wishlist.length})
        </SheetTitle>
      </SheetHeader>

      <ScrollArea className="flex-1 -mx-6 px-10 my-4">
        <div className="space-y-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative aspect-square w-20 h-20 rounded-lg overflow-hidden border bg-muted shrink-0">
                <Image
                  src={item.image}
                  alt={language === "ar" ? item.name.ar : item.name.en}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium line-clamp-1">
                    {language === "ar" ? item.name.ar : item.name.en}
                  </h4>
                  <p className="text-sm font-semibold mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    className="flex-1 text-xs h-8"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "إضافة" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => toggleWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
