import { BusinessType } from '../cart/types';

export interface Address {
    id:  number;
    method:  number;
    phone:  string;
    address:  string;
    city:  string;
    email:  null | string;
    full_name:  string;
    carrier:  string;
}

export interface OrderProduct {
    id: number;
    product: {
        name: string;
        article: string;
        description: string;
        price: number;
        images:[],
        product_s_desc: string;
        product_thumb_image:  string;
        product_full_image:  string;
        product_id: number;
        weight: number;
        width: number;
        height: number;
        length: number;
   },
   amount: number;
   order: number;
}

export interface Order {
    id: number;
    bank_name: string;
    bik: string;
    city: string;
    date_added: string;
    date_modified: string;
    delivery: number;
    delivery_method: string;
    email: string;
    first_name: string;
    individual_address: string;
    inn: string;
    korn: string;
    kpp: string;
    last_name: string;
    legal_address: string;
    order_type: BusinessType;
    organization_name: string;
    patronymic: string;
    phone: string;
    postal: string;
    rsn: string;
    products: OrderProduct[];
}

export interface UserDetails {
    orders: Order[];
    addresses: Address[];
}