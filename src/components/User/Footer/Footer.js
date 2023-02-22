import { Link, Navigate } from 'react-router-dom';
import './Footer.scss'

function Footer() {
    return (
        <div className="footer-container">
            <div className='grid wide'>
                <div className='footer-content row'>
                    <div className='col c-5 m-6 s-12'>
                        <div className='footer-comp-info'>
                            <img src='https://theme.hstatic.net/200000507659/1000893368/14/logo-footer.png?v=219' />
                            <span className='footer-comp-name'>CÔNG TY TNHH MEATDELI SÀI GÒN</span>
                            <div className='footer-comp-location'>
                                <i className="footer-comp-icon fas fa-map-marker-alt"></i>
                                <span className='footer-comp-address'>Địa chỉ: Lô 2 đường Tân Đức, KCN Tân Đức, Xã Hựu Thạnh, Huyện Đức Hoà, Tỉnh Long An, Việt Nam</span>
                            </div>
                            <div className='footer-comp-contact'>
                                <i className="footer-comp-icon fas fa-mobile-alt"></i>
                                <span className='footer-comp-phone'>
                                    Số điện thoại:
                                    <a href='tel:18006828'>1800 6828</a>
                                </span>
                            </div>
                            <div className='footer-comp-email'>
                                <i className="footer-comp-icon fas fa-envelope"></i>
                                <span className='footer-comp-email-address'>
                                    Email:
                                    <a href="mailto:meatdeli@mml.masangroup.com">meatdeli@mml.masangroup.com</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='col c-2 m-6 s-12'>
                        <div className='footer-comp-more-info'>
                            <div className='footer-comp-more-info-title'>
                                <span>Tìm hiểu thêm</span>
                            </div>
                            <ul className='footer-comp-more-info-list'>
                                <li className='footer-comp-more-info-item'>Trang chủ</li>
                                <li className='footer-comp-more-info-item'>Sản phẩm</li>
                                <li className='footer-comp-more-info-item'>Góc mẩ thực</li>
                                <li className='footer-comp-more-info-item'>Giới thiệu</li>
                                <li className='footer-comp-more-info-item'>Liên hệ</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col c-3 m-6 s-12'>
                        <div className='footer-comp-customer-services'>
                            <div className='footer-comp-customer-services-title'>
                                <span>Hỗ trợ khách hàng</span>
                            </div>
                            <ul className='footer-comp-customer-services-list'>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH THANH TOÁN</li>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH BẢO MẬT THÔNG TIN</li>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH VẬN CHUYỂN</li>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH XỬ LÝ KHIẾU NẠI</li>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH KIỂM HÀNG ĐỔI TRẢ</li>
                                <li className='footer-comp-customer-services-item'>CHÍNH SÁCH BẢO HÀNH</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col c-2 m-6 s-12'>
                        <div className='footer-comp-follow-us'>
                            <div className='footer-comp-follow-us-title'>
                                <span>Theo dõi chúng tôi</span>
                            </div>
                            <div className='footer-comp-follow-us-social-network'>
                                <ul className='footer-comp-follow-us-social-network-list'>
                                    <li className='footer-comp-follow-us-social-network-item'>
                                        <a className='footer-comp-follow-us-social-network-facebook'>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li className='footer-comp-follow-us-social-network-item'>
                                        <a className='footer-comp-follow-us-social-network-youtube'>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>
                                    <li className='footer-comp-follow-us-social-network-item'>
                                        <a className='footer-comp-follow-us-social-network-zalo'>
                                            <img className='footer-comp-follow-us-social-network-zalo-img' src='https://giaiphapzalo.com/wp-content/uploads/2021/10/zalosvg.svg' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;