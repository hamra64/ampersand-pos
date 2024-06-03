// @flow
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILED,
} from './constants';

const INIT_STATE = {
    categories: [],
    products: [],
    loading: false,
};

const Pos = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return { ...state, loading: true };
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload, loading: false, error: null };
        case FETCH_CATEGORIES_FAILED:
            return { ...state, error: action.payload, loading: false };
        case FETCH_PRODUCTS:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, loading: false, error: null };
        case FETCH_PRODUCTS_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Pos;
