
export interface Photo {
    id: number;
    image_url: string;
    product: number;
}

export interface Attribute {
    id: number;
    name: string;
    value: string;
}

export interface Product {
    product_id: number;
    name: string;
    article: string;
    description: string;
    product_s_desc: string;
    price: number;
    width: number;
    height: number;
    length: number;
    weight: number;

    product_full_image: string;
    product_thumb_image: string;
    images: Photo[];
    attributes: Attribute[];
}

export interface ProductsState {
    products: Product[];
}