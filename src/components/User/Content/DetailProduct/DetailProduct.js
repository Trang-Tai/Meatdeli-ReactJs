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
                            <span className="detail-product-status">T??nh tr???ng: <span style={{ color: 'red' }}>{productInfo.quantityInStock > 0 ? 'C??n h??ng' : 'H???t h??ng'}</span></span>
                            <div className="row">
                                <div className="col c-7 m-6 s-12">
                                    <div className="detail-product-buy-section">
                                        <div className="product-card-price">
                                            <span className="product-card-price-current">{`${productInfo.salePrice || productInfo.price}???`}</span>
                                            <span className="product-card-price-old">{productInfo.salePrice && `${productInfo.price}???`}</span>
                                        </div>
                                        <span className="detail-product-order-quantity">S??? l?????ng: </span>
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
                                                            <p className='custom-btn' onClick={() => handleAddQtyCart(productInfo, qtyProduct)}>TH??M V??O GI??? H??NG</p>
                                                        </div>
                                                    </>
                                                ) :
                                                (
                                                    <div className="product-card-no-quantity">
                                                        <p className='custom-btn no-item-btn'>H???T H??NG</p>
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
                        <span className="detail-product-description-title">M?? t??? s???n ph???m</span>
                        <div className="detail-product-description-content">
                            {
                                productInfo.descriptionHTML &&
                                <div dangerouslySetInnerHTML={{ __html: sanitizer(productInfo.descriptionHTML) }}></div> ||
                                'Th??ng tin sa??n ph????m ??ang ????????c c????p nh????t'
                            }
                            {/* <p>T??CH L??Y G?? NH???N QU?? S???C</p>
                            <p>Ch????ng tr??nh t??ch l??y G?? x???t n?????ng l???n nh???t n??m, mua t??ch l??y ????? 15 con* nh???n ngay 1 b???p n?????ng ??i???n. T??ch l??y 30 con nh???n ngay 1 n???i chi??n kh??ng d???u/ 1 t??? l???nh mini, ??p d???ng ?????n 15/01/2023</p>
                            <p>H????ng v??? ?????c quy???n, ??n g?? n?????ng th??m ngon ????ng ??i???u nh?? h??ng, n??ng h???i ngay t???i nh?? ch??? v???i 149k.</p>
                            <p>* ??p d???ng cho c??? g?? t????i x???t n?????ng v?? g?? n?????ng s???n ??n li???n, v?? ??p d???ng ?????ng th???i v???i c??c ??u ????i gi?? kh??c.</p>
                            <p>?????T NGAY H??M NAY NH???N ??U ????I!</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;