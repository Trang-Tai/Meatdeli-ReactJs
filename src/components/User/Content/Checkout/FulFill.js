
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import check from '../../../../assets/check.png';
import cross from '../../../../assets/cross.png'
import { orderServices } from '../../../../services';
import './FulFill.scss';

function FulFill() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const [state, setState] = useState({
        status: true,
    })

    useEffect(() => {
        ; (async function () {
            if (searchParams.toString()) {
                try {
                    const res = await orderServices.vnPayReturnUrl(searchParams.toString());
                    if (res.errCode === 0) {
                        if (res.RspVnpCode === '00') {
                            setState((prev) => ({
                                ...prev,
                                status: true,
                            }))
                        } else {
                            setState((prev) => ({
                                ...prev,
                                status: false,
                            }))
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setState((prev) => ({
                        ...prev,
                        status: false,
                    }))
                }
            }
        })();
    }, [])

    // const location = useLocation();
    // const query = location.search;
    // console.log(query);

    return (
        <div className="fulfill-container">
            <div className='grid wide'>
                <div className='fulfill-content'>
                    {/* <div className='fulfill-loading text-center'>
                        <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
                    </div> */}
                    <div className='fulfill-order-status'>
                        <h2 className='fulfill-order-status-title'>{state.status ? 'Đặt hàng thành công' : 'Đặt hàng thất bại'}</h2>
                        <div className='fulfill-img'>
                            <div className='fulfill-img-status'
                                style={{
                                    backgroundImage: `url(${state.status && check || cross})`,
                                    animation: `${state.status && 'success' || 'failed'} 3s steps(1, end) 2`,
                                    border: `1px solid ${state.status && 'green' || 'red'}`,
                                }}
                            >
                            </div>
                        </div>
                        <ul className='fulfill-return-list'>
                            <li className='filfill-return-item'>
                                <Link className='custom-btn' to={'/'}>Trang chủ</Link>
                            </li>
                            <li className='filfill-return-item'>
                                <Link className='custom-btn' to={`/account/order-detail/${params.orderCode}`}>Chi tiết đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FulFill;