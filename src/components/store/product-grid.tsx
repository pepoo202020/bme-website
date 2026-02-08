"use client";

import { useLanguage } from "@/context/language-context";
import { ProductCard } from "@/components/marketing/product-card";
import { Product } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { useStore } from "@/context/store-context"; // Assuming useStore exists as per previous context
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
  layout: "grid" | "list";
}

export function ProductGrid({ products, layout }: ProductGridProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (products.length === 0) {
    return (
      <div className="text-center py-24 border rounded-lg bg-muted/10">
        <p className="text-lg text-muted-foreground">
          {t("store.noProducts") ||
            (language === "ar"
              ? "لا توجد منتجات تطابق معايير البحث الخاصة بك."
              : "No products match your filter criteria.")}
        </p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // List View Implementation
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          language={language}
          formatPrice={formatPrice}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
          t={t}
        />
      ))}
    </div>
  );
}

// Helper component for List View item
function ProductListItem({
  product,
  language,
  formatPrice,
  addToCart,
  toggleWishlist,
  isInWishlist,
  t,
}: {
  product: Product;
  language: string;
  formatPrice: (price: number) => string;
  addToCart: (product: Product) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  t: (key: string) => string;
}) {
  const isWishlisted = isInWishlist(product.id);

  const getName = () => (language === "ar" ? product.name.ar : product.name.en);
  const getDescription = () =>
    language === "ar" ? "وصف مختصر للمنتج..." : "Short product description..."; // Placeholder or add to Product type

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(t("product.addedToCart") || "Added to cart", {
      description: getName(),
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isWishlisted) {
      toast.success(t("product.addedToWishlist") || "Added to wishlist");
    } else {
      toast.info(t("product.removedFromWishlist") || "Removed from wishlist");
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row gap-6 border rounded-xl p-4 hover:shadow-md transition-all bg-card">
      {/* Image */}
      <div className="relative w-full sm:w-48 aspect-square sm:aspect-4/3 rounded-lg overflow-hidden shrink-0 bg-muted">
        <Image
          src={product.image}
          alt={getName()}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Actions Overlay (Mobile/Desktop consistent) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-2 inline-block">
              {product.category}
            </span>
            <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {getName()}
            </h3>
          </div>
          <div className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 flex-1">
          {/* Use description if available, else standard text */}
          {(product as any).description?.[language === "ar" ? "ar" : "en"] ||
            (language === "ar"
              ? "منتج عالي الجودة من بي إم إي فارما، مصمم لتلبية احتياجاتك الصحية بأعلى المعايير."
              : "High-quality product from BME Pharma, designed to meet your health needs with the highest standards.")}
        </p>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t">
          <Button
            onClick={handleAddToCart}
            className="flex-1 sm:flex-none gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {t("product.addToCart") ||
              (language === "ar" ? "أضف للسلة" : "Add to Cart")}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleWishlist}
            className={isWishlisted ? "text-red-500 hover:text-red-600" : ""}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </Button>
          <Button variant="outline" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
