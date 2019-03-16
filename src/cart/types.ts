

export enum DeliveryMethod {
    MOSCOW = 0,
    RUSSIA,
    PICKUP
}

export interface CartProduct {
    product_id: number;
    name: string;
    price: number;
    images: string[];
}

export interface DeliveryData {
    full_name: string;
    method: DeliveryMethod;
    phone: string;
    address: string;
    city: string;

    // Russia delivery only
    carrier: string;
}

export interface CartState {
    selectedItems: {[key: string]: number};
    products: CartProduct[];
    deliveryData: Partial<DeliveryData>;
}