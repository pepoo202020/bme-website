"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function NavHeader() {
  const { t, language } = useLanguage();
  const sheetSide = language === "ar" ? "right" : "left"; // Menu usually comes from 'start'

  const navItems = [
    { title: t("nav.home"), href: "/" },
    { title: t("nav.store"), href: "/store" },
    { title: t("nav.about"), href: "/about-us" },
    { title: t("nav.contact"), href: "/contact-us" },
    { title: t("nav.gallery"), href: "/gallery" },
  ];

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex h-12 items-center">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="transition-colors hover:text-primary text-foreground/80 hover:underline underline-offset-4"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden -ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={sheetSide}>
            <SheetHeader>
              <SheetTitle>BME Pharma</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  <Separator />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
