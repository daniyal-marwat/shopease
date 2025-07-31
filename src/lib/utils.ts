import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import supabase from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearLocalStorage() {
  localStorage.removeItem("cart");
  localStorage.removeItem("liked");
}

export async function isAuthenticated(): Promise<boolean> {
  const { data: user } = await supabase.auth.getSession();
  if (user.session) return true;
  return false;
}

export function getResizedImageUrl(url: string, style: string) {
  return url.replace("/upload", `/upload/${style}`);
}


export function getBaseUrl(): string {
  if(import.meta.env.MODE === "development") return "http://localhost:5173";
  return import.meta.env.VITE_APP_URL;
}
