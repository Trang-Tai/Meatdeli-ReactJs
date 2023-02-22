import { useEffect, useState } from 'react';
import * as userServices from '../services/userServices';
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';

function useDecodeToken({ deleteTokenIfError = false }) {
    const token = useSelector(state => state.user.token);
    let decodedToken;
    const dispatch = useDispatch();
    if (token) { decodedToken = jwtDecode(token) }
    const [isLogin, setIsLogin] = useState(decodedToken?.isLogin);
    const [role, setRole] = useState(decodedToken?.role);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await userServices.decodeToken();
                // console.log(res);
                if (res.errCode === 0) {
                    setIsLogin(res.userInfo.isLogin);
                    setRole(res.userInfo.role);
                    setUserInfo(res.userInfo);
                }
            } catch (error) {
                console.log(error);
                if(deleteTokenIfError) {
                    dispatch(userActions.deleteUserToken())
                }
                setIsLogin(false);
                setRole('');
                setUserInfo({});
            }
        }
        fetchData();
    }, [token])
    return { isLogin, role, userInfo }
}

export default useDecodeToken;