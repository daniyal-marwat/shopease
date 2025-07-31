import type { Address } from "./address";

export interface Profile {
    user_id:string;
    full_name:string;
    email:string;
    created_at:string;
    addresses:Address[];
}