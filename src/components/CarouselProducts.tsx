import ProductCard from "@/components/productCard/ProductCard";
import type { Product } from "@/data/productTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function getProductToShow(width: number) {
  if (width > 1520) {
    return 5;
  }
  if (width > 1280) {
    return 4;
  }
  if (width > 1024) {
    return 3;
  }
  if (width > 610) {
    return 2;
  }
  return 1;
}

export default function CarouselProducts({
  products,
}: {
  products: Product[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState(() => {
    let currentWidth = window.innerWidth;
    return getProductToShow(currentWidth);
  });
  const total = products.length;

  useEffect(() => {
    function hadnleResize() {
      let currentWidth = window.innerWidth;
      setProductsToShow(getProductToShow(currentWidth));
    }

    window.addEventListener("resize", hadnleResize);
    return () => {
      window.removeEventListener("resize", hadnleResize);
    };
  }, []);

  const getProductsToDisplay = (startIndex: number) => {
    const endIndex = startIndex + productsToShow;

    if (endIndex <= total) {
      return products.slice(startIndex, endIndex);
    } else {
      return [
        ...products.slice(startIndex, total),
        ...products.slice(0, endIndex % total),
      ];
    }
  };

  const productsToDisplay = getProductsToDisplay(currentIndex);

  const handleLeftArrow = () => {
    setCurrentIndex((prev) => (prev + productsToShow) % total);
  };

  const handleRightArrow = () => {
    setCurrentIndex((prev) => (prev - productsToShow + total) % total);
  };
  return (
    <div className="flex justify-center overflow-x-scroll gap-4 relative">
      {productsToDisplay.map((product: Product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            picture_url={product.picture_url}
            name={product.name}
            price={product.price}
            item_left={product.item_left}
            new_arrival={product.new_arrival}
            out_of_stock={product.out_of_stock}
          />
        );
      })}

      <div
        onClick={handleLeftArrow}
        onKeyDown={(e) => {
          e.key === "Enter" && handleLeftArrow();
        }}
        tabIndex={0}
        className="absolute  left-0 bg-black/40 rounded-full p-2 top-1/2 translate-y-[-50%] cursor-pointer"
      >
        <ArrowLeft className="text-white" />
      </div>
      <div
        onClick={handleRightArrow}
        className="absolute right-0 bg-black/40 rounded-full p-2 top-1/2 translate-y-[-50%] cursor-pointer"
      >
        <ArrowRight className="text-white" />
      </div>
    </div>
  );
}
