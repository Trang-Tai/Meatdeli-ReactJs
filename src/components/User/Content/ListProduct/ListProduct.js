import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productActions } from "../../../../redux/actions";
import { ACTIONS } from "../../../../utils/constant";
import customData from "../../../../utils/customProductLineData";
import { searchProductByName } from "../../../../utils/searchProduct";
import './ListProduct.scss';

const productsPerPage = 8;

function ListProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productLineCodeParam = params.productLine.split('-');

    const [searchParams, setSearchParams] = useSearchParams();
    const objSearchParams = Object.fromEntries([...searchParams]);
    // console.log(objSearchParams, searchParams.entries);

    const listProductLines = useSelector(state => state.product.listProductLines);
    let customListProductLines = customData(listProductLines);
    const listProducts = useSelector(state => state.product.listProducts);
    let customListProducts = searchProductByName(listProducts, objSearchParams.searchText || '', productLineCodeParam);

    const listCartProducts = useSelector(state => state.product.cartProducts);
    const [toggleBtnCode, setToggleBtnCode] = useState('');

    let convertNumberToArray = (number) => {
        let arr = [];
        for (let i = 0; i < number; i++) {
            arr.push(i);
        }
        return arr;
    }
    const [numberOfPage, setNumberOfPage] = useState(convertNumberToArray(Math.floor(customListProducts.length / productsPerPage) + (customListProducts.length % productsPerPage > 0)));

    useEffect(() => {
        // get productLinelist
        if (!listProductLines || listProductLines.length <= 0) {
            dispatch(productActions.getAllProductLine());
        }
        if (!listProducts || listProducts.length <= 0) {
            dispatch(productActions.getProduct());
        }
    }, [])

    useEffect(() => {
        let number = Math.floor(customListProducts.length / productsPerPage) + (customListProducts.length % productsPerPage > 0);
        setNumberOfPage(convertNumberToArray(number));
    }, [customListProducts.length])

    const handleChangePage = (pageNumber) => {
        setSearchParams(prev => {
            // console.log(Object.fromEntries([...prev]));
            return {
                ...Object.fromEntries([...prev]),
                page: pageNumber,
            }
        })
    }

    const handleChangeSearch = (value, type) => {
        setSearchParams(prev => {
            return {
                searchText: prev.get('searchText') || '',
                [type]: value,
            }
        })
    }

    const handleSort = (a, b) => {
        if (objSearchParams.price) {
            if (objSearchParams.price === 'asc') {
                return (a.salePrice || a.price) - (b.salePrice || b.price)
            } else if (objSearchParams.price === 'desc') {
                return (b.salePrice || b.price) - (a.salePrice || a.price)
            } else {
                return 0;
            }
        }
        if (objSearchParams.title) {
            const nameA = a.productName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.productName.toUpperCase(); // ignore upper and lowercase
            if (objSearchParams.title === 'asc') {
                return nameA < nameB ? -1 : 1;
            } else if (objSearchParams.title === 'desc') {
                return nameA < nameB ? 1 : -1;
            }
        }

        return 0;
    }

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    return (
        <div className="list-product-container">
            <div className="grid wide">
                <div className="list-product-content">
                    <span className="list-product-title">{productLineCodeParam.length > 1 ? 'Đặc sản meatdeli' : listProductLines.filter(x => x.productTypeCode === productLineCodeParam[0])[0]?.productTypeName || 'tất cả sản phẩm'}</span>
                    <div className="list-product-filter">
                        <span className="list-product-filter-title">Sắp xếp: </span>
                        <ul className="list-product-filter-list">
                            <li className="list-product-filter-item"
                                onClick={() => {
                                    if (!objSearchParams.title) {
                                        handleChangeSearch('asc', 'title');
                                    } else if (objSearchParams.title === 'asc') {
                                        handleChangeSearch('desc', 'title');
                                    } else {
                                        handleChangeSearch('', 'title');
                                    }
                                }}
                            >
                                <span className="list-product-filter-item-name">Tên</span>
                                {
                                    objSearchParams.title === 'asc' && <i className="fas fa-arrow-up"></i> ||
                                    objSearchParams.title === 'desc' && <i className="fas fa-arrow-down"></i>
                                }
                            </li>
                            <li className="list-product-filter-item"
                                onClick={() => {
                                    if (!objSearchParams.price) {
                                        handleChangeSearch('asc', 'price');
                                    } else if (objSearchParams.price === 'asc') {
                                        handleChangeSearch('desc', 'price');
                                    } else {
                                        handleChangeSearch('', 'price');
                                    }
                                }}
                            >
                                <span className="list-product-filter-item-name">Giá</span>
                                {
                                    objSearchParams.price === 'asc' && <i className="fas fa-arrow-up"></i> ||
                                    objSearchParams.price === 'desc' && <i className="fas fa-arrow-down"></i>
                                }
                            </li>
                        </ul>
                    </div>
                    <div className="product-card-list row">
                        {
                            customListProducts && customListProducts.length > 0 &&
                            [...customListProducts].sort(handleSort).slice((objSearchParams.page || 0) * productsPerPage, (objSearchParams.page || 0) * productsPerPage + productsPerPage).map((item, index) => {
                                return (
                                    <div className="col c-3 m-3 s-6" key={index}>
                                        <div className="product-card-item">
                                            <Link to={`/products/${item.id}`}>
                                                <img className="product-card-img" src={item?.productImageData[0]?.image} alt="image-product" />
                                                <span className="product-card-name">{item.productName}</span>
                                            </Link>
                                            <div className="product-card-price">
                                                <span className="product-card-price-current">{`${item.salePrice || item.price}₫`}</span>
                                                <span className="product-card-price-old">{item.salePrice && `${item.price}₫`}</span>
                                            </div>
                                            {
                                                item.quantityInStock ?
                                                    (
                                                        (listCartProducts.find(x => x.productCode === item.productCode) || toggleBtnCode === item.productCode) &&
                                                        (
                                                            <div className="product-card-order custom-btn">
                                                                <button className="product-card-order-decrease" onClick={() => handleAddQtyCart(item, -1)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <input type={'number'}
                                                                    className='product-card-order-quantity'
                                                                    value={listCartProducts.find(x => x.productCode === item.productCode)?.QtyInCart || ''}
                                                                    onChange={(e) => { handleAddQtyCart(item, e.target.value, ACTIONS.CHANGE_DIRECTLY) }}
                                                                    onFocus={(e) => setToggleBtnCode(item.productCode)}
                                                                    onBlur={(e) => setToggleBtnCode('')}
                                                                />
                                                                <button className="product-card-order-increase" onClick={() => handleAddQtyCart(item, 1)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        ) || (
                                                            <div className="product-card-no-quantity">
                                                                <p className='custom-btn' onClick={() => handleAddQtyCart(item, 1)}>CHỌN MUA</p>
                                                            </div>
                                                        )
                                                    ) :
                                                    <div className="product-card-no-quantity">
                                                        <p className='custom-btn no-item-btn'>HẾT HÀNG</p>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="col c-3 m-3 s-6">
                            <div className="product-card-item">
                                <img className="product-card-img" src="https://res.cloudinary.com/dly4liyhf/image/upload/v1672043563/Meatdeli/Products/x4dxbfe9wxbvqcqmg7mf.jpg" alt="image-product" />
                                <span className="product-card-name">Gà Tiêu Đen nướng sẵn 1000 gr - Nóng hổi ăn liền</span>
                                <div className="product-card-price">
                                    <span className="product-card-price-current">169,000₫</span>
                                    <span className="product-card-price-old">189,000₫</span>
                                </div>
                                <div className="product-card-order custom-btn">
                                    <button className="product-card-order-decrease" onClick={() => alert('-')}>
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input type={'number'} className='product-card-order-quantity' />
                                    <button className="product-card-order-increase" onClick={() => alert('+')}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="product-card-no-quantity">
                                    <p className='custom-btn' onClick={() => alert('aa')}>CHỌN MUA</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="list-product-pagination">
                        {
                            customListProducts && customListProducts.length > 0 &&
                            <ul className="list-product-pagination-list">
                                <li className="list-product-pagination-item"
                                    onClick={() => handleChangePage(0)}
                                >
                                    <i className="fas fa-angle-double-left"></i>
                                </li>
                                <li className="list-product-pagination-item"
                                    onClick={() => {
                                        if (+(objSearchParams.page || 0) === 0) {
                                            return;
                                        }
                                        handleChangePage(+(objSearchParams.page || 0) - 1)
                                    }}
                                >
                                    <i className="fas fa-angle-left"></i>
                                </li>
                                {
                                    numberOfPage && numberOfPage.length > 0 &&
                                    numberOfPage.map((item, index) => {
                                        if (item > ((objSearchParams.page || 0) - 2) && item <= (+(objSearchParams.page || 0) + 2)
                                            || item === numberOfPage.length - 1) {
                                            return (
                                                <li className={`list-product-pagination-item ${(objSearchParams.page || 0) == item ? 'active' : ''}`}
                                                    key={index}
                                                    onClick={() => {
                                                        if (item === (+(objSearchParams.page || 0) + 2) && item !== numberOfPage.length - 1) {
                                                            return;
                                                        }
                                                        handleChangePage(item);
                                                    }}
                                                >
                                                    {item === (+(objSearchParams.page || 0) + 2) && item !== numberOfPage.length - 1 && '...' || (item + 1)}
                                                </li>
                                            )
                                        }
                                        return;
                                    })
                                }
                                {/* <li className="list-product-pagination-item">4</li>
                                <li className="list-product-pagination-item">5</li>
                                <li className="list-product-pagination-item">6</li>
                                <li className="list-product-pagination-item">7</li>
                                <li className="list-product-pagination-item">...</li>
                                <li className="list-product-pagination-item">12</li> */}
                                <li className="list-product-pagination-item"
                                    onClick={() => {
                                        if (+(objSearchParams.page || 0) === numberOfPage.length - 1) {
                                            return;
                                        }
                                        handleChangePage(+(objSearchParams.page || 0) + 1)
                                    }}
                                >
                                    <i className="fas fa-angle-right"></i>
                                </li>
                                <li className="list-product-pagination-item"
                                    onClick={() => {
                                        if (+(objSearchParams.page || 0) + 2 >= numberOfPage.length - 1) {
                                            return handleChangePage(numberOfPage.length - 1);
                                        }
                                        handleChangePage(+(objSearchParams.page || 0) + 2);
                                    }}
                                >
                                    <i className="fas fa-angle-double-right"></i>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProduct;