import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ACTIONS, HOTLINE, TYPE } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import './SearchHeader.scss';
import { productActions, userActions } from "../../../redux/actions";
import customData from '../../../utils/customProductLineData';
import { NumericFormat } from 'react-number-format';
const { Search } = Input;
const POINT = 150;

function SearchHeader() {
    let divRef = useRef();
    const dispatch = useDispatch();
    const listProductLines = useSelector(state => state.product.listProductLines);
    let customListProductLines = customData(listProductLines);
    const listCartProducts = useSelector(state => state.product.cartProducts);

    const params = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const objSearchParams = Object.fromEntries([...searchParams]);

    const token = useSelector(state => state.user.token);

    const handleScroll = () => {
        let scrPos = window.scrollY;
        if (scrPos >= POINT) {
            divRef.current.className = 'header-with-search header_sticky';
        } else {
            divRef.current.className = 'header-with-search';
        }
    }

    useEffect(() => {
        // get scroll position 
        window.addEventListener('scroll', handleScroll);

        // get productlist
        if (!listProductLines || listProductLines.length <= 0) {
            dispatch(productActions.getAllProductLine());
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleSearch = (value) => {
        navigate(`/collections/${params.productLine || TYPE.ALL}?searchText=${value}`);
    }

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    const handleLogout = () => {
        dispatch(userActions.handleLogout());
    }

    return (
        <>
            <input id="open-nav-mobile-list" type={'checkbox'} hidden />
            <div ref={divRef} className={`header-with-search`}>
                <div className="header-nav-mobile">
                    <label htmlFor="open-nav-mobile-list">
                        <i className="fas fa-bars"></i>
                        <span>Danh m???c s???n ph???m</span>
                    </label>
                    <div className="nav-mobile">
                        <ul className="nav-list-mobile">
                            <li>
                                {
                                    token &&
                                    <>
                                        <Link to={'/account'}>T??i kho???n</Link>
                                        <span className="nav-mobile-logout" onClick={handleLogout}>????ng xu???t</span>
                                    </> ||
                                    <>
                                        <Link to={'/login'}>????ng nh???p</Link>
                                        <Link to={'/register'}>????ng k??</Link>
                                    </>
                                }
                            </li>
                            <li><Link to={'/'}>Trang ch???</Link></li>
                            <li>
                                S???n ph???m
                                <ul className="nav-product-line">
                                    <li><Link to={`/collections/${TYPE.ALL}`}>T???t C??? S???n Ph???m</Link></li>
                                    {
                                        customListProductLines.map((item, index) => {
                                            return (
                                                <li key={index + 1}>
                                                    <Link to={`/collections/${item.productTypeCode}`}>{item.productTypeName}</Link>
                                                    {item.children &&
                                                        <ul className="subnav-product-line">
                                                            {item.children.map((subItem, subIndex) => {
                                                                return (
                                                                    <li key={subIndex}>
                                                                        <Link to={`/collections/${subItem.productTypeCode}`}>{subItem.productTypeName}</Link>
                                                                    </li>)
                                                            })}
                                                        </ul>
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                    {/* <li>
                                        Th???t Heo T????i
                                        <ul className="subnav-product-line">
                                            <li>MEATDeli Premium</li>
                                            <li>N???i T???ng S???ch Khu???n An To??n</li>
                                            <li>MEATDeli Chu???n Ngon</li>
                                        </ul>
                                    </li>
                                    <li>Th???t G?? T????i</li>
                                    <li>S???n Ph???m ??n Li???n</li>
                                    <li>S???n Ph???m Ch??? Bi???n</li> */}
                                </ul>
                            </li>
                            <li>G??c ???m th???c</li>
                            <li>Gi???i thi???u</li>
                            <li>Li??n h???</li>
                        </ul>
                    </div>
                </div>
                <div className="header-logo-img">
                    <Link to={'/'}>
                        <img src="https://theme.hstatic.net/200000507659/1000893368/14/logo_medium.png?v=215" />
                    </Link>
                </div>
                <div className="header-search">
                    <Search
                        placeholder="search text"
                        style={{ width: '100%' }}
                        className=''
                        allowClear
                        // enterButton="Search"
                        enterButton
                        size="large"
                        onSearch={handleSearch}
                    />
                </div>
                <div className="header-contact">
                    <ul className="header-contact-list">
                        <li className="header-contact-item">
                            <img src="https://theme.hstatic.net/200000507659/1000893368/14/phone.png?v=215" />
                            <div className="header-contact-body">
                                <span className="contact-title">H??? tr??? kh??ch h??ng</span>
                                <a href={`tel:${HOTLINE}`}><b>{HOTLINE}</b></a>
                            </div>
                        </li>
                        <li className="header-contact-item">
                            <img src="https://theme.hstatic.net/200000507659/1000893368/14/account1.png?v=215" />
                            <div className="header-contact-body">
                                {
                                    token && 
                                    <>
                                        <Link to={'/account'} className="contact-title">T??i kho???n</Link>
                                        <div className="contact-logout" onClick={handleLogout}>????ng xu???t</div>
                                    </> ||
                                    <>
                                        <Link to={'/login'} className="contact-login">????ng nh???p</Link>
                                        <Link to={'/login'} className="contact-register">????ng k??</Link>
                                    </>
                                }
                            </div>
                        </li>
                        <li className="header-cart">
                            <div className="mini-cart">
                                <Link to={'/cart'} className='link-cart'>
                                    <i className="fas fa-shopping-bag"></i>
                                    <span className="cart-title">Gi??? h??ng</span>
                                    <span className="amout-item-cart">
                                        {listCartProducts && listCartProducts.length > 0 &&
                                            listCartProducts.reduce((accumulator, currentValue) => {
                                                return accumulator + currentValue.QtyInCart;
                                            }, 0) ||
                                            0
                                        }
                                    </span>
                                </Link>
                                <div className="cart-content">
                                    {
                                        listCartProducts && listCartProducts.length > 0 &&
                                        <ul className="mini-product-lists">
                                            <ul className="list-item-cart">
                                                {
                                                    listCartProducts.map((item, index) => {
                                                        return (
                                                            <li className="item-product" key={index}>
                                                                <div className="img-product">
                                                                    <Link to={`/products/${item.id}`}>
                                                                        <img src={item?.productImageData[0]?.image} />
                                                                    </Link>
                                                                </div>
                                                                <div className="info-product">
                                                                    <div className="product-details">
                                                                        <p className="product-name">{item.productName}</p>
                                                                        <span className="delete-product-cart-icon" onClick={() => handleAddQtyCart(item, 0, ACTIONS.DELETE_DIRECTLY)}>
                                                                            <i className="fas fa-times"></i>
                                                                        </span>
                                                                    </div>
                                                                    <div className="product-details-bottom">
                                                                        <span className="price-per-item">{`${item.salePrice || item.price}???`}</span>
                                                                        <span className="quantity-item">{`x ${item.QtyInCart}`}</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                {/* <li className="item-product">
                                                    <div className="img-product">
                                                        <Link to={'#'}>
                                                            <img src="https://res.cloudinary.com/dly4liyhf/image/upload/v1672042793/Meatdeli/Products/qo00seduldotl0pot9jo.webp" />
                                                        </Link>
                                                    </div>
                                                    <div className="info-product">
                                                        <div className="product-details">
                                                            <p className="product-name">PREMIUM Na??c no??ng 350gvncmv cnmvncmvnbdh</p>
                                                            <span className="delete-product-cart-icon"><i className="fas fa-times"></i></span>
                                                        </div>
                                                        <div className="product-details-bottom">
                                                            <span className="price-per-item">143,465???</span>
                                                            <span className="quantity-item">x 2</span>
                                                        </div>
                                                    </div>
                                                </li> */}
                                            </ul>
                                            <div className="total-price">
                                                <span className="title-price">T???ng ti???n t???m t??nh: <span style={{ color: 'red' }}>
                                                    <NumericFormat
                                                        className='currency'
                                                        value={
                                                            listCartProducts.reduce((accumulator, currentValue) => {
                                                                return accumulator + (currentValue.salePrice || currentValue.price)*currentValue.QtyInCart;
                                                            }, 0)
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'???'}
                                                    />
                                                </span></span>
                                            </div>
                                            <div className="btn-pay">
                                                <Link to={'/cart'}>Ti???n h??nh thanh to??n</Link>
                                            </div>
                                        </ul> ||
                                        'Kh??ng c?? s???n ph???m trong gi??? h??ng'
                                    }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <label htmlFor="open-nav-mobile-list" className='header-nav-mobile-overlay'></label>
        </>
    )
}

export default SearchHeader;