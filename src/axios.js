import axios from 'axios';
import { userActions } from './redux/slice/userSlice';
import store, { dispatch, state } from './redux/store';
import jwt_decode from "jwt-decode";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const refreshToken = async () => {
    try {
        const res = await axios.post("/user/refresh-token", {}, {
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true, // Make Axios send cookies in its requests automatically
        });
        return res.data;
    } catch (error) {
        const { response } = error;
        if(response == null) {
            return {
                errCode: -1,
                errMessage: 'error connection to server'
            }
        }
        return {
            status: error.response.status,
            ...error.response.data,
            accessToken: null,
        };
    }
}

instance.interceptors.request.use(async (config) => {
    let date = new Date();
    let accessToken = store.getState().user.token;
    // console.log(store.getState(), state.user, accessToken);
    if (accessToken) {
        let decodedToken = jwt_decode(accessToken);
        if (decodedToken && decodedToken.exp * 1000 < date.getTime()) {
            const res = await refreshToken();
            console.log(res);
            if (res.errCode === 0) {
                accessToken = res.accessToken;
                dispatch(userActions.saveUserToken({ token: res.accessToken }));
            } else {
                accessToken = null;
                // dispatch(userActions.deleteUserToken());
            }
        }

    }
    config.headers["token"] = `Bearer ${accessToken}`;
    return config;
}, function (error) {
    // Do something with request error
    console.log(error)
    // return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    const { data } = response;
    return data;
}, function (error) {
    console.log(error);
    return Promise.reject({
        status: error.response?.status,
        message: error.response?.data.errMessage || error.message,
        ...error.response?.data,
    });
});

export default instance;