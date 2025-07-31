import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

// lets assume this work
// ************************
export default function Filter({ route }: { route: any }) {
  const [sortValue, setSortValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const submitBtn = sortValue !== "" || priceValue !== "";

  const navigate = useNavigate();
  const currentSearch = useSearch({ from: route });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilter className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <p className="text-sm text-center my-2 border-b pb-1">Filter</p>

          {/* Sorting options */}
          <RadioGroup
            value={sortValue}
            onValueChange={setSortValue}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="asc" id="asc" />
              <Label htmlFor="asc">Ascending</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="desc" id="desc" />
              <Label htmlFor="desc">Descending</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular">Popular</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-center my-2 border-b pb-1">Ranges</p>

          {/* Price range options */}
          <RadioGroup
            value={priceValue}
            onValueChange={setPriceValue}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="25" id="price25" />
              <Label htmlFor="price25">$25</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="50" id="price50" />
              <Label htmlFor="price50">$50</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="100" id="price100" />
              <Label htmlFor="price100">$100</Label>
            </div>
          </RadioGroup>

          <div>
            <Button
              className="w-full mt-8"
              disabled={!submitBtn}
              onClick={() => {
                navigate({
                  to: route,
                  search: {
                    ...currentSearch,
                    ...(sortValue && {
                      sort: sortValue as "asc" | "desc" | "popular",
                    }),
                    ...(priceValue && {
                      priceRange: priceValue as "25" | "50" | "100",
                    }),
                  },
                });
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
