import { useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

export default function SearchSidebar() {
  const [sortValue, setSortValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");

  const submitBtn = sortValue !== "" || priceValue !== "";
  return (
    <div className="relative">
      <div className="absolute top-1/2">
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
              console.log(sortValue, priceValue);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
