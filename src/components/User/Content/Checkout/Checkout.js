import { Button, Radio } from 'antd';
import { userIsAuthenticated } from '../../../../hoc/authentication';
import './Checkout.scss';
import { Link } from 'react-router-dom';
import useDecodeToken from '../../../../customHook/useDecodeToken';
import useFetchUserInfo from '../../../../customHook/useFetchUserInfo';
import { EMAIL, PRODUCT_INFO_GHN } from '../../../../utils/constant';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import buildOptions from '../../../../utils/buildOptions';
import { productActions, userActions } from '../../../../redux/actions';
import { orderServices, userServices } from '../../../../services';
import ConfirmModal from '../../../ConfirmModal';
import validate from '../../../../utils/validate';
import { randomString } from '../../../../utils/randomString';

function Checkout() {
    const dispatch = useDispatch();
    const { userInfo } = useDecodeToken({});
    console.log(userInfo);
    const moreUserInfo = useFetchUserInfo({ email: userInfo.email || randomString })[0];
    const senderInfo = useFetchUserInfo({ email: EMAIL })[0];
    const cartProducts = useSelector((state) => state.product.cartProducts);
    const productList = [...cartProducts];
    let totalCost = productList.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.salePrice || currentValue.price) * currentValue.QtyInCart;
    }, 0);

    let paymentOptions = buildOptions(useSelector(state => state.user.payments));

    const [state, setState] = useState({
        serviceIdGHN: PRODUCT_INFO_GHN.service_id_standard,
        paymentMethod: 'PAY1',
        shippingFee: '',

        loading: false,
        disabled: false,

        isOpen: false,
        title: '',
    })

    useEffect(() => {
        if (!paymentOptions || paymentOptions.length < 2) {
            dispatch(userActions.fetchPayment());
        };
    }, [])

    useEffect(() => {
        ; (async () => {
            if (moreUserInfo?.Address) {
                const res = await userServices.getShippingFee(+senderInfo?.Address?.districtId, +moreUserInfo?.Address?.districtId, +moreUserInfo?.Address?.wardId, state.serviceIdGHN);
                if (res.code === 200) {
                    setState((prev) => ({
                        ...prev,
                        shippingFee: res.data.total,
                    }))
                }
            }
        })();
    }, [state.serviceIdGHN, moreUserInfo?.Address])

    const handleChangeRadio = ({ target: { value } }, type) => {
        setState((prev) => ({
            ...prev,
            [type]: value,
        }))
        console.log(value, type);
    }

    const closeModal = () => {
        setState((prev) => ({
            ...prev,
            isOpen: false,
            title: '',
        }))
    }

    const handleSubmit = async () => {
        // handle data for sending to server
        let productArr = [...productList];
        productArr = productArr.map((item) => {
            return {
                productId: item.id,
                quantityOrdered: item.QtyInCart,
                priceEach: item.salePrice || item.price,
            }
        })
        const data = {
            userId: userInfo.email && moreUserInfo.id,
            desiredDeliveryDate: '',
            shippingAddressFrom: senderInfo?.Address && `${senderInfo.Address?.address}, ${senderInfo.Address?.wardName}, ${senderInfo.Address?.districtName}, ${senderInfo.Address?.provinceName}`,
            shippingAddressTo: moreUserInfo?.Address && `${moreUserInfo.Address?.address}, ${moreUserInfo.Address?.wardName}, ${moreUserInfo.Address?.districtName}, ${moreUserInfo.Address?.provinceName}`,
            shippingFee: totalCost > 399000 ? 0 : state.shippingFee,
            paymentMethod: state.paymentMethod,
            note: '',
            totalCost: totalCost > 399000 ? totalCost : totalCost + state.shippingFee,

            productArr: productArr,
        }
        console.log(data);

        // validate
        const dataValid = [
            {
                address: data.shippingAddressTo,
                constraint: ['required']
            },
            {
                productList: data.productArr.length > 0 ? data.productArr : '',
                constraint: ['required']
            }
        ]
        const resultValid = validate(dataValid);
        for (const property in resultValid) {
            if (resultValid[property] !== null) {
                setState((prev) => ({
                    ...prev,
                    isOpen: true,
                    title: `${resultValid[property]}: ${property}`
                }));
                return;
            }
        }

        // send data to server
        setState((prev) => ({
            ...prev,
            disabled: true,
            loading: true,
        }))
        try {
            const res = await orderServices.createOrder(data);
            if (res.errCode === 0) {
                setState((prev) => ({
                    ...prev,
                    disabled: false,
                    loading: false,
                }))
                dispatch(productActions.deleteAllProductCart());
                window.location.replace(res.redirectUrl);
            }
        } catch (error) {
            console.log(error)
            setState((prev) => ({
                ...prev,
                disabled: false,
                loading: false,
                isOpen: true,
                title: error.errMessage || error.message,
            }))
        }
    }

    return (
        <div className="checkout-container">
            <div className='grid wide'>
                <div className='checkout-content'>
                    <span className='checkout-title'>Thanh to??n</span>
                    <div className='row'>
                        <div className='col c-6 m-12 s-12'>
                            <div className='checkout-info'>
                                <Link to={'/account/address'}>
                                    <div className='checkout-info-address'>
                                        <i className="fas fa-map-marker-alt text-center"></i>
                                        <div>
                                            <span className='checkout-info-address-title'>?????a ch??? nh???n h??ng: </span>
                                            <span className='checkout-info-address-location'>
                                                {moreUserInfo?.Address && `${moreUserInfo.Address?.address}, ${moreUserInfo.Address?.wardName}, ${moreUserInfo.Address?.districtName}, ${moreUserInfo.Address?.provinceName}` || 'null'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className='checkout-info-delivery'>
                                    <span className='checkout-info-delivery-title'>Ph????ng th???c v???n chuy???n</span>
                                    <div className='checkout-info-delivery-method'>
                                        <Radio.Group className='checkout-info-delivery-list' value={state.serviceIdGHN} onChange={(e) => handleChangeRadio(e, 'serviceIdGHN')}>
                                            <Radio className='checkout-info-delivery-item' value={PRODUCT_INFO_GHN.service_id_standard}>
                                                <div className='checkout-info-delivery-block'>
                                                    <span>Mi???n ph?? v???n chuy???n ????n h??ng 399.000?? c??c Qu???n</span>
                                                    <span>{`${totalCost > 399000 ? 0 : state.shippingFee}???`}</span>
                                                </div>
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                                {/* <div className='checkout-info-select-time'>
                                    <span className='checkout-info-select-time-title'>Ch???n th???i gian nh???n h??ng: </span>
                                    <Select className='time-input-custom'
                                    />
                                </div> */}
                                <div className='checkout-info-payment'>
                                    <span className='checkout-info-payment-title'>Ph????ng th???c thanh to??n</span>
                                    <Radio.Group className='checkout-info-payment-list' value={state.paymentMethod} onChange={(e) => handleChangeRadio(e, 'paymentMethod')}>
                                        {
                                            paymentOptions && paymentOptions.length > 1 &&
                                            paymentOptions.map((item, index) => {
                                                if (index === 0) {
                                                    return '';
                                                }
                                                return (
                                                    <Radio className='checkout-info-payment-item' value={item.value} key={index}>
                                                        <img src={`https://hstatic.net/0/0/global/design/seller/image/payment/${item.value === 'PAY1' ? 'cod' : 'other'}.svg?v=4`} />
                                                        <span>{item.label}</span>
                                                    </Radio>
                                                )
                                            })
                                        }
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className='col c-6 m-12 s-12'>
                            <div className='checkout-product-list'>
                                {
                                    productList && productList.length > 0 &&
                                    productList.map((item, index) => {
                                        return (
                                            <div className='checkout-product-item' key={index}>
                                                <div className='checkout-product-img'>
                                                    <img src={item?.productImageData[0]?.image} />
                                                </div>
                                                <span className='checkout-product-qty'>{item.QtyInCart}</span>
                                                <div className='checkout-product-info'>
                                                    <span className='checkout-product-name'>{item.productName}</span>
                                                    <span className='checkout-product-price'>
                                                        <NumericFormat
                                                            className='currency'
                                                            value={item.salePrice || item.price}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'???'}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className='checkout-product-item'>
                                    <div className='checkout-product-img'>
                                        <img src='https://res.cloudinary.com/dly4liyhf/image/upload/v1672039088/Meatdeli/Products/brbl7psyhyihzqnsoc0s.webp' />
                                    </div>
                                    <span className='checkout-product-qty'>3</span>
                                    <div className='checkout-product-info'>
                                        <span className='checkout-product-name'>Set Ph?? Qu?? 2: G?? Ngon Lachanh nguy??n con + 1 khay N???c n???ng Premium</span>
                                        <span className='checkout-product-price'>441,965???</span>
                                    </div>
                                </div> */}
                            </div>
                            <div className='checkout-product-payment'>
                                <div className='checkout-product-payment-price'>
                                    <div className='checkout-product-cost'>
                                        <span>T???m t??nh</span>
                                        <span>
                                            <NumericFormat
                                                className='currency'
                                                value={
                                                    totalCost
                                                }
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'???'}
                                            />
                                        </span>
                                    </div>
                                    <div className='checkout-product-shipping'>
                                        <span>Ph?? v???n chuy???n</span>
                                        <span>{totalCost > 399000 ? 'Mi???n ph??' : state.shippingFee}</span>
                                    </div>
                                </div>
                                <div className='checkout-product-total'>
                                    <span className='checkout-product-total-title'>T???ng c???ng</span>
                                    <span className='checkout-product-total-fee'>
                                        <NumericFormat
                                            className='currency'
                                            value={
                                                totalCost > 399000 ? totalCost : totalCost + state.shippingFee
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'???'}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='col c-6 m-12 s-12'>
                            <div className='checkout-block'>
                                <span className='checkout-return-cart'>
                                    <Link to={'/cart'}>Gi??? h??ng</Link>
                                </span>
                                <div className="checkout-finish-order">
                                    <Button size='large' className='custom-btn'
                                        onClick={() => handleSubmit()}
                                        loading={state.loading}
                                        disabled={state.disabled}
                                    >
                                        Ho??n t???t ????n h??ng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={state.isOpen}
                title={state.title}
                onCancel={closeModal}
                onConfirm={closeModal}
            />
        </div>
    )
}

export default userIsAuthenticated(Checkout);