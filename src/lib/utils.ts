import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currencyCode: string = "USD", // Use ISO 4217 currency code
  decimalPlaces: number = 2,
  locale: string = "en-US"
): string {
  // Ensure the amount is a number
  if (isNaN(amount)) {
    throw new Error("Invalid amount: must be a number");
  }

  // Create a formatted currency string
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode, // Use the provided currency code
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
}

