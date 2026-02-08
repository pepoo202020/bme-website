"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          <div className="flex-1 text-center md:text-left rtl:md:text-right">
            <h2 className="text-2xl font-bold mb-2">
              {t("newsletter.title") ||
                (language === "ar"
                  ? "اشترك في نشرتنا الإخبارية"
                  : "Subscribe to our Newsletter")}
            </h2>
            <p className="text-muted-foreground">
              {t("newsletter.desc") ||
                (language === "ar"
                  ? "احصل على آخر التحديثات والعروض الحصرية مباشرة في بريدك الوارد."
                  : "Get the latest updates and exclusive offers directly in your inbox.")}
            </p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl:right-2.5 rtl:left-auto" />
                <Input
                  type="email"
                  placeholder={
                    language === "ar"
                      ? "بريدك الإلكتروني"
                      : "Your email address"
                  }
                  className="pl-9 rtl:pr-9 rtl:pl-3"
                />
              </div>
              <Button type="submit">
                {t("newsletter.subscribe") ||
                  (language === "ar" ? "اشتراك" : "Subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
