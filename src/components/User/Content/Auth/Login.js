
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { userIsNotAuthenticated } from '../../../../hoc/authentication';
import './Login.scss'
import { useState } from 'react';
import { userServices } from '../../../../services';
import { userActions } from '../../../../redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import validate from '../../../../utils/validate';
import ConfirmModal from '../../../ConfirmModal';

function Login() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        checkValidInput: {},

        emailReset: '',
        changePage: false,

        isOpen: false,
        title: '',
    })

    const handleOnChangeInput = (e, type) => {
        setState((prev) => {
            return {
                ...prev,
                [type]: e.target.value,
            }
        })
    }

    const validInput = async () => {
        let error = false;
        const dataValid = [
            {
                email: state.email,
                constraint: ['required', 'isEmail']
            },
            {
                password: state.password,
                constraint: ['required'],
            },
        ]
        const resultValid = validate(dataValid);
        for (const property in resultValid) {
            if (resultValid[property] !== null) {
                error = true;
                setState((prev) => ({
                    ...prev,
                    checkValidInput: resultValid,
                }));
                break;
            }
        }
        return error;
    }

    const handleLogin = async (data) => {
        // validate input
        const error = await validInput()
        if (error) return;

        // handle login
        const dataSend = {
            email: data.email,
            password: data.password,
        }
        try {
            const res = await userServices.handleLogin(dataSend);
            if (res.errCode === 0) {
                dispatch(userActions.loginSucceed({ token: res.accessToken }));
                setState({
                    email: '',
                    password: '',
                    checkValidInput: {},
                })
            }
        } catch (error) {
            dispatch(userActions.loginFailed());
        }
    }

    const closeModal = () => {
        setState((prev) => ({
            ...prev,
            isOpen: false,
            title: '',
        }))
    }

    const handleResetPassword = async (data) => {
        try {
            const res = await userServices.resetPassword({ receiverEmail: data.emailReset, });
            if(res.errCode === 0) {
                setState((prev) => ({
                    ...prev,
                    isOpen: true,
                    emailReset: '',
                    title: 'M???t kh???u m???i ???? dc g???i v??o email c???a b???n',
                    changePage: false,
                }))
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isOpen: true,
                title: error.errMessage || 'Server Error',
            }))
        }
    }

    return (
        <div className="login-container">
            <div className='grid wide'>
                <div className='login-content'>
                    <div className='login-title'>
                        <span className='login-title-name'>????ng nh???p t??i kho???n</span>
                        <span>B???n ch??a c?? t??i kho???n? ????ng k?? <Link to={'/register'}>t???i ????y</Link></span>
                    </div>
                    <div className='row'>
                        <div className='col c-8 c-o-2 m-8 m-o-2 s-12 s-o-0'>
                            {!state.changePage && 
                                <div className='login-account'>
                                    <span className='login-account-error' hidden>Missing input parameter</span>
                                    <div className="login-account-item">
                                        <div className='login-account-item-fulfill'>
                                            <span>Email: </span>
                                            <Input className={`login-account-custom ${state.checkValidInput.email && 'valid-error'}`} size='medium'
                                                status='' placeholder=""
                                                value={state.email}
                                                onChange={(e) => handleOnChangeInput(e, 'email')}
                                            />
                                        </div>
                                        <span className='login-account-item-error'>{state.checkValidInput.email}</span>
                                    </div>
                                    <div className="login-account-item">
                                        <div className='login-account-item-fulfill'>
                                            <span>M???t kh???u: </span>
                                            <Input.Password
                                                className={`login-account-custom ${state.checkValidInput.password && 'valid-error'}`}
                                                size='medium'
                                                placeholder="M???t kh???u"
                                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                value={state.password}
                                                onChange={(e) => handleOnChangeInput(e, 'password')}
                                            />
                                        </div>
                                        <span className='login-account-item-error'>{state.checkValidInput.password}</span>
                                    </div>
                                    <div className='forgot-password'>
                                        <span>Qu??n m???t kh???u? Nh???n v??o
                                            <span className='forgot-password-link' onClick={() => setState((prev) => ({ ...prev, changePage: true }))}> ????y</span>
                                        </span>
                                    </div>
                                    <Button type="primary"
                                        size='large'
                                        className="btn-login"
                                        onClick={() => handleLogin(state)}
                                    >
                                        ????ng nh???p
                                    </Button>
                                </div> ||
                                <div className='reset-password'>
                                    <span className='reset-password-title'>?????t l???i m???t kh???u</span>
                                    <span className='reset-password-subtitle'>Ch??ng t??i s??? g???i cho b???n m???t email ????? k??ch ho???t vi???c ?????t l???i m???t kh???u.</span>
                                    <div className='login-account-item-fulfill'>
                                        <Input className={`login-account-custom`} size='medium'
                                            status='' placeholder=""
                                            value={state.emailReset}
                                            onChange={(e) => handleOnChangeInput(e, 'emailReset')}
                                        />
                                    </div>
                                    <Button type="primary"
                                        size='large'
                                        className="btn-refresh-password"
                                        onClick={() => handleResetPassword(state)}
                                    >
                                        L???y l???i m???t kh???u
                                    </Button>
                                    <Button type="primary"
                                        size='large'
                                        className="btn-return"
                                        onClick={() => setState((prev) => ({ ...prev, changePage: false, }))}
                                    >
                                        Quay l???i
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={state.isOpen}
                title={state.title}
                onCancel={closeModal}
                onConfirm={closeModal}
            />
        </div>
    )
}

export default userIsNotAuthenticated(Login);