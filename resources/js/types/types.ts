// src/types/types.ts

export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    rating: number;
    images?: string;
    main_image: string;
    description?: string;
    slang_price: number;
    category_id?: number | string;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CartItem {
    id: number;
    slug?: string;
    name?: string;
    image?: string;
    user_id: number;
    quantity: number;
    product: Product;
    product_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface CartItems {
    data: CartItem[];
}

export interface PaginatedProducts {
    data: Product[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
}

export interface HomeProps {
    CartItem?: CartItems;
    CartItems?: CartItems;
    categories: Category[];
    products: PaginatedProducts;
}

export interface ProductListProps {
    products: PaginatedProducts;
    categories: Category[];
}

export interface CategoryListProps {
    categories: Category[];
}

export interface MainProductListProps {
    products: {
        data: Product[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
    };
}

export interface Order {
    id: number;
    product: Product;
    // Add other relevant properties for the order
}

export interface SearchResults {
    data: Product[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface SearchProps {
    query: string;
    results: SearchResults;
}
export interface WishListProps {
    user_id: number;
    products: Product;
    product_id: number;
}
