
import { Link, NavLink, Outlet } from 'react-router-dom';
import useDecodeToken from '../../../../customHook/useDecodeToken';
import { userIsAuthenticated } from '../../../../hoc/authentication';
import './NavAccount.scss'

function NavAccount() {
    const { userInfo } = useDecodeToken({});

    return (
        <div className="nav-account-container">
            <div className='grid wide'>
                <div className='nav-account-content'>
                    <div className='row'>
                        <div className='col c-3 m-12 s-12' style={{ marginBottom: '10px' }}>
                            <div className='nav-account-block'>
                                <span className='nav-account-title'>Trang tài khoản</span>
                                <span className='nav-account-current'>
                                    Xin chào
                                    <Link className='nav-account-name' to={'/account'}>&nbsp;{`${userInfo.firstName} ${userInfo.lastName}`}</Link>
                                </span>
                                <ul className='nav-account-list'>
                                    <li className='nav-account-item'>
                                        <NavLink to={'/account'}
                                            end
                                            className={({ isActive }) =>
                                                isActive ? 'primary-color' : undefined
                                            }
                                        >
                                            Thông tin tài khoản
                                        </NavLink>
                                    </li>
                                    <li className='nav-account-item'>
                                        <NavLink to={'/account/order-detail'}
                                            className={({ isActive }) =>
                                                isActive ? 'primary-color' : undefined
                                            }
                                        >
                                            Đơn hàng của bạn
                                        </NavLink>
                                    </li>
                                    <li className='nav-account-item'>
                                        <NavLink to={'/account/change-password'}
                                            className={({ isActive }) =>
                                                isActive ? 'primary-color' : undefined
                                            }
                                        >
                                            Đổi mật khẩu
                                        </NavLink>
                                    </li>
                                    <li className='nav-account-item'>
                                        <NavLink to={'/account/address'}
                                            className={({ isActive, ...props }) => {
                                                console.log(isActive, props)
                                                return isActive ? 'primary-color' : undefined
                                            }}
                                        >
                                            Địa chỉ
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col c-9 m-12 s-12'>
                            <Outlet context={userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userIsAuthenticated(NavAccount);