
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

export interface CompanyInfo {
    about: string;
    contacts: {
        address: string;
        managers: [string, string][];
        route: string;
        routeScheme: string;
        textAfter: string;
        textBefore: string;
        warehouseAddress: string;
    };
    payment: {
        image_url: string;
        text: string;
    };
}

export interface UIState {
    companyInfo: CompanyInfo;
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