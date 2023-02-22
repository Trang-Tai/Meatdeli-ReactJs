import { useEffect, useState } from 'react';
import * as userServices from '../services/userServices';
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';
import useDecodeToken from './useDecodeToken';

function useCheckAdminLogin() {
    const { isLogin, role } = useDecodeToken({ deleteTokenIfError: true });
    return { isLogin, role }
}

export default useCheckAdminLogin;