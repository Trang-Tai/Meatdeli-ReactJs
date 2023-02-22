import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import useFetchDetailProduct from "../../../../customHook/useFetchDetailProduct";
import * as DOMPurify from 'dompurify';
import './DetailProduct.scss';
import { productActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

function DetailProduct() {
    const sanitizer = DOMPurify.sanitize;
    const params = useParams();
    const dispatch = useDispatch();
    const productInfo = useFetchDetailProduct({ id: params.productId });
    const [qtyProduct, setQtyProduct] = useState('');
    console.log(qtyProduct)

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    const settings = {
        customPaging: function (i) {
            console.log(i)
            return (
                <a>
                    <img className="detail-product-mini-slider" src={productInfo?.productImageData[i]?.image} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="detail-product-container">
            <div className="grid wide">
                <div className="detail-product-content">
                    <div className="row">
                        <div className="col c-4-8 m-4-8 s-12">
                            <div className="detail-product-slider">
                                <Slider {...settings}>
                                    {
                                        productInfo && productInfo.productImageData &&
                                        productInfo.productImageData.map((item, index) => {
                                            return (
                                                <div className="detail-product-slider-item" key={index}>
                                                    <img className="detail-product-slider-item-img" src={item.image} />
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div className="detail-product-slider-item">
                                        <img className="detail-product-slider-item-img" src="https://res.cloudinary.com/dly4liyhf/image/upload/v1672037000/Meatdeli/Products/hgft76ppijn3dhsy6nnd.webp" />
                                    </div> */}
                                </Slider>
                            </div>
                        </div>
                        <div className="col c-7-2 m-7-2 s-12">
                            <span className="detail-product-name">{productInfo.productName}</span>
                            <span className="detail-product-status">Tình trạng: <span style={{ color: 'red' }}>{productInfo.quantityInStock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></span>
                            <div className="row">
                                <div className="col c-7 m-6 s-12">
                                    <div className="detail-product-buy-section">
                                        <div className="product-card-price">
                                            <span className="product-card-price-current">{`${productInfo.salePrice || productInfo.price}₫`}</span>
                                            <span className="product-card-price-old">{productInfo.salePrice && `${productInfo.price}₫`}</span>
                                        </div>
                                        <span className="detail-product-order-quantity">Số lượng: </span>
                                        {
                                            productInfo.quantityInStock ?
                                                (
                                                    <>
                                                        <div className="product-card-order custom-btn">
                                                            <button className="product-card-order-decrease" onClick={() => setQtyProduct((prev) => prev - 1 > 0 ? prev - 1 : 0)}>
                                                                <i className="fas fa-minus"></i>
                                                            </button>
                                                            <input type={'number'}
                                                                className='product-card-order-quantity'
                                                                value={qtyProduct}
                                                                onChange={(e) => setQtyProduct(+(e.target.value))}
                                                            />
                                                            <button className="product-card-order-increase" onClick={() => setQtyProduct((prev) => +(prev || 0) + 1)}>
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <div className="product-card-no-quantity">
                                                            <p className='custom-btn' onClick={() => handleAddQtyCart(productInfo, qtyProduct)}>THÊM VÀO GIỎ HÀNG</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (
                                                    <div className="product-card-no-quantity">
                                                        <p className='custom-btn no-item-btn'>HẾT HÀNG</p>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                                <div className="col c-7 m-6 s-12">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-product-description">
                        <span className="detail-product-description-title">Mô tả sản phẩm</span>
                        <div className="detail-product-description-content">
                            {
                                productInfo.descriptionHTML &&
                                <div dangerouslySetInnerHTML={{ __html: sanitizer(productInfo.descriptionHTML) }}></div> ||
                                'Thông tin sản phẩm đang được cập nhật'
                            }
                            {/* <p>TÍCH LŨY GÀ NHẬN QUÀ SỐC</p>
                            <p>Chương trình tích lũy Gà xốt nướng lớn nhất năm, mua tích lũy đủ 15 con* nhận ngay 1 bếp nướng điện. Tích lũy 30 con nhận ngay 1 nồi chiên không dầu/ 1 tủ lạnh mini, áp dụng đến 15/01/2023</p>
                            <p>Hương vị độc quyền, ăn gà nướng thơm ngon đúng điệu nhà hàng, nóng hổi ngay tại nhà chỉ với 149k.</p>
                            <p>* Áp dụng cho cả gà tươi xốt nướng và gà nướng sẵn ăn liền, và áp dụng đồng thời với các ưu đãi giá khác.</p>
                            <p>ĐẶT NGAY HÔM NAY NHẬN ƯU ĐÃI!</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;