import supabase from "./supabase.js";
import type { Product } from "../data/productTypes.js";
import type { Address } from "@/types/address.js";
import { clearLocalStorage, getBaseUrl } from "./utils.js";
import type { FilterParamsType } from "@/schemas/filter.js";
import type { Profile } from "@/types/profile.js";
import { toastMessage } from "./toastMessage.js";


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

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  if (error || !data) {
    return [];
  }

  return data;
}

// Authenticated
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
    toastMessage("Error adding to wishlist: "+error.message, "error");
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
    toastMessage("Error removing from wishlist: "+error.message, "error");
  }
}

export async function updateAddress(address: Address) {
  const { error } = await supabase
    .from("addresses")
    .update(address)
    .eq("id", address.id);

  if (error) {
    toastMessage("Error updating address: "+error.message, "error");
  }
}

export async function addAddress({
  is_default = false,
  ...address
}: Omit<Address, "id">) {
  const { error } = await supabase.from("addresses").insert({
    ...address,
    is_default,
  });     

  if (error) {
    toastMessage("Error adding address: "+error.message, "error");
  }
}

export async function getProfileData(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*,addresses(*)`)
    .order("id", { ascending: true, referencedTable: "addresses" })
    .single();


    

  if (error) {
    toastMessage("Error getting profile data: "+error.message, "error");
  }

  return data as Profile | null;  
}

export async function deleteAddress(id: number) {
  const { error } = await supabase.from("addresses").delete().eq("id", id);

  if (error) {
    toastMessage("Error deleting address: "+error.message, "error");
  }
}

export async function getCartItemsFromDB(): Promise<
  { product_id: number; quantity: number }[]
> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("product_id,quantity");

  if (error ) {
    toastMessage("Error getting cart items: "+error.message, "error");
    return [];
  }
  
  return data;
}

export async function insertCartItemToDB(product_id: number, quantity: number) {
  const { error } = await supabase
    .from("cart_items")
    .insert({ product_id, quantity });

  if (error) {
    toastMessage("Error inserting cart item: "+error.message, "error");
  }
}

export async function updateCartItemInDB(product_id: number, quantity: number) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("product_id", product_id);

  if (error) {
    toastMessage("Error updating cart item: "+error.message, "error");
  }
}

export async function deleteCartItemFromDB(product_id: number) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", product_id);

  if (error) {
    toastMessage("Error deleting cart item: "+error.message, "error");
  }
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toastMessage("Error logging out: "+error.message, "error");
  }

  clearLocalStorage();

  window.location.href = "/";
}

interface SearchProducts extends FilterParamsType {
  search: string;
  limit?: number;
  offset?: number;
}

export async function getSearchProducts({
  search,
  limit = 20,
  offset = 0,
  sort,
  priceRange,
}: SearchProducts): Promise<Product[]> {
  if (!search.trim()) return [];

  let query = supabase
    .from("products")
    .select("*")
    .ilike("name", `%${search}%`);

  if (priceRange) {
    query = query.gte("price", priceRange);
  }

  if (sort === "asc" || sort === "desc") {
    query = query.order("price", { ascending: sort === "asc" });
  } else if (sort === "popular") {
    query = query.order("id", { ascending: false });
  }

  query = query.range(offset, offset + limit-1);

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error getting search products:", error);
    throw error;
  }

  return data;
}


interface CategoryProducts extends FilterParamsType {
  category: string;
  offset?: number;
  limit?: number;
}

export async function getCatergoryProducts({category,limit=20,offset=0,sort,priceRange}:CategoryProducts): Promise<Product[]> { 
  let query = supabase
    .from("products")
    .select("*")
    .eq("category", category)

  if (priceRange) {
    query = query.gte("price", priceRange);
  }

  if (sort === "asc" || sort === "desc") {
    query = query.order("price", { ascending: sort === "asc" });
  } else if (sort === "popular") {
    query = query.order("id", { ascending: false });
  }

  query = query.range(offset, offset + limit-1);

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error getting category products:", error);
    throw error;
  }

  return data;
}



export async function signUp(email:string,password:string,fullname:string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw error;
  }
  await insertUser(fullname,email);

  return data;
}


export async function insertUser(fullname:string,email:string) {
  const { data, error } = await supabase.from("profiles").insert({ full_name:fullname, email });

  if (error) {
    throw error;
  }

  return data;
}

export async function login(email:string,password:string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
}


export async function updateUserPassword(password:string) {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }

  return data;
}

export async function resetPasswordForEmail(email:string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
  redirectTo:`${getBaseUrl()}/update-password`
  });

  if (error) {
    throw error;
  }

  return data;
}