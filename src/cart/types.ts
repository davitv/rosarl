
export interface CartProduct {
    product_id: number;
    name: string;
    price: number;
    images: string[];
}

export interface CartState {
    selectedItems: {[key: string]: number};
    products: CartProduct[];
}