import { productActions } from "../slice/productSlice";
import { productServices } from '../../services';
import { ACTIONS, TYPE } from '../../utils/constant';
import { toast } from "react-toastify";

export const getAllProductLine = () => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.getAllProductLine();
            if (res.errCode === 0) {
                dispatch(productActions.fetchProductLineSucceed({ listProductLines: res.data }))
            } else {
                toast.error('failed');
                dispatch(productActions.fetchProductLineFailed());
            }
        } catch (error) {
            toast.error('failed');
            dispatch(productActions.fetchProductLineFailed());
        }
    }
}

export const upsertProductLine = (data) => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.upsertProductLine(data);
            if (res.errCode === 0) {
                toast.success('succeed')
                dispatch(productActions.createProductLineSucceed());
                dispatch(getAllProductLine());
            } else {
                toast.error('failed');
            }
        } catch (error) {
            toast.error('failed');
        }
    }
}

export const deleteProductLine = (data) => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.deleteProductLine(data);
            if (res.errCode === 0) {
                toast.success('succeed')
                dispatch(productActions.deleteProductLineSucceed());
                dispatch(getAllProductLine());
            } else {
                toast.error('failed');
            }
        } catch (error) {
            toast.error('failed');
        }
    }
}

export const getProduct = (data = {}) => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.getProduct(data);
            if (res.errCode === 0) {
                dispatch(productActions.fetchProductSucceed({ listProducts: res.products }))
            } else {
                toast.error('failed');
                dispatch(productActions.fetchProductFailed());
            }
        } catch (error) {
            toast.error('failed');
            dispatch(productActions.fetchProductFailed());
        }
    }
}

export const upsertProduct = (data) => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.upsertProduct(data);
            if (res.errCode === 0) {
                toast.success('succeed')
                dispatch(productActions.createProductSucceed());
                dispatch(getProduct());
            } else {
                toast.error(res.errMessage);
            }
        } catch (error) {
            toast.error(error.errMessage);
        }
    }
}

export const deleteProduct = (data) => {
    return async function (dispatch, getState) {
        try {
            const res = await productServices.deleteProduct(data);
            if (res.errCode === 0) {
                toast.success('succeed')
                dispatch(productActions.deleteProductSucceed());
                dispatch(getProduct());
            } else {
                toast.error('failed');
            }
        } catch (error) {
            toast.error(error.errMessage);
        }
    }
}

export const addProductCart = (productInfo, QtyInCart, action = '') => {
    return async function (dispatch, getState) {
        const currentCart = getState().product.cartProducts;
        let newCart = [...currentCart];
        const found = newCart.find(element => element.productCode === productInfo.productCode);
        if (found) {
            if (action === ACTIONS.DELETE_DIRECTLY || (found.QtyInCart < 2 && +QtyInCart < 0) || +QtyInCart === 0) {
                newCart = newCart.filter(element => element.productCode !== productInfo.productCode);
            } else {
                newCart = newCart.map((item, index) => {
                    if (item.productCode === found.productCode) {
                        if (action === ACTIONS.CHANGE_DIRECTLY) {
                            return {
                                ...item,
                                QtyInCart: +QtyInCart,
                            }
                        }
                        return {
                            ...item,
                            QtyInCart: found.QtyInCart + QtyInCart,
                        }
                    }
                    return item;
                })
            }
        } else {
            if(+QtyInCart > 0) {
                newCart.push({ ...productInfo, QtyInCart: +QtyInCart, });
            }
        }
        console.log(currentCart, newCart)
        dispatch(productActions.createCartProductSucceed({ cartProducts: newCart }));
    }
}

export const deleteAllProductCart = () => {
    return async function (dispatch, getState) {
        dispatch(productActions.deleteCartProductSucceed({ cartProducts: [] }));
    }
}