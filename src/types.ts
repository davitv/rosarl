
import { RouterState } from 'react-router-redux';

import { IAuth } from './auth/types';
import { CategoriesState } from './categories/types';
import { UIState } from './ui/types';
import { ProductsState, Product } from './products/types';
import { CartState, OrderData } from './cart/types';
import { UserDetails } from './account/types';
import { ManufacturersState } from './manufacturers/types';

export interface AppState {
    auth: IAuth;
    userDetails: UserDetails;
    manufacturers: ManufacturersState;
    ui: UIState;
    router: RouterState;
    cart: CartState;
    categories: CategoriesState;
    products: ProductsState;
}

export * from './ui/types';
export * from './products/types';
export * from './account/types';
export * from './manufacturers/types';
