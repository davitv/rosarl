
export interface UIState {
    isHeaderCallbackFormSubmitted: boolean;
    headerCallbackFormSubmittedBy: string;
    headerCallbackFormSubmittedPhone: string;

    isFilteringOpen: boolean;
    isCartOpen: boolean;

    selectedCategory: number;
    openCategories: number[];
    openProducts: number[];
}