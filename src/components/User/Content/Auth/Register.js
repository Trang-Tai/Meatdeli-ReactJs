import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userIsNotAuthenticated } from '../../../../hoc/authentication';
import './Register.scss'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userServices } from '../../../../services';
import ConfirmModal from '../../../ConfirmModal';
import validate from '../../../../utils/validate';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',

        checkValidInput: {},
    })

    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        redirect: false,
    })

    const closeModal = () => {
        setModal({
            isOpen: false,
            title: '',
            redirect: false,
        })
    }

    const MoveToLogin = () => {
        closeModal();
        navigate('/login')
    }

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
                constraint: ['required', 'min=3'],
            },
        ]
        const resultValid = validate(dataValid);
        for (const property in resultValid) {
            if(resultValid[property] !== null) {
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

    const handleSubmit = async () => {
        const error = await validInput()
        if(error) return;
        let data = {
            ...state,
        }
        try {
            const res = await userServices.registerUser(data);
            if (res.errCode === 0) {
                console.log(res);
                setModal({
                    isOpen: true,
                    title: 'Đăng kí thành công',
                    redirect: true,
                })
                setState({
                    email: '',
                    password: '',
                    phone: '',
                    firstName: '',
                    lastName: '',
                    checkValidInput: {},
                })
            }
        } catch (error) {
            console.log(error)
            setState((prev) => ({
                ...prev,
                checkValidInput: {},
            }));
            setModal({
                isOpen: true,
                title: error.errMessage || 'Server Error',
                redirect: false,
            })
        }
    }

    return (
        <div className="register-container">
            <div className='grid wide'>
                <div className='register-content'>
                    <div className='register-title'>
                        <span className='register-title-name'>Đăng kí tài khoản</span>
                        <span>Bạn đã có tài khoản? Đăng nhập <Link to={'/login'}>tại đây</Link></span>
                    </div>
                    <div className='row'>
                        <div className='col c-8 c-o-2 m-8 m-o-2 s-12 s-o-0'>
                            <div className='register-account'>
                                <span className='register-account-title'>THÔNG TIN CÁ NHÂN</span>
                                <span className='register-account-error' hidden>Missing input parameter</span>
                                <div className="register-account-item">
                                    <div className='register-account-item-fulfill'>
                                        <span>Họ: </span>
                                        <Input className='register-account-custom' size='medium'
                                            status='' placeholder=""
                                            value={state.firstName}
                                            onChange={(e) => handleOnChangeInput(e, 'firstName')}
                                        />
                                    </div>
                                    {/* <span className='register-account-item-error'>Vui lòng điền vào trường này</span> */}
                                </div>
                                <div className="register-account-item">
                                    <div className='register-account-item-fulfill'>
                                        <span>Tên: </span>
                                        <Input className='register-account-custom' size='medium'
                                            status='' placeholder=""
                                            value={state.lastName}
                                            onChange={(e) => handleOnChangeInput(e, 'lastName')}
                                        />
                                    </div>
                                    {/* <span className='register-account-item-error'>Vui lòng điền vào trường này</span> */}
                                </div>
                                <div className="register-account-item">
                                    <div className='register-account-item-fulfill'>
                                        <span>Số điện thoại: </span>
                                        <Input className='register-account-custom' size='medium'
                                            status='' placeholder=""
                                            value={state.phone}
                                            onChange={(e) => handleOnChangeInput(e, 'phone')}
                                        />
                                    </div>
                                    {/* <span className='register-account-item-error'>Vui lòng điền vào trường này</span> */}
                                </div>
                                <div className="register-account-item">
                                    <div className='register-account-item-fulfill'>
                                        <span>Email: </span>
                                        <Input className={`register-account-custom ${state.checkValidInput.email && 'valid-error'}`} size='medium'
                                            status='' placeholder=""
                                            value={state.email}
                                            onChange={(e) => handleOnChangeInput(e, 'email')}
                                        />
                                    </div>
                                    <span className='register-account-item-error'>{state.checkValidInput.email}</span>
                                </div>
                                <div className="register-account-item">
                                    <div className='register-account-item-fulfill'>
                                        <span>Mật khẩu: </span>
                                        <Input.Password
                                            className={`register-account-custom ${state.checkValidInput.password && 'valid-error'}`}
                                            size='medium'
                                            placeholder="Mật khẩu"
                                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            value={state.password}
                                            onChange={(e) => handleOnChangeInput(e, 'password')}
                                        />
                                    </div>
                                    <span className='register-account-item-error'>{state.checkValidInput.password}</span>
                                </div>
                                <Button type="primary" size='large' className="btn-login" onClick={() => handleSubmit()}>
                                    Đăng kí
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={modal.isOpen}
                title={modal.title}
                onCancel={closeModal}
                onConfirm={modal.redirect ? MoveToLogin : closeModal}
            />
        </div>
    )
}

export default userIsNotAuthenticated(Register);