
export interface Category {
    id: number;
    parent: number;
    name: string;
    children: Category[];
}

export type CategoriesState = Category[];