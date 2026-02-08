"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      language === "ar"
        ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
        : "Message sent successfully! We will get back to you soon.",
    );
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-card border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {t("contact.getInTouch") ||
          (language === "ar" ? "تواصل معنا" : "Get in Touch")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === "ar" ? "الاسم الكامل" : "Full Name"}
            </Label>
            <Input
              id="name"
              required
              placeholder={language === "ar" ? "الاسم" : "Your Name"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            {language === "ar" ? "الموضوع" : "Subject"}
          </Label>
          <Input
            id="subject"
            required
            placeholder={
              language === "ar" ? "كيف يمكننا مساعدتك؟" : "How can we help?"
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            {language === "ar" ? "الرسالة" : "Message"}
          </Label>
          <Textarea
            id="message"
            required
            placeholder={
              language === "ar"
                ? "اكتب رسالتك هنا..."
                : "Type your message here..."
            }
            className="min-h-[150px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "ar" ? "جاري الإرسال..." : "Sending..."}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              {language === "ar" ? "إرسال الرسالة" : "Send Message"}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
