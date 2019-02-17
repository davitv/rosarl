
import { IAuth } from './auth/types';
import { UIState } from './ui/types';
import { CategoriesState } from './categories/types';
import { RouterState } from 'react-router-redux';

export interface AppState {
    auth: IAuth;
    ui: UIState;
    router: RouterState;
    categories: CategoriesState;
}