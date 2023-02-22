import axios from '../axios';

export const createOrder = (data) => {
    return axios.post('/order/create-payment-url', data);
}

export const vnPayReturnUrl = (query) => {
    return axios.get(`/order/vnpay_return?${query}`);
}

export const getOrder = ({ orderCode = '', userId = '', status = '' }) => {
    return axios.get(`/order/get-order?orderCode=${orderCode}&userId=${userId}&status=${status}`);
}

export const updateOrder = (data) => { // oederCode, status
    return axios.patch('/order/update-order', data);
}

export const rePaymentOrder = (data) => { // orderCode, paymentMethod
    return axios.patch('/order/re-payment-url', data);
}