import axios from '../axios';

export const upsertProductLine = (data) => {
    return axios.post('/product/upsert-productline', data);
}

export const getAllProductLine = () => {
    return axios.get('/product/get-productline');
}

export const deleteProductLine = (data) => {
    return axios.delete('/product/delete-productline', { data: { productTypeCode: data } });
}

export const upsertProduct = (data) => {
    return axios.post('/product/upsert-product', data);
}

export const getProduct = ({ productCode = '', id = '', productType = '', isSubType = '' }) => {
    return axios.get(`/product/get-product?productCode=${productCode}&id=${id}&productType=${productType}&isSubType=${isSubType}`);
}

export const deleteProduct = (data) => {
    return axios.delete('/product/delete-product', { data: { arrId: data } });
}