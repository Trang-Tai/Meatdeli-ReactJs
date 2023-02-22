import { Link } from 'react-router-dom';
import './ErrorComponent.scss';

function ErrorComponent() {

    return (
        <div className="error-container">
            <div className='grid wide'>
                <div className='error-content text-center'>
                    <h1>404</h1>
                    <p>Trang này đang bị lỗi bạn vui lòng quay trở lại trang chủ</p>
                    <Link className=' custom-btn' to={'/'}>Về Trang chủ</Link>
                </div>
            </div>
        </div >
    )
}

export default ErrorComponent;