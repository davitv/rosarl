
import { RouterState } from 'react-router-redux';

import { IAuth } from './auth/types';
import { CategoriesState } from './categories/types';
import { UIState } from './ui/types';
import { ProductsState, Product } from './products/types';
import { CartState, OrderData } from './cart/types';


export interface AppState {
    auth: IAuth;
    ui: UIState;
    router: RouterState;
    cart: CartState;
    categories: CategoriesState;
    products: ProductsState;
}

export * from './ui/types';
export * from './products/types';
