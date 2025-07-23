import HeroProductCard from "./productCard/HeroProductCard";
import type { Product } from "../data/productTypes";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BestProduct({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  let product = products[currentIndex];

  function setIndex(index: number) {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    setCurrentIndex(index);
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ x: 300, opacity: 0, scale: 0.98 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.98 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // smoother bezier curve
          }}
        >
          <HeroProductCard
            id={product.id}
            name={product.name}
            picture_url={product.picture_url}
          />
        </motion.div>
      </AnimatePresence>
      <div className="-translate-y-1/2 -translate-x-1/2 absolute bottom-0 left-1/2 flex gap-2">
        {products.map((_, index) => (
          <Dot
            key={index}
            current={index === currentIndex}
            index={index}
            setCurrentIndex={setIndex}
          />
        ))}
      </div>
    </div>
  );
}

function Dot({
  current,
  index,
  setCurrentIndex,
}: {
  current?: boolean;
  index: number;
  setCurrentIndex: (index: number) => void;
}) {
  return (
    <div
      onClick={() => {
        setCurrentIndex(index);
      }}
      className={
        "h-2 w-2 rounded-full " + (current ? "bg-white" : "bg-white/50")
      }
    ></div>
  );
}
