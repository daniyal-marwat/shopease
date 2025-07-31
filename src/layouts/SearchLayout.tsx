import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import type { ReactNode } from "react";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import SearchSidebar from "@/components/layout/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Never used

export default function SearchLayout({ children }: { children?: ReactNode }) {
  return (
    <main className="flex min-h-[100dvh] flex-col">
      <NavBar />

      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={10} className="overflow-y-auto">
            <SearchSidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <MobileBottomNav />
      <Footer />
    </main>
  );
}
