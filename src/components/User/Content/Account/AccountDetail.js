
import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';
import useDecodeToken from '../../../../customHook/useDecodeToken';
import useFetchUserInfo from '../../../../customHook/useFetchUserInfo';
import { userActions } from '../../../../redux/actions';
import moment from 'moment';
import './AccountDetail.scss'
import buildOptions from '../../../../utils/buildOptions';
import { randomString } from '../../../../utils/randomString';

const data = [
    {
        id: '1',
        orderCode: 'John Brown',
        orderDate: '12/10/2022',
        totalCost: 'New York No. 1 Lake Park',
        paymentMethod: 'Thanh toán khi nhận hàng',
        status: 'huỷ đơn',
    },
    {
        id: '2',
        orderCode: 'John Brown',
        orderDate: '13/12/2023',
        totalCost: '5768686',
        paymentMethod: 'Thanh toán khi nhận hàng',
        status: 'huỷ đơn',
    },
];

function AccountDetail() {
    const dispatch = useDispatch();
    const userInfo = useOutletContext();
    const moreUserInfo = useFetchUserInfo({ email: userInfo.email || randomString })[0];
    const orderList = useSelector(state => state.user.orderList);
    let paymentOptions = buildOptions(useSelector(state => state.user.payments));
    let statusOptions = buildOptions(useSelector(state => state.user.status))
    console.log(moreUserInfo);

    useEffect(() => {
        dispatch(userActions.fetchPayment());
        dispatch(userActions.fetchStatus());
    }, []);

    useEffect(() => {
        if(moreUserInfo?.id) {
            dispatch(userActions.getOrder({ userId: moreUserInfo?.id }));
        }
    }, [moreUserInfo?.id])

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderCode',
            fixed: 'left',
            width: 110,
            render: (orderCode) => (
                <Link to={`order-detail/${orderCode}`}>
                    {orderCode}
                </Link>
            )
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'orderDate',
            render: (orderDate) => {
                return (moment(orderDate).format('DD/MM/YYYY HH:mm:ss'))
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalCost',
            render: (totalCost) => {
                return (totalCost + ' ₫')
            }
        },
        {
            title: 'TT Thanh toán',
            dataIndex: 'paymentMethod',
            render: (paymentMethod) => {
                return (paymentOptions.find(x => x.value === paymentMethod)?.label)
            }
        },
        {
            title: 'TT vận chuyển',
            dataIndex: 'status',
            render: (status) => {
                return (statusOptions.find(x => x.value === status)?.label)
            }
        },
    ];

    return (
        <div className="account-detail-container">
            <div className='grid wide'>
                <div className='account-detail-content'>
                    <div className='account-detail-block'>
                        <span className='account-detail-block-title'>Tài khoản</span>
                        <ul className='account-detail-block-list'>
                            <li className='account-detail-block-item'>
                                <span className='account-detail-block-item-name'>Tên tài khoản: {`${userInfo.firstName} ${userInfo.lastName}`}</span>
                            </li>
                            <li className='account-detail-block-item'>
                                <i className="fas fa-home primary-color"></i>
                                <span className='account-detail-block-item-address'>&nbsp;Địa chỉ: {moreUserInfo?.Address && `${moreUserInfo.Address.address} ${moreUserInfo.Address.wardName}, ${moreUserInfo.Address.districtName}, ${moreUserInfo.Address.provinceName}`}</span>
                            </li>
                            <li className='account-detail-block-item'>
                                <i className="fas fa-mobile primary-color"></i>
                                <span className='account-detail-block-item-phone'>&nbsp;Điện thoại: {userInfo.phone}</span>
                            </li>
                        </ul>
                    </div>
                    <div className='account-detail-order'>
                        <span className='account-detail-order-title'>Đơn hàng của bạn</span>
                        <div className='account-detail-order-table'>
                            <Table
                                rowKey={obj => obj.id}
                                columns={columns}
                                dataSource={orderList}
                                pagination={{
                                    pageSize: 7,
                                }}
                                onChange={(pagination, filters, sorter, extra) => {
                                    console.log('params', pagination, filters, sorter, extra);
                                }}
                                scroll={{
                                    x: 500,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountDetail;