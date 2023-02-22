import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { productActions } from "../../../../redux/actions";
import { ACTIONS, PRODUCT_LINE } from "../../../../utils/constant";
import { searchProductByName } from "../../../../utils/searchProduct";
import './SpecialtyFood.scss';

const searchProductLine = [
    PRODUCT_LINE.MEAT,
    PRODUCT_LINE.PREMIUM,
    PRODUCT_LINE.CHICKEN,
    PRODUCT_LINE.STANDARD,
]

// sort(() => 0.5 - Math.random()).

function SpecialtyFood() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector(state => state.product.listProducts);
    const listCartProducts = useSelector(state => state.product.cartProducts);
    let customListProducts = searchProductByName(listProducts, '', searchProductLine);

    const [toggleBtnCode, setToggleBtnCode] = useState('');

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    // const handleDeleteQtyCart = (productInfo, qty, action = '') => {
    //     dispatch(productActions.deleteProductCart(productInfo, qty, action));
    // }

    return (
        <div className="spec-food-container">
            <div className="grid wide">
                <div className="spec-food-content">
                    <span className="spec-food-title" onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>HÀNG ĐẶC SẢN MEATDeli - NGON, HIẾM</span>
                    <div className="spec-food-list row">
                        {
                            customListProducts && customListProducts.length &&
                            [...customListProducts].slice(0, 5).map((item, index) => {
                                return (
                                    <div className="col c-2-4 m-2-4 mobile-spec-food-item" key={index}>
                                        <div className="spec-food-item">
                                            <Link to={`/products/${item.id}`}>
                                                <img className="spec-food-img" src={item?.productImageData[0]?.image} alt="image-product" />
                                                <span className="spec-food-name">{item.productName}</span>
                                            </Link>
                                            <div className="spec-food-price">
                                                <span className="spec-food-price-current">{`${item.salePrice || item.price}₫`}</span>
                                                <span className="spec-food-price-old">{item.salePrice && `${item.price}₫`}</span>
                                            </div>
                                            {
                                                item.quantityInStock ?
                                                    (
                                                        (listCartProducts.find(x => x.productCode === item.productCode) || toggleBtnCode === item.productCode) &&
                                                        (
                                                            <div className="spec-food-order custom-btn">
                                                                <button className="spec-food-order-decrease" onClick={() => handleAddQtyCart(item, -1)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <input type={'number'}
                                                                    className='spec-food-order-quantity'
                                                                    value={listCartProducts.find(x => x.productCode === item.productCode)?.QtyInCart || ''}
                                                                    onChange={(e) => { console.log(e.target.value); handleAddQtyCart(item, e.target.value, ACTIONS.CHANGE_DIRECTLY) }}
                                                                    onFocus={(e) => setToggleBtnCode(item.productCode)}
                                                                    onBlur={(e) => setToggleBtnCode('')}
                                                                />
                                                                <button className="spec-food-order-increase" onClick={() => handleAddQtyCart(item, 1)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        ) ||
                                                        (
                                                            <div className="spec-food-no-quantity">
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
                        {/* <div className="col c-2-4 m-2-4 mobile-spec-food-item">
                            <div className="spec-food-item">
                                <img className="spec-food-img" src="https://res.cloudinary.com/dly4liyhf/image/upload/v1671964273/Meatdeli/Products/wbtfpbuxff4oflcszvgw.jpg" alt="image-product" />
                                <span className="spec-food-name">Gà Tiêu Đen nướng sẵn 1000 gr - Nóng hổi ăn liền</span>
                                <div className="spec-food-price">
                                    <span className="spec-food-price-current">169,000₫</span>
                                    <span className="spec-food-price-old">189,000₫</span>
                                </div>
                                <div className="spec-food-order custom-btn">
                                    <button className="spec-food-order-decrease">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input type={'number'} className='spec-food-order-quantity' />
                                    <button className="spec-food-order-increase">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="spec-food-no-quantity">
                                    <p className='custom-btn' onClick={() => alert('aa')}>CHỌN MUA</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="spec-food-view-all">
                        <button className='custom-btn' onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>Xem tất cả</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialtyFood;