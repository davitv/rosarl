
export interface UIState {
    isHeaderCallbackFormSubmitted: boolean;
    headerCallbackFormSubmittedBy: string;
    headerCallbackFormSubmittedPhone: string;

    isFilteringOpen: boolean;

    selectedCategory: number;
    openCategories: number[];
    openProducts: number[];
}