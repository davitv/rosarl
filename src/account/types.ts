
export interface UserDetails {
    orders: {
        id: number;
        products:{
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
        }[];
    }[];
    addresses:{
        id:  number;
        method:  number;
        phone:  string;
        address:  string;
        city:  string;
        email:  null | string;
        full_name:  string;
        carrier:  number;
    }[];
}