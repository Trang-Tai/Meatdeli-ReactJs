import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { ACTIONS, PRODUCT_LINE } from "../../../../utils/constant";
import { searchProductByName } from "../../../../utils/searchProduct";
import './FreshMeat.scss';

const searchProductLine = [
    PRODUCT_LINE.STANDARD,
]

function FreshMeat(props) {
    const navigate = useNavigate();
    const listProducts = useSelector(state => state.product.listProducts);
    let customListProducts = searchProductByName(listProducts, '', searchProductLine);
    const listCartProducts = useSelector(state => state.product.cartProducts);

    const [toggleBtnCode, setToggleBtnCode] = useState('');

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div className="fresh-meat-container">
            <div className="grid wide">
                <div className="fresh-meat-content">
                    <span className="fresh-meat-title" onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>Thịt Sạch MEATDeli</span>
                    <div className="product-card-list row">
                        <Slider {...settings}>
                            {
                                customListProducts && customListProducts.length > 0 &&
                                customListProducts.map((item, index) => {
                                    return (
                                        <div className="col" key={index}>
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
                            {/* <div className="col">
                                <div className="product-card-item">
                                    <img className="product-card-img" src="https://res.cloudinary.com/dly4liyhf/image/upload/v1671964273/Meatdeli/Products/wbtfpbuxff4oflcszvgw.jpg" alt="image-product" />
                                    <span className="product-card-name">Gà Tiêu Đen nướng sẵn 1000 gr - Nóng hổi ăn liền</span>
                                    <div className="product-card-price">
                                        <span className="product-card-price-current">169,000₫</span>
                                        <span className="product-card-price-old">189,000₫</span>
                                    </div>
                                    <div className="product-card-order custom-btn">
                                        <button className="product-card-order-decrease">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input type={'number'} className='product-card-order-quantity' />
                                        <button className="product-card-order-increase">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="product-card-no-quantity">
                                        <p className='custom-btn' onClick={() => alert('aa')}>CHỌN MUA</p>
                                    </div>
                                </div>
                            </div> */}
                        </Slider>
                    </div>
                    <div className="fresh-meat-view-all">
                        <button className='custom-btn' onClick={() => navigate(`/collections/${searchProductLine.join('-')}`)}>Xem tất cả</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreshMeat;