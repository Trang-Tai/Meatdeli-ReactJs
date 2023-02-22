import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productActions } from '../../../redux/actions';
import { TYPE } from '../../../utils/constant';
import customData from '../../../utils/customProductLineData';
import './NavHeader.scss'

function NavHeader() {
    const dispatch = useDispatch();
    const listProductLines = useSelector(state => state.product.listProductLines);
    let customListProductLines = customData(listProductLines);

    useEffect(() => {
        // get productLinelist
        if (!listProductLines || listProductLines.length <= 0) {
            dispatch(productActions.getAllProductLine());
        }
    }, [])

    return (
        <div className="header-nav-container">
            <div className='header-nav-content'>
                <ul className='header-nav-list-menugroup'>
                    <li className='header-nav-menugroup'>
                        <Link to={'/'}>Trang chủ</Link>
                    </li>
                    <li className='header-nav-menugroup'>
                        <Link to={'#'}>Sản phẩm</Link>
                        <ul className='header-nav-list-menu'>
                            <li className='header-nav-menu'>
                                <Link to={`/collections/${TYPE.ALL}`}>Tất cả sản phẩm</Link>
                            </li>
                            {
                                customListProductLines.map((item, index) => {
                                    return (
                                        <li className='header-nav-menu' key={index + 1}>
                                            <Link to={`/collections/${item.productTypeCode}`}>{item.productTypeName}</Link>
                                            {item.children &&
                                                <ul className='header-nav-list-submenu'>
                                                    {item.children.map((subItem, subIndex) => {
                                                        return (
                                                            <li className='header-nav-submenu' key={subIndex}>
                                                                <Link to={`/collections/${subItem.productTypeCode}`}>{subItem.productTypeName}</Link>
                                                            </li>)
                                                    })}
                                                </ul>
                                            }
                                        </li>
                                    )
                                })
                            }
                            {/* <li className='header-nav-menu'>
                                <Link to={'#'} onClick={() => console.log('a')}>Thịt heo tươi</Link>
                                <ul className='header-nav-list-submenu'>
                                    <li className='header-nav-submenu'>
                                        <Link to={'#'}>MEATDELI Premium</Link>
                                    </li>
                                    <li className='header-nav-submenu'>
                                        <Link to={'#'}>Nội tạng sạch khuẩn an toàn</Link>
                                    </li>
                                    <li className='header-nav-submenu'>
                                        <Link to={'#'}>MEATDELI Chuẩn ngon</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='header-nav-menu'>
                                <Link to={'#'}>Thịt gà tươi</Link>
                            </li>
                            <li className='header-nav-menu'>
                                <Link to={'#'}>Sản phẩm ăn liền</Link>
                            </li>
                            <li className='header-nav-menu'>
                                <Link to={'#'}>Sản phẩm chế biến</Link>
                            </li>
                            <li className='header-nav-menu'>
                                <Link to={'#'}>Gia vị</Link>
                            </li> */}
                        </ul>
                    </li>
                    <li className='header-nav-menugroup'>
                        <Link to={'#'}>Góc ẩm thực</Link>
                    </li>
                    <li className='header-nav-menugroup'>
                        <Link to={'#'}>Giới thiệu</Link>
                    </li>
                    <li className='header-nav-menugroup'>
                        <Link to={'#'}>Liên hệ</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavHeader;