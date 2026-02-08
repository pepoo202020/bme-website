"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { useCurrency } from "@/context/currency-context";
import { useStore } from "@/context/store-context";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
// import { Heading } from "@/components/ui/heading"; // Removed unused import
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, ShoppingCart, Minus, Plus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(product.id);
  const stock = product.stock || 0;
  const isOutOfStock = stock === 0;

  const getName = () => (language === "ar" ? product.name.ar : product.name.en);
  const getDescription = () =>
    language === "ar"
      ? product.description?.ar || "لا يوجد وصف."
      : product.description?.en || "No description available.";

  const price = product.price;
  const discount = product.discount || 0;
  const discountedPrice = price - (price * discount) / 100;

  const handleAddToCart = () => {
    if (quantity > stock) {
      toast.error(
        t("product.outOfStock") || "Cannot add more than available stock",
      );
      return;
    }
    // We might need to update addToCart to accept quantity in the future,
    // for now we loop or just add once.
    // Assuming context handles quantity aggregation or we call it multiple times.
    // For simplicity with current context, we just add the product.
    // Ideally, update the context to accept quantity.
    // Simulating multiple adds:
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(t("product.addedToCart") || "Added to cart");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{getName()}</h1>
        <div className="flex items-center gap-4 text-sm">
          {/* Stars */}
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < (product.rating || 0) ? "fill-current" : "text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            ({product.reviews || 0}{" "}
            {t("product.reviews") || (language === "ar" ? "مراجعة" : "Reviews")}
            )
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span
            className={cn(
              "font-medium",
              isOutOfStock ? "text-destructive" : "text-green-600",
            )}
          >
            {isOutOfStock
              ? language === "ar"
                ? "نفذت الكمية"
                : "Out of Stock"
              : language === "ar"
                ? "متوفر"
                : "In Stock"}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold text-primary">
          {formatPrice(discountedPrice)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
            <Badge variant="destructive">-{discount}%</Badge>
          </>
        )}
      </div>

      <div className="text-muted-foreground leading-relaxed">
        {getDescription()}
      </div>

      {product.sku && (
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {language === "ar" ? "رمز المنتج (SKU):" : "SKU:"}
          </span>{" "}
          {product.sku}
        </div>
      )}

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity */}
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            disabled={quantity <= 1 || isOutOfStock}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            disabled={quantity >= stock || isOutOfStock}
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Add to Cart */}
        <Button
          size="lg"
          className="flex-1 gap-2"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5" />
          {t("product.addToCart") ||
            (language === "ar" ? "أضف للسلة" : "Add to Cart")}
        </Button>

        {/* Wishlist */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-11 w-11",
            isWishlisted &&
              "text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600",
          )}
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(
              isWishlisted ? "Removed from wishlist" : "Added to wishlist",
            );
          }}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Share2 className="w-4 h-4" />
        <span>
          {language === "ar" ? "مشاركة هذا المنتج" : "Share this product"}
        </span>
      </div>
    </div>
  );
}
