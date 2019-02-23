
export enum CartState {
    productsList = 1,
    deliveryMethod,
    form,
    result,
}

export enum DeliveryMethod {
    MOSCOW = 0,
    RUSSIA,
    PICKUP
}

export interface UIState {
    isHeaderCallbackFormSubmitted: boolean;
    headerCallbackFormSubmittedBy: string;
    headerCallbackFormSubmittedPhone: string;
    cartState: CartState;
    isFilteringOpen: boolean;
    isCartOpen: boolean;
    selectedCategory: number;
    openCategories: number[];
    openProducts: number[];
}