// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';

import {  
    FETCH_CATEGORIES,
    FETCH_PRODUCTS,
} from './constants';

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
    fetchProductsSuccess,
    fetchProductsFailed,
} from './actions';

/**
 * Fetch Categories
 * @param {*} payload - businessId
 */
function* fetchBusinessCategories({ payload: { businessId } }) {
    const options = {
        body: JSON.stringify({ businessId }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, `${businessId}/categories`, options);
        yield put(fetchCategoriesSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(fetchCategoriesFailed(message));
    }
}

/**
 * Fetch Products
 * @param {*} payload - businessId
 */
function* fetchBusinessProducts({ payload: { businessId } }) {
    const options = {
        body: JSON.stringify({ businessId }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, `${businessId}/products`, options);
        yield put(fetchProductsSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(fetchProductsFailed(message));
    }
}

export function* watchFetchedCategories() {
    yield takeEvery(FETCH_CATEGORIES, fetchBusinessCategories);
}

export function* watchFetchedProducts() {
    yield takeEvery(FETCH_PRODUCTS, fetchBusinessProducts);
}

function* posSaga() {
    yield all([fork(watchFetchedCategories), fork(watchFetchedCategories)]);
}

export default posSaga;
