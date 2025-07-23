import LostPage from "@/components/LostPage";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  notFoundComponent: LostPage,
});
