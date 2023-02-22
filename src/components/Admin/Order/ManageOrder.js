import { PDFDownloadLink } from '@react-pdf/renderer';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/actions';
import buildOptions from '../../../utils/buildOptions';
import { TYPE } from '../../../utils/constant';
import ConfirmModal from '../../ConfirmModal';
import Bill from './Bill';
import './ManageOrder.scss';

function ManageOrder() {
    const dispatch = useDispatch();
    const listStatus = useSelector(state => state.user.status);
    const listOrder = useSelector(state => state.user.orderList).filter(x => x.status !== 'S0');
    let statusOptions = buildOptions(listStatus, TYPE.STATUS).sort((a, b) => a.value - b.value ? -1 : 1);

    const [state, setState] = useState({
        status: '',
        orderCodeSearch: '',

        isOpen: false,
        title: '',
    })

    useEffect(() => {
        dispatch(userActions.fetchStatus());
    }, []);

    useEffect(() => {
        dispatch(userActions.getOrder({ status: state.status, orderCode: state.orderCodeSearch }));
    }, [state.status, state.orderCodeSearch])

    const handleChangeState = (value, type) => {
        console.log(value)
        setState((prev) => ({
            ...prev,
            orderCodeSearch: '',
            [type]: value,
        }))
    }

    const closeModal = () => {
        setState((prev) => ({
            ...prev,
            isOpen: false,
            title: '',
        }))
    }

    const handleUpdateStatus = ({ status: value, orderCode }) => {
        let status = value;
        if (value === 'S4' || value === 'S5') {
            setState((prev) => ({
                ...prev,
                isOpen: true,
                title: 'cannot update status!'
            }))
            return;
        }
        for (let i = 0; i < statusOptions.length; i++) {
            if (statusOptions[i].value === value) {
                status = statusOptions[i + 1].value;
                break;
            }
        }
        console.log(value, status);
        const data = {
            orderCode: orderCode,
            status: status,
            oldStatus: state.status,
        }
        dispatch(userActions.updateOrder(data));
    }

    const handleSearch = (value) => {
        setState((prev) => ({
            ...prev,
            status: '',
            orderCodeSearch: value,
        }));
    }

    console.log(listOrder)

    return (
        <div className="manage-order-container">
            <div className='grid wide'>
                <div className='manage-order-content'>
                    <div className='manage-order-search'>
                        <h1 className='text-center'>Manage Orders</h1>
                        <Input.Search
                            placeholder=""
                            allowClear
                            // enterButton="Search"
                            enterButton
                            size="large"
                            onSearch={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className="manage-order-filter">
                        <ul className="manage-order-filter-list">
                            {
                                statusOptions && statusOptions.length > 0 &&
                                statusOptions.map((item, index) => {
                                    if (item.value === 'S0') {
                                        return;
                                    }
                                    return (
                                        <li className={`manage-order-filter-item ${state.status === item.value ? 'active' : ''}`}
                                            key={index}
                                            onClick={() => handleChangeState(item.value, 'status')}
                                        >
                                            {item.label || 'Tất cả'}
                                        </li>
                                    )
                                })
                            }
                            {/* <li className="manage-order-filter-item active" onClick={() => alert('aaa')}>Tất cả</li>
                            <li className="manage-order-filter-item active" onClick={() => alert('aaa')}>Chờ xác nhận</li>
                            <li className="manage-order-filter-item">Đã xác nhận</li>
                            <li className="manage-order-filter-item">Đang vận chuyển</li>
                            <li className="manage-order-filter-item">Giao thành công</li>
                            <li className="manage-order-filter-item">Đã huỷ</li> */}
                        </ul>
                    </div>
                    <div className="manage-order-list">
                        {
                            listOrder && listOrder.length > 0 &&
                            listOrder.map((item, index) => {
                                return (
                                    <div className='manage-order-item' key={index}>
                                        <div className='row'>
                                            <div className='col c-6 m-6 s-12'>
                                                {
                                                    item?.OrderDetails.map((productItem, productIndex) => {
                                                        return (
                                                            <div className='manage-order-product-info' key={productIndex}>
                                                                <div className='manage-order-product-img'>
                                                                    <img src={productItem?.Product?.productImageData[0].image} />
                                                                </div>
                                                                <span className='manage-order-product-name'>{productItem?.Product?.productName}</span>
                                                                <span className='manage-order-product-quantity'>x{productItem.quantityOrdered}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='col c-6 m-6 s-12'>
                                                <h2 className='manage-order-code'>{item.orderCode}</h2>
                                                <div className='manage-order-customer-info'>
                                                    <span className='manage-order-customer-name'>
                                                        <i className="fas fa-user"></i>
                                                        {item.User && `${item.User.firstName} ${item.User.lastName}`}
                                                    </span>
                                                    <span className='manage-order-customer-phone'>
                                                        <i className="fas fa-mobile-alt"></i>
                                                        {item?.User?.phone}
                                                    </span>
                                                    <span className='manage-order-customer-address'>
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        {item.shippingAddressTo}
                                                    </span>
                                                    <h3>
                                                        <i className="fas fa-coins"></i> &nbsp;
                                                        {item.totalCost}₫
                                                    </h3>
                                                    <button className='custom-btn' style={{ marginRight: '5px' }} onClick={() => handleUpdateStatus(item)}>Chuyển trạng thái</button>
                                                    {/* <button className='custom-btn'>In vận đơn</button> */}
                                                    <PDFDownloadLink document={<Bill orderInfo={item} />} fileName={`${item.orderCode}-bill.pdf`} className='custom-btn' style={{ display: 'inline-block' }}>
                                                        {({ blob, url, loading, error }) => (loading ? 'Đang tải...' : 'In vận đơn')}
                                                    </PDFDownloadLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* <div className='manage-order-item'>
                            <div className='row'>
                                <div className='col c-6 m-6 s-12'>
                                    <div className='manage-order-product-info'>
                                        <div className='manage-order-product-img'>
                                            <img src='https://res.cloudinary.com/dly4liyhf/image/upload/v1672041611/Meatdeli/Products/h0au2r3gp32up2ewcf9b.webp' />
                                        </div>
                                        <span className='manage-order-product-name'>Ba rọi không da chuẩn ngon 350g Ba rọi không da chuẩn ngon 350g</span>
                                        <span className='manage-order-product-quantity'>x3</span>
                                    </div>
                                    <div className='manage-order-product-info'>
                                        <div className='manage-order-product-img'>
                                            <img src='https://res.cloudinary.com/dly4liyhf/image/upload/v1672041611/Meatdeli/Products/h0au2r3gp32up2ewcf9b.webp' />
                                        </div>
                                        <span className='manage-order-product-name'>Ba rọi không da chuẩn ngon 350g</span>
                                        <span className='manage-order-product-quantity'>x3</span>
                                    </div>
                                </div>
                                <div className='col c-6 m-6 s-12'>
                                    <h2 className='manage-order-code'>FYJ2UMF0C</h2>
                                    <div className='manage-order-customer-info'>
                                        <span className='manage-order-customer-name'>
                                            <i className="fas fa-user"></i>
                                            Nguyen An
                                        </span>
                                        <span className='manage-order-customer-phone'>
                                            <i className="fas fa-mobile-alt"></i>
                                            0988736354
                                        </span>
                                        <span className='manage-order-customer-address'>
                                            <i className="fas fa-map-marker-alt"></i>
                                            34 Nguyễn Trãi p5 q5
                                            34 Nguyễn Trãi p5 q5
                                            34 Nguyễn Trãi p5 q5
                                        </span>
                                        <h3>
                                            <i className="fas fa-coins"></i> &nbsp;
                                            430000₫
                                        </h3>
                                        <button className='custom-btn' style={{ marginRight: '5px' }}>Xác nhận đơn hàng</button>
                                        <button className='custom-btn'>In vận đơn</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={state.isOpen}
                onCancel={closeModal}
                onConfirm={closeModal}
                title={state.title}
            />
        </div>
    )
}

export default ManageOrder;