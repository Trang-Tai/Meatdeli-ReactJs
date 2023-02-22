import { Button, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActions } from '../../../../redux/actions';
import buildOptions from '../../../../utils/buildOptions';
import moment from 'moment';
import './OrderDetail.scss';
import validate from '../../../../utils/validate';
import { orderServices } from '../../../../services';
import ConfirmModal from '../../../ConfirmModal';

function OrderDetail() {
    const dispatch = useDispatch();
    const params = useParams();

    let paymentOptions = buildOptions(useSelector(state => state.user.payments));
    let statusOptions = buildOptions(useSelector(state => state.user.status));
    const orderList = useSelector(state => state.user.orderList)[0] || {};

    const [state, setState] = useState({
        paymentMethod: 'PAY1',

        loading: false,
        disabled: false,

        isOpen: false,
        title: '',
        callbackModal: () => {},
    })

    useEffect(() => {
        if (!paymentOptions || paymentOptions.length < 2) {
            dispatch(userActions.fetchPayment());
        };
        dispatch(userActions.fetchStatus());
        dispatch(userActions.getOrder({ orderCode: params.orderId }));
    }, [])

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

    const confirmModal = (callback) => {
        if(callback) callback();
        else closeModal();
    }

    const handleSubmit = async () => {
        // handle data for sending to server
        const data = {
            orderCode: orderList.orderCode,
            paymentMethod: state.paymentMethod,
        }

        // validate
        const dataValid = [
            {
                orderCode: data.orderCode,
                constraint: ['required']
            },
            {
                paymentMethod: data.paymentMethod,
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
            const res = await orderServices.rePaymentOrder(data);
            if (res.errCode === 0) {
                setState((prev) => ({
                    ...prev,
                    disabled: false,
                    loading: false,
                }))
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

    const handleRemoveOrder = () => {
        setState((prev) => ({
            ...prev,
            isOpen: true,
            title: `Bạn muốn huỷ đơn hàng này?`,
            callbackModal: () => {
                const data = {
                    orderCode: orderList.orderCode,
                    status: 'S5',
                }
                console.log(data);
                dispatch(userActions.updateOrder(data));
                closeModal();
            }
        }));
    }

    return (
        <div className="order-detail-container">
            <div className='grid wide'>
                <div className='order-detail-content'>
                    <span className='order-detail-title'>Chi tiết đơn hàng {params.orderId}</span>
                    <div className='order-detail-delivery'>
                        <span className='order-detail-delivery-title'>Địa chỉ giao hàng: </span>
                        <div className='order-detail-delivery-block'>
                            <span className='order-detail-delivery-name'><i className="fas fa-user"></i> {orderList?.User && `${orderList.User.firstName} ${orderList.User.lastName}`}</span>
                            <span className='order-detail-delivery-phone'>{orderList?.User && orderList.User.phone}</span>
                            <span className='order-detail-delivery-address'><i className="fas fa-map-marker-alt"></i> Địa chỉ: {orderList.shippingAddressTo}</span>
                        </div>
                    </div>
                    <div className='order-detail-product-list'>
                        {
                            orderList && orderList?.OrderDetails?.length > 0 &&
                            orderList.OrderDetails.map((item, index) => {
                                return (
                                    <div className='order-detail-product-item' key={index}>
                                        <div className='order-detail-product-img'>
                                            <img src={item.Product?.productImageData[0]?.image} />
                                        </div>
                                        <div className='order-detail-product-block'>
                                            <span className='order-detail-product-name'>{item.Product?.productName}</span>
                                            <span className='order-detail-product-code'>Mã sản phẩm: {item.Product?.productCode}</span>
                                            <div className='order-detail-product-ordered'>
                                                <span className='order-detail-product-price'>Đơn giá:
                                                    <NumericFormat
                                                        className='currency'
                                                        value={item.priceEach}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'₫'}
                                                    />
                                                </span>
                                                <span className='order-detail-product-quantity'>Số lượng: {item.quantityOrdered}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className='order-detail-product-item'>
                            <div className='order-detail-product-img'>
                                <img src='https://res.cloudinary.com/dly4liyhf/image/upload/v1672041611/Meatdeli/Products/h0au2r3gp32up2ewcf9b.webp' />
                            </div>
                            <div className='order-detail-product-block'>
                                <span className='order-detail-product-name'>Ba rọi không da chuẩn ngon 350g Ba rọi không da chuẩn ngon 350g</span>
                                <span className='order-detail-product-code'>Mã sản phẩm: 97KM02717</span>
                                <div className='order-detail-product-ordered'>
                                    <span className='order-detail-product-price'>Đơn giá: 32,000₫</span>
                                    <span className='order-detail-product-quantity'>Số lượng: 3</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className='row'>
                        <div className='col c-6 m-6 s-12 order-1'>
                            {
                                orderList.status === 'S0' &&
                                <div className='order-detail-info-payment'>
                                    <span className='order-detail-info-payment-title'>Chọn phương thức thanh toán</span>
                                    <Radio.Group className='order-detail-info-payment-list' value={state.paymentMethod} onChange={(e) => handleChangeRadio(e, 'paymentMethod')}>
                                        {
                                            paymentOptions && paymentOptions.length > 1 &&
                                            paymentOptions.map((item, index) => {
                                                if (index === 0) {
                                                    return '';
                                                }
                                                return (
                                                    <Radio className='order-detail-info-payment-item' value={item.value} key={index}>
                                                        <img src={`https://hstatic.net/0/0/global/design/seller/image/payment/${item.value === 'PAY1' ? 'cod' : 'other'}.svg?v=4`} />
                                                        <span>{item.label}</span>
                                                    </Radio>
                                                )
                                            })
                                        }
                                    </Radio.Group>
                                </div>
                            }
                        </div>
                        <div className='col c-6 m-6 s-12'>
                            <div className='order-detail-cost'>
                                <div className='order-detail-shipping-fee'>
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        <NumericFormat
                                            className='currency'
                                            value={orderList.shippingFee}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'₫'}
                                        />
                                    </span>
                                </div>
                                <div className='order-detail-total-fee'>
                                    <span>Tổng tiền</span>
                                    <span><b>
                                        <NumericFormat
                                            className='currency'
                                            value={orderList.totalCost}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'₫'}
                                        />
                                    </b></span>
                                </div>
                            </div>
                            <div className='order-detail-status'>
                                <div className='order-detail-ordered-date'>
                                    <span>Ngày đặt hàng:</span>
                                    <span>{moment(orderList.orderDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                </div>
                                <div className='order-detail-status-order'>
                                    <span>Trạng thái</span>
                                    <span>{statusOptions.find(x => x.value === orderList.status)?.label}</span>
                                </div>
                                {
                                    orderList.paymentDate &&
                                    <div className='order-detail-payment-date'>
                                        <span>Đã thanh toán:</span>
                                        <span>{moment(orderList.paymentDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                    </div>
                                }
                                {
                                    orderList.shippedDate &&
                                    <div className='order-detail-shipped-date'>
                                        <span>Thời gian hoàn thành:</span>
                                        <span>{moment(orderList.shippedDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                    </div>
                                }
                                {
                                    orderList.status !== 'S0' &&
                                    <div className='order-detail-payment-method'>
                                        <span>Trả tiền bởi:</span>
                                        <span>{paymentOptions.find(x => x.value === orderList.paymentMethod)?.label}</span>
                                    </div>
                                }
                                {
                                    orderList.status === 'S0' &&
                                    <div className="order-detail-finish-order">
                                        <Button size='large' className='custom-btn'
                                            onClick={() => handleSubmit()}
                                            loading={state.loading}
                                            disabled={state.disabled}
                                        >
                                            Hoàn tất đơn hàng
                                        </Button>
                                    </div>
                                }
                                {
                                    (orderList.status === 'S1' || orderList.status === 'S2') &&
                                    <div className="order-detail-remove-order">
                                        <Button size='large' className='custom-btn'
                                            onClick={() => handleRemoveOrder()}
                                        >
                                            Huỷ đơn hàng
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={state.isOpen}
                title={state.title}
                onCancel={closeModal}
                onConfirm={() => confirmModal(state.callbackModal)}
            />
        </div>
    )
}

export default OrderDetail;