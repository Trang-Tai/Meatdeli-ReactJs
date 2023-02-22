import { adminIsNotAuthenticated } from "../../hoc/authentication";
import { Col, Row, Button } from 'antd';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/slice/userSlice";
import * as userServices from '../../services/userServices';
import './Login.scss'
import { useDispatch, useSelector } from "react-redux";

function Login() {
    let [state, setState] = useState({
        email: '',
        password: '',
        errMessage: '',
        isAdmin: true,
    })
    let dispatch = useDispatch();

    const handleChangeInput = (e, type) => {
        setState((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const handleLogin = async (data) => {
        if (!data.email || !data.password) {
            let message = `Vui lòng nhập ${!data.email ? 'email' : ''} ${!data.password ? 'password' : ''}`;
            setState((prevState) => ({
                ...prevState,
                errMessage: message,
            }))
            return;
        }
        const dataSend = {
            email: data.email,
            password: data.password,
            isAdmin: data.isAdmin,
        }
        try {
            const res = await userServices.handleLogin(dataSend);
            if (res.errCode === 0) {
                dispatch(userActions.loginSucceed({ token: res.accessToken }));
                setState({
                    email: '',
                    password: '',
                    errMessage: '',
                    isAdmin: true,
                })
            } 
        } catch (error) {
            if(error.errCode) {
                dispatch(userActions.loginFailed());
                setState((prevState) => ({
                    ...prevState,
                    errMessage: 'Tên đăng nhập hoặc mật khẩu không đúng',
                }))
            }
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <Row>
                    <Col xs={24} sm={24} md={8} lg={12}>
                        <div className="login-img"></div>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={12}>
                        <div className="login-form">
                            <span className="form-title">Thịt sạch MEATDeli - Login</span>
                            <span className={`form-error-message ${state.errMessage && 'active'}`}>{state.errMessage}</span>
                            <input type='text'
                                className="username-login-inp"
                                placeholder="Email"
                                value={state.email}
                                onChange={(e) => handleChangeInput(e, 'email')}
                            />
                            <input type='password'
                                className="pass-login-inp"
                                placeholder="Password"
                                value={state.password}
                                onChange={(e) => handleChangeInput(e, 'password')}
                            />
                            <Link className="form-forgot-pass">Forgot password</Link>
                            <Button type="primary" size='medium' className="btn-login" onClick={() => handleLogin(state)}>
                                Login
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default adminIsNotAuthenticated(Login);