import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCSRFToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1] || null;
}