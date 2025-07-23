import supabase from "./supabase.js";
import type { Product } from "../data/productTypes.js";
import type { Address } from "@/components/profile/Addresses.js";

export async function fetchHomeProducts(): Promise<{
  newArrivals: Product[];
  bestSellers: Product[];
  bestProducts: Product[];
}> {
  const [newArrival, bestSeller, bestProduct] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .eq("new_arrival", true)
      .limit(6),
    supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .limit(6),
    supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(6),
  ]);
  return {
    newArrivals: newArrival.data as Product[],
    bestSellers: bestSeller.data as Product[],
    bestProducts: bestProduct.data as Product[],
  };
}

export async function getProductById(
  id: number | string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getProductByIds(ids: number[]): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getWishlistedProducts(): Promise<
  { product_id: number; user_id: string; id: number }[]
> {
  const { data, error } = await supabase.from("wishlisted_items").select("*");

  if (error || !data) {
    return [];
  }

  return data;
}
export async function getWishlistedProductsIds(): Promise<number[]> {
  const { data, error } = await supabase
    .from("wishlisted_items")
    .select("product_id");

  if (error || !data) {
    return [];
  }

  return data.map((item) => item.product_id);
}

export async function addWishListProductToDB(
  id: number,
  user_id: string
): Promise<void> {
  const { error } = await supabase.from("wishlisted_items").insert({
    user_id: user_id,
    product_id: id,
  });

  if (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export async function removeWishListProductFromDB(
  id: number,
  user_id: string
): Promise<void> {
  const { error } = await supabase
    .from("wishlisted_items")
    .delete()
    .eq("user_id", user_id)
    .eq("product_id", id);

  if (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
}

export async function updateAddress(address: Address) {
  const { error } = await supabase
    .from("addresses")
    .update(address)
    .eq("id", address.id);

  if (error) {
    console.error("Error updating address:", error);
    throw error;
  }
}

export async function addAddress({
  is_default = false,
  ...address
}: {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  zip_code?: string;
  is_default?: boolean;
}) {
  const { error } = await supabase.from("addresses").insert({
    ...address,
    is_default,
  });

  if (error) {
    console.error("Error adding address:", error);
    throw error;
  }
}

export async function getProfileData() {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*,addresses(*)`)
    .order("id", { ascending: true, referencedTable: "addresses" })
    .single();

  if (error || !data) {
    console.error("Error getting profile data:", error);
    throw error;
  }

  return data;
}

export async function deleteAddress(id: number) {
  const { error } = await supabase.from("addresses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}
