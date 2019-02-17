
import { IAuth } from './auth/types';
import { UIState } from './ui/types';
import { CategoriesState } from './categories/types';

export interface AppState {
    auth: IAuth;
    ui: UIState;
    categories: CategoriesState;
}