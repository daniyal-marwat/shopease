import { HeartIcon, SearchIcon, ShoppingBasket, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <div className="p-2 flex items-center justify-between max-w-6xl m-auto sticky top-0 z-50 bg-white/10 backdrop-blur-sm rounded-full">
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
          <Button variant={"link"}>Men</Button>
          <Button variant={"link"}>Women</Button>
          <Button variant={"link"}>Kids </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full md:w-fit">
        <div className="w-full relative">
          <Input
            className="rounded-full md:w-md lg:w-lg placeholder:text-sm"
            placeholder="Find product"
          ></Input>
          <SearchIcon className=" absolute top-[6px] right-2 size-5 text-black/40" />
        </div>
        <div className="hidden justify-between gap-2 sm:flex">
          <Link to={"/wishlist"} preload="intent">
            <Button className="rounded-full" variant={"secondary"}>
              <HeartIcon />
            </Button>
          </Link>
          <Link to={"/profile"} preload="intent">
            <Button className="rounded-full" variant={"secondary"}>
              <UserIcon />
            </Button>
          </Link>
        </div>
        <Link to={"/"}>
          <Button className="rounded-full" variant={"secondary"}>
            <ShoppingBasket />
          </Button>
        </Link>
      </div>
    </div>
  );
}
