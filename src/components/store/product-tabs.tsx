"use client";

import { useLanguage } from "@/context/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductTabs({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  return (
    <div className="mt-12">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3"
          >
            {language === "ar" ? "الوصف" : "Description"}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3"
          >
            {language === "ar" ? "المراجعات" : "Reviews"} (
            {product.reviews || 0})
          </TabsTrigger>
        </TabsList>
        <div className="pt-6">
          <TabsContent
            value="description"
            className="leading-relaxed text-muted-foreground"
          >
            <p>
              {language === "ar"
                ? product.description?.ar || "لا يوجد وصف تفصيلي."
                : product.description?.en ||
                  "No detailed description available."}
            </p>
            {/* Extended Mock Description */}
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-8">
              {/* Mock Reviews */}
              {[1, 2].map((review) => (
                <div key={review} className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>U{review}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">User Name</h4>
                      <span className="text-xs text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < 4 ? "fill-current" : "text-muted",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Great product! Really helped me with my daily routine.
                      Highly recommended.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
