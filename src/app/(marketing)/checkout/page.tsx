import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | BME Pharma",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8">
      <CheckoutForm />
    </div>
  );
}
