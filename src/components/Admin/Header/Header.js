import { Link } from 'react-router-dom';
import Navigator from './Navigator';
import { adminMenu, staffMenu } from './navMenu';
import logo from '../../../assets/logo-meatdeli.png';
import * as userActions from '../../../redux/actions/userActions';
import { useDispatch } from "react-redux";
import './Header.scss';

function Header(props) {
    let dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userActions.handleLogout());
    }

    return (
        <div className="header-container">
            <div className='header-content'>
                <input type='checkbox' className='header-mobile-select' id='nav-mobile-input' hidden />
                <div className="header-tabs-left">
                    <Link to={'/'}>
                        <div className='main-logo'>
                            <img className='img-logo' src={logo} />
                        </div>
                    </Link>
                    {/* <Navigator menus={this.state.menuApp} /> */}
                    <Navigator listMenu={props.role === 'R1' ? adminMenu: staffMenu} />
                </div>
                <label htmlFor='nav-mobile-input' className='header-mobile-overlay'></label>
                <div className='header-tabs-right'>
                    <label htmlFor='nav-mobile-input' className='header-bars'>
                        <i className="fas fa-bars"></i>
                    </label>
                    <div className='header-username'>
                        <span>Trang Tài</span>
                    </div>
                    {/* nút logout */}
                    <div className="btn-logout" onClick={() => handleLogout()}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;