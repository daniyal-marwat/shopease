export interface Address {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    zip_code?: string;
    is_default?: boolean;
    id: number;
}