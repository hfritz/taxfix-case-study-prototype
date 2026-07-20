"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { BASE_CASE } from "@/lib/pricing-economics";

const PriceContext = createContext<{ price: number; setPrice: (price: number) => void } | null>(
  null
);

export function PriceProvider({ children }: { children: ReactNode }) {
  const [price, setPrice] = useState<number>(BASE_CASE.priceEur);
  return <PriceContext.Provider value={{ price, setPrice }}>{children}</PriceContext.Provider>;
}

export function usePrice() {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error("usePrice must be used within a PriceProvider");
  return ctx;
}
