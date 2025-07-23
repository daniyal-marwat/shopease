export interface Product {
  id: number;
  name: string;
  price: number;
  item_left?: number;
  new_arrival?: boolean;
  picture_url: string;
  out_of_stock?: boolean;
  description: string;
  category: string;
}
