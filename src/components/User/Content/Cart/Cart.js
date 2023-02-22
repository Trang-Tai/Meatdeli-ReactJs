import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { productActions } from '../../../../redux/actions';
import { ACTIONS, TYPE } from '../../../../utils/constant';
import './Cart.scss';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listCartProducts = useSelector(state => state.product.cartProducts);

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    return (
        <div className="cart-container">
            <div className="grid wide">
                <div className="cart-content">
                    <span className="cart-title">Giỏ hàng</span>
                    {
                        listCartProducts && listCartProducts.length > 0 &&
                        <>
                            <ul className='cart-product-list'>
                                {
                                    listCartProducts && listCartProducts.length > 0 &&
                                    listCartProducts.map((item, index) => {
                                        return (
                                            <li className='cart-product-item' key={index}>
                                                <div className='cart-product-item-remove' onClick={() => handleAddQtyCart(item, 0, ACTIONS.DELETE_DIRECTLY)}>
                                                    <span>Xoá</span>
                                                </div>
                                                <div className="cart-product-item-img">
                                                    <Link to={`/products/${item.id}`}>
                                                        <img src={item?.productImageData[0]?.image} />
                                                    </Link>
                                                </div>
                                                <div className="cart-product-item-info">
                                                    <span className="cart-product-item-name" onClick={() => navigate(`/products/${item.id}`)}>{item.productName}</span>
                                                    <span className="cart-product-item-price">{`${item.salePrice || item.price}₫`}</span>
                                                    <div className="product-card-order custom-btn">
                                                        <button className="product-card-order-decrease" onClick={() => handleAddQtyCart(item, -1)}>
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                        <input type={'number'}
                                                            className='product-card-order-quantity'
                                                            value={item.QtyInCart}
                                                            onChange={(e) => {handleAddQtyCart(item, e.target.value, ACTIONS.CHANGE_DIRECTLY) }}
                                                        />
                                                        <button className="product-card-order-increase" onClick={() => handleAddQtyCart(item, 1)}>
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                {/* <li className='cart-product-item'>
                                    <div className='cart-product-item-remove'>
                                        <span>Xoá</span>
                                    </div>
                                    <div className="cart-product-item-img">
                                        <Link to={'#'}>
                                            <img src="https://res.cloudinary.com/dly4liyhf/image/upload/v1672042793/Meatdeli/Products/qo00seduldotl0pot9jo.webp" />
                                        </Link>
                                    </div>
                                    <div className="cart-product-item-info">
                                        <span className="cart-product-item-name">PREMIUM Nạc nọng 350gvncmv cnmvncmvnbdh</span>
                                        <span className="cart-product-item-price">143,465₫</span>
                                        <div className="product-card-order custom-btn">
                                            <button className="product-card-order-decrease" onClick={() => alert('-')}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input type={'number'} className='product-card-order-quantity' />
                                            <button className="product-card-order-increase" onClick={() => alert('+')}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                            <div className='cart-total-price'>
                                <span className='cart-total-price-title'>Tổng tiền</span>
                                <span className='cart-total-price-number'>
                                    <NumericFormat
                                        className='currency'
                                        value={
                                            listCartProducts.reduce((accumulator, currentValue) => {
                                                return accumulator + (currentValue.salePrice || currentValue.price) * currentValue.QtyInCart;
                                            }, 0)
                                        }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'₫'}
                                    />
                                </span>
                            </div>
                            <div className="cart-payment">
                                <button className='custom-btn' onClick={() => navigate('/checkout')}>Tiến hành thanh toán</button>
                            </div>
                            <div className="cart-add-more-product">
                                <button className='custom-btn' onClick={() => navigate(`/collections/${TYPE.ALL}`)}>Tiếp tục mua hàng</button>
                            </div>
                        </>
                        || 
                        <p>(Chưa có sản phẩm nào) nhấn vào <Link to={'/collections/ALL'} style={{color: 'red'}}>cửa hàng</Link> để mua hàng</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;