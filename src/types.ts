
import { RouterState } from 'react-router-redux';

import { IAuth } from './auth/types';
import { CategoriesState } from './categories/types';
import { UIState } from './ui/types';
import { ProductsState } from './products/types';

export interface AppState {
    auth: IAuth;
    ui: UIState;
    router: RouterState;
    categories: CategoriesState;
    products: ProductsState;
}