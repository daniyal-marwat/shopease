import { useCallback, useEffect, useState } from "react";

export default function useInViewport(): {
  isInViewport: boolean;
  ref: React.RefCallback<HTMLElement>;
} {
  const [isInViewport, setIsInViewport] = useState(false);
  const [refElement, setRefElement] = useState<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRefElement(node);
    }
  }, []);

  useEffect(() => {
    if (!refElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting); // <-- This line updates state on both enter/exit
    });

    observer.observe(refElement);

    return () => {
      observer.disconnect();
    };
  }, [refElement]);

  return { isInViewport, ref: setRef };
}
