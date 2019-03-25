

export interface Manufacturer {
        manufacturer_id: number;
        categories: {
            mf_category_id: number;
            mf_category_name: string;
            mf_category_desc: string | null;
            mf_category_image_url: string;
            mf_category_number: number;
            category_url:string;
            mf_id: number;
        }[];
        mf_name: string;
        mf_email: string | null;
        mf_desc: string | null;
        mf_category_id: string | null;
        mf_url: string | null;
        mf_image_url: string;
        mf_number: number;
}

 export type ManufacturersState = Manufacturer[];
