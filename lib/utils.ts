import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number into a shorter string (e.g., 1.2K, 8.4M).
 */
export function formatCompactNumber(number: number): string {
  if (number < 1000) return number.toString();
  
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  
  return formatter.format(number);
}

/**
 * Formats a date into a readable string.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Platform color mapping for consistent branding.
 */
export const platformColors: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  tiktok: "#000000",
};
