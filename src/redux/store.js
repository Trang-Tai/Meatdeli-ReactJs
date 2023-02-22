import { configureStore, combineReducers, } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['token']
}

const productPersistConfig = {
    key: 'product',
    storage,
    whitelist: ['cartProducts']
}

const reducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    product: persistReducer(productPersistConfig, productReducer),
})

const store = configureStore({
    reducer: reducer,
    middleware: [thunk],
    // devTools: true, // use redux dev tool, default value is true
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // thunk automatically applied for configurestore
})

export const persistor = persistStore(store);
export const dispatch = store.dispatch;
export const state = store.getState();
export default store;