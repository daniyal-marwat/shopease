import CarouselProducts from "@/components/CarouselProducts";
import BestProduct from "@/components/BestProduct";
import { AnimatedTestimonials } from "@/components/AnimatedTestimonialProducts";
import { fetchHomeProducts } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";
import StoreLayout from "@/layouts/StoreLayout";

export const Route = createFileRoute("/")({
  component: Home,
  loader: homeProductsLoader,
  staleTime: 1000 * 30,
});

async function homeProductsLoader() {
  return fetchHomeProducts();
}

function Home() {
  const product = Route.useLoaderData();

  return (
    <StoreLayout>
      <div className="m-2 my-4 mb-24 overflow-x-hidden">
        <BestProduct products={product.bestProducts} />
        <div className=" mt-16 md:mt-32">
          <div className="w-full text-center">
            <h1 className="text-xl md:text-2xl font-semibold inline-block border-b-2 border-transparent hover:border-black transition-all duration-300">
              Best selling
            </h1>
          </div>

          <AnimatedTestimonials testimonials={product.bestSellers} />
        </div>

        <div className="mt-16 md:mt-32 overflow-x-hidden">
          <div className="w-full text-center">
            <h1 className="text-xl md:text-2xl font-semibold inline-block border-b-2 border-transparent hover:border-black transition-all duration-300">
              New arrivals
            </h1>
          </div>
          <div className="mt-8">
            <CarouselProducts products={product.newArrivals} />
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
