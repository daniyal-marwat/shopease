import type { Product } from "./productTypes";

const dummyProducts = [
  {
    id: 1,
    name: "Rounded White Watch",
    price: 29.99,
    item_left: 0,
    out_of_stock: true,
    new_arrival: true,
    picture_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    price: 59.99,
    new_arrival: true,
    item_left: 12,
    picture_url:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 4,
    name: "Minimalist Backpack",
    price: 49.99,
    item_left: 12,
    new_arrival: false,
    picture_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 6,
    name: "Stylish Sunglasses",
    price: 24.99,
    new_arrival: true,
    item_left: 4,
    picture_url:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 9,
    name: "Cozy Hoodie",
    price: 39.99,
    new_arrival: false,
    item_left: 0,
    picture_url:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 12,
    name: "Smart Watch",
    price: 149.99,
    item_left: 1,
    new_arrival: true,
    picture_url:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
  {
    id: 13,
    name: "Simple Mug",
    price: 9.99,
    item_left: 20,
    new_arrival: false,
    picture_url:
      "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?q=80&w=1999&auto=format&fit=crop",
    description: "",
    category: "",
  },
];

export function getProductById(id: number): Product | undefined {
  return dummyProducts.find((product) => product.id === id);
}

export default dummyProducts;
