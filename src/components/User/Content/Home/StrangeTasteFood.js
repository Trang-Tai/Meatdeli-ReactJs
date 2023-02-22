import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { productActions } from "../../../../redux/actions";
import { ACTIONS, PRODUCT_LINE } from "../../../../utils/constant";
import customData from "../../../../utils/customProductLineData";
import { searchProductByName } from "../../../../utils/searchProduct";
import './StrangeTasteFood.scss';


function StrangeTasteFood(props) {
    const [searchProductLine, setSearchProductLine] = useState([PRODUCT_LINE.PREMIUM,]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const listProducts = useSelector(state => state.product.listProducts);
    let customListProducts = searchProductByName(listProducts, '', searchProductLine);
    const listProductLines = useSelector(state => state.product.listProductLines);
    let customListProductLines = customData(listProductLines);
    const listCartProducts = useSelector(state => state.product.cartProducts);

    const [toggleBtnCode, setToggleBtnCode] = useState('');

    useEffect(() => {
        // get productLinelist
        if (!listProductLines || listProductLines.length <= 0) {
            dispatch(productActions.getAllProductLine());
        }
    }, [])

    const handleClickProductLine = (typeCode) => {
        setSearchProductLine([typeCode]);
        // console.log(typeCode, searchProductLine)
    }

    return (
        <div className="strange-taste-food-container">
            <div className="grid wide">
                <div className="strange-taste-food-content">
                    <div className="strange-taste-food-bars row">
                        <div className="col c-5 m-6 s-12">
                            <span className="strange-taste-food-title" onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>Món Ngon Lạ Miệng</span>
                        </div>
                        <div className="col c-7 m-12 s-12">
                            <div className="strange-taste-food-filter">
                                <ul className="strange-taste-food-filter-list">
                                    {
                                        customListProductLines && customListProductLines.length > 0 &&
                                        customListProductLines.find(x => x.productTypeCode === PRODUCT_LINE.MEAT)?.children?.map((item, index) => {
                                            return (
                                                <li className={`strange-taste-food-filter-item ${item.productTypeCode === searchProductLine[0] ? 'active' : ''}`}
                                                    key={index}
                                                    onClick={() => handleClickProductLine(item.productTypeCode)}
                                                >
                                                    {item.productTypeName}
                                                </li>
                                            )
                                        })
                                    }
                                    {/* <li className="strange-taste-food-filter-item active">MEATDeli Premium</li>
                                    <li className="strange-taste-food-filter-item">Nội Tạng Sạch Khuẩn An Toàn</li>
                                    <li className="strange-taste-food-filter-item">MEATDeli Chuẩn Ngon</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="product-card-list row">
                        {
                            customListProducts && customListProducts.length > 0 &&
                            customListProducts.slice(0, 10).map((item, index) => {
                                return (
                                    <div className="col c-2-4 m-2-4 s-6" key={index}>
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
                                                                <button className="product-card-order-decrease" onClick={() => props.handleAddQtyCart(item, -1)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <input type={'number'}
                                                                    className='product-card-order-quantity'
                                                                    value={listCartProducts.find(x => x.productCode === item.productCode)?.QtyInCart || ''}
                                                                    onChange={(e) => { props.handleAddQtyCart(item, e.target.value, ACTIONS.CHANGE_DIRECTLY) }}
                                                                    onFocus={(e) => setToggleBtnCode(item.productCode)}
                                                                    onBlur={(e) => setToggleBtnCode('')}
                                                                />
                                                                <button className="product-card-order-increase" onClick={() => props.handleAddQtyCart(item, 1)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        ) || (
                                                            <div className="product-card-no-quantity">
                                                                <p className='custom-btn' onClick={() => props.handleAddQtyCart(item, 1)}>CHỌN MUA</p>
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
                        {/* <div className="col c-2-4 m-2-4 s-6">
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
                    <div className="strange-taste-food-view-all">
                        <button className='custom-btn' onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>Xem tất cả</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StrangeTasteFood;