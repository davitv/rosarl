
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export type LOAD_PRODUCTS = typeof LOAD_PRODUCTS;

export const LOAD_FILTERING_ATTRIBUTES = 'LOAD_FILTERING_ATTRIBUTES';
export type LOAD_FILTERING_ATTRIBUTES = typeof LOAD_FILTERING_ATTRIBUTES;

export const LOAD_CART_PRODUCTS = 'LOAD_CART_PRODUCTS';
export type LOAD_CART_PRODUCTS = typeof LOAD_CART_PRODUCTS;

export const RESET_PRODUCTS = 'RESET_PRODUCTS';
export type RESET_PRODUCTS = typeof RESET_PRODUCTS;

// TODO: move this to some config...
export const IMAGES_PATH_URL = (process.env.NODE_ENV === 'development' ? 'http://95.213.236.60/media/images/' : '/media/images/');
export type IMAGES_PATH_URL = typeof IMAGES_PATH_URL;
