import { userActions } from "../slice/userSlice";
import * as userServices from '../../services/userServices';
import { TYPE } from '../../utils/constant';
import { toast } from "react-toastify";
import { orderServices } from "../../services";

/*export const handleLogin = (data) => {
    return async function saveNewTodoThunk(dispatch, getState) {
        try {
            dispatch(userActions.loginStart());
            const response = await userServices.handleLogin(data);
            console.log(response)
            if(response.errCode !== 0) {
                dispatch(userActions.loginFailed())
            } else {
                dispatch(userActions.loginSucceed({ token: response?.accessToken }));
            }
        } catch (error) {
            dispatch(userActions.loginFailed());
        }
    }
}*/

export const handleLogout = () => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.handleLogout();
            if (response.errCode !== 0) {
                // dispatch(userActions.logoutFailed());
                alert('logout failed');
            } else {
                dispatch(userActions.logoutUser());
            }
        } catch (error) {
            // dispatch(userActions.logoutFailed());
            alert('logout failed');
        }
    }
}

export const fetchGender = (type = TYPE.GENDER) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.getKeyMapByType(type);
            if (response.errCode !== 0) {
                dispatch(userActions.fetchListGenderFailed());
            } else {
                dispatch(userActions.fetchListGenderSucceed({ listGenders: response.listType }));
            }
        } catch (error) {
            dispatch(userActions.fetchListGenderFailed());
        }
    }
}

export const fetchRole = (type = TYPE.ROLE) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.getKeyMapByType(type);
            if (response.errCode !== 0) {
                dispatch(userActions.fetchListRoleFailed());
            } else {
                dispatch(userActions.fetchListRoleSucceed({ roles: response.listType }));
            }
        } catch (error) {
            dispatch(userActions.fetchListRoleFailed());
        }
    }
}

export const fetchPayment = (type = TYPE.PAYMENT) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.getKeyMapByType(type);
            if (response.errCode !== 0) {
                dispatch(userActions.fetchListPaymentFailed());
            } else {
                dispatch(userActions.fetchListPaymentSucceed({ payments: response.listType }));
            }
        } catch (error) {
            dispatch(userActions.fetchListPaymentFailed());
        }
    }
}

export const fetchStatus = (type = TYPE.STATUS) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.getKeyMapByType(type);
            if (response.errCode !== 0) {
                dispatch(userActions.fetchListStatusFailed());
            } else {
                dispatch(userActions.fetchListStatusSucceed({ status: response.listType }));
            }
        } catch (error) {
            dispatch(userActions.fetchListStatusFailed());
        }
    }
}

export const createUser = (data) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.createUser(data);
            if (response.errCode !== 0) {
                // alert('failed');
                toast.error('failed');
            } else {
                // alert('succeed')
                toast.success('succeed');
                console.log(response);
                // dispatch(userActions.fetchListUsers());
            }
        } catch (error) {
            console.log(error);
            // alert('failed');
            toast.error('failed');
        }
    }
}

export const changePassword = (data) => {
    return async function (dispatch, getState) {
        try {
            const response = await userServices.changePassword(data);
            if (response.errCode !== 0) {
                toast.error('failed');
            } else {
                toast.success('succeed');
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            toast.error('failed');
        }
    }
}

export const fetchProvince = () => { // chơi ngu đáng lẽ phải viết hook
    return async function (dispatch, getState) {
        try {
            const response = await userServices.getListProvince();
            if (response.code === 200) {
                let customData = response.data.map((item, index) => {
                    return {
                        provinceID: item.ProvinceID,
                        provinceName: item.ProvinceName,
                    }
                })
                dispatch(userActions.fetchListProvinceSucceed({ provinces: customData }));
            } else {
                dispatch(userActions.fetchListProvinceFailed());
            }
        } catch (error) {
            dispatch(userActions.fetchListProvinceFailed());
        }
    }
}

export const getOrder = (data = {}) => {
    return async function (dispatch, getState) {
        try {
            const res = await orderServices.getOrder(data);
            if (res.errCode === 0) {
                dispatch(userActions.fetchOrderSucceed({ orderList: res.orders }))
            } else {
                toast.error('failed');
                dispatch(userActions.fetchOrderFailed());
            }
        } catch (error) {
            toast.error('failed');
            dispatch(userActions.fetchOrderFailed());
        }
    }
}

export const updateOrder = (data = {}) => {
    return async function (dispatch, getState) {
        try {
            const res = await orderServices.updateOrder(data);
            if (res.errCode === 0) {
                toast.success('success');
                if(data.oldStatus) {
                    dispatch(getOrder({ status: data.oldStatus }))
                } else {
                    dispatch(getOrder({ orderCode: data.orderCode }))
                }
            } else {
                toast.error('failed');
            }
        } catch (error) {
            toast.error('failed');
        }
    }
}