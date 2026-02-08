"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Currency } from "@/types";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

const EXCHANGE_RATE = 50; // 1 USD = 50 EGP (Approximate)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency") as Currency;
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const formatPrice = (priceInUSD: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(priceInUSD);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EGP",
      }).format(priceInUSD * EXCHANGE_RATE);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        exchangeRate: EXCHANGE_RATE,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
