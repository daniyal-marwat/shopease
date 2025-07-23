// import { Link } from "react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { HeartIcon, UserIcon } from "lucide-react";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden backdrop-blur-md">
      <div className="flex justify-around py-2">
        <Link to="/wishlist">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="text-xs">Wishlist</span>
          </Button>
        </Link>
        <Link to="/profile">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
