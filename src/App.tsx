import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./context/AuthContext";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./context/ThemeContext";
// import WishlistProvider from "./components/providers/WishlistProvider";

// Create the router
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AuthProvider>
          <ThemeProvider defaultTheme="system">
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
        {/* <WishlistProvider /> */}
        <Toaster theme="system" position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
