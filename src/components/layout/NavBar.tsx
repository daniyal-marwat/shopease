import { HeartIcon, ShoppingBasket, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "../toggle-theme";
import Search from "../SearchBar";

export default function NavBar() {
  return (
    <div className="p-2 flex items-center justify-between max-w-6xl m-auto sticky top-1 z-50 bg-white/10 backdrop-blur-sm rounded-full">
      <div className="items-center md:flex">
        <Link
          to={"/"}
          preload="intent"
          className="text-lg md:text-xl font-bold lg:border-r-2 pr-4"
        >
          <span>Shop</span>
          <span className="text-blue-600">Ease</span>
        </Link>
        <div className="hidden lg:flex">
          <Link to="/category/$category" params={{ category: "men" }}>
            <Button variant={"link"}>Men</Button>
          </Link>
          <Link to="/category/$category" params={{ category: "women" }}>
            <Button variant={"link"}>Women</Button>
          </Link>
          <Link to="/category/$category" params={{ category: "kids" }}>
            <Button variant={"link"}>Kids </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full md:w-fit">
        <Search />
        <div className="hidden justify-between gap-2 sm:flex">
          <Link to={"/wishlist"}>
            <Button className="rounded-full" variant={"secondary"}>
              <HeartIcon />
            </Button>
          </Link>
          <Link to={"/profile"}>
            <Button className="rounded-full" variant={"secondary"}>
              <UserIcon />
            </Button>
          </Link>
        </div>
        <Link to={"/cart"}>
          <Button className="rounded-full" variant={"secondary"}>
            <ShoppingBasket />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
