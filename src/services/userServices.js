import axios from '../axios';
import { PRODUCT_INFO_GHN } from '../utils/constant';

export const handleLogin = (data) => {
    return axios.post('/user/login', data);
}

export const decodeToken = () => {
    return axios.post('/user/decode-token');
}

export const handleLogout = () => {
    return axios.post('/user/logout');
}

export const getKeyMapByType = (type) => {
    return axios.get(`/allcode/keymap?type=${type}`);
}

// cái này đáng lẽ là update user 
export const createUser = (data) => {
    return axios.post('/user/upsert', data);
}

export const registerUser = (data) => {
    return axios.post('/user/register', data);
}

export const getUser = ({ email = '', paranoid = '', id = '' }) => {
    return axios.get(`/user/get-user-info?paranoid=${paranoid}&email=${email}&id=${id}`);
}

export const deleteUser = (data) => {
    return axios.delete('/user/delete-user', { data: { listUsers: data } });
}

export const restoreUser = (data) => {
    return axios.post('/user/restore-user', { listUsers: data });
}

export const deletePermanentUser = (data) => {
    return axios.delete('/user/delete-permanent-user', { data: { listUsers: data } });
}

export const resetPassword = (data) => {
    return axios.post('/user/reset-password', data);
}

export const changePassword = (data) => {
    return axios.patch('/user/change-password', data);
}

export const getListProvince = async () => {
    return (await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.REACT_APP_TOKEN_GHN,
        },
    })).json();
}

export const getListDistrict = async (provinceId) => {
    return (await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.REACT_APP_TOKEN_GHN,
        },
    })).json();
}

export const getListWard = async (districtId) => {
    return (await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.REACT_APP_TOKEN_GHN,
        },
    })).json();
}

export const getShippingFee = async (fromDistrictId, toDistrictId, toWardCode, serviceId) => {
    return (await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.REACT_APP_TOKEN_GHN,
            'ShopId': +process.env.REACT_APP_SHOPID_GHN, // interger
        },
        body: JSON.stringify({
            from_district_id: fromDistrictId,
            service_id: serviceId,
            to_district_id: toDistrictId,
            to_ward_code: toWardCode,
            height: PRODUCT_INFO_GHN.height,
            length: PRODUCT_INFO_GHN.length,
            weight: PRODUCT_INFO_GHN.weight,
            width: PRODUCT_INFO_GHN.width
        })
    })).json();
}