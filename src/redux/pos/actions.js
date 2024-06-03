// @flow
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILED,
} from './constants';


export const fetchCategories = (businessId = 1) => ({
    type: FETCH_CATEGORIES,
    payload: { businessId }
});

export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories
});

export const fetchCategoriesFailed = (error) => ({
    type: FETCH_CATEGORIES_FAILED,
    payload: error
});

export const fetchProducts = (businessId) => ({
    type: FETCH_PRODUCTS,
    payload: { businessId }
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailed = (error) => ({
    type: FETCH_PRODUCTS_FAILED,
    payload: error
});
