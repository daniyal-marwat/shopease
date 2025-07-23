import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import type { ReactNode } from "react";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function StoreLayout({ children }: { children?: ReactNode }) {
  return (
    <main className="flex min-h-[100dvh] flex-col">
      <NavBar />
      <div className="flex-grow">{children}</div>
      <MobileBottomNav />
      <Footer />
    </main>
  );
}
