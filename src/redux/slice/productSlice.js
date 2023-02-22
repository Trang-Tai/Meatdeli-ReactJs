import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProductLines: [],
        listProducts: [],
        cartProducts: [],
    },
    reducers: {
        createProductLineSucceed: (state) => {
        },
        fetchProductLineSucceed: (state, action) => {
            state.listProductLines = action.payload.listProductLines;
        },
        fetchProductLineFailed: (state) => {
            state.listProductLines = [];
        },
        deleteProductLineSucceed: (state) => {
        },

        createProductSucceed: (state) => {
        },
        fetchProductSucceed: (state, action) => {
            state.listProducts = action.payload.listProducts;
        },
        fetchProductFailed: (state) => {
            state.listProducts = [];
        },
        deleteProductSucceed: (state) => {
        },

        createCartProductSucceed: (state, action) => {
            state.cartProducts = action.payload.cartProducts;
        },
        deleteCartProductSucceed: (state, action) => {
            state.cartProducts = action.payload.cartProducts;
        },
    }
})

const productActions = productSlice.actions;
export { productActions }
export default productSlice.reducer;