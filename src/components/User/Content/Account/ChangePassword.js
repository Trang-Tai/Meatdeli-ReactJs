
import { Button, Input } from 'antd';
import Select from 'react-select';
import { useOutletContext } from 'react-router-dom';
import useFetchUserInfo from '../../../../customHook/useFetchUserInfo';
import './ChangePassword.scss'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { userActions } from '../../../../redux/actions';

function ChangePassword() {
    const dispatch = useDispatch();
    const userInfo = useOutletContext();

    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',

        loading: false,
        disabled: false,
    })

    const handleOnChangeInput = (e, type) => {
        setState((prev) => ({
            ...prev,
            [type]: e.target.value,
        }))
    }

    const handleSubmit = () => {
        const data = {
            email: userInfo.email,
            oldPassword: state.oldPassword,
            newPassword: state.newPassword,
        }
        setState((prev) => ({
            ...prev,
            loading: true,
            disabled: true,
        }))
        dispatch(userActions.changePassword(data));
        setTimeout(() => {
            setState((prev) => ({
                ...prev,
                loading: false,
                disabled: false,
                oldPassword: '',
                newPassword: '',
            }))
        }, 2000);
    }

    return (
        <div className="password-container">
            <div className='grid wide'>
                <div className='password-content'>
                    <span className='password-title'>Đổi mật khẩu</span>
                    <div className='password-block'>
                        <div className="password-item">
                            <span>Nhập mật khẩu cũ: </span>
                            <Input className='password-input-custom' size='large'
                                value={state.oldPassword}
                                onChange={(e) => handleOnChangeInput(e, 'oldPassword')}
                            />
                        </div>
                        <div className="password-item">
                            <span>Nhập mật khẩu mới: </span>
                            <Input className='password-input-custom' size='large'
                                value={state.newPassword}
                                onChange={(e) => handleOnChangeInput(e, 'newPassword')}
                            />
                        </div>
                        <Button type="primary" size='large'
                            className="btn-create"
                            onClick={handleSubmit}
                            loading={state.loading}
                            disabled={state.disabled}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;