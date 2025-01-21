import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function delay(milliseconds = 5000) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
