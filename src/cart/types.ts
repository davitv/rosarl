import { Product } from '../products/types';

export enum BusinessType {
    INDIVIDUAL = 'individual',
    LEGAL = 'legal',
    RETAILER = 'retailer',
}

export interface OrderData {
    id?: number;
    order_type: BusinessType;
    organization_name: string;
    phone: string;
    email: string;

    inn: string;
    kpp: string;
    bik: string;
    korn: string;
    rsn: string;

    first_name: string;
    last_name: string;
    patronymic: string;
    legal_address: string;
    individual_address: string;
    city: string;
    postal: string;

    bank_name: string;

    products: {
        id: number;
        amount: number;

        product?: Product;
    }[];
}

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
    id?: number;
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
    orderData: Partial<OrderData>;
    deliveryData: Partial<DeliveryData>;
}

