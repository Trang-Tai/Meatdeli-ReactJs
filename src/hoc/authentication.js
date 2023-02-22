import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useCheckAdminLogin from "../customHook/useCheckAdminLogin";

function adminIsAuthenticated(WrappedComponent) {
    return function CustomComponent(props) {
        // let location = useLocation();
        // let history = useNavigate();
        // let params = useParams();
        const { isLogin, role } = useCheckAdminLogin();
        return (
            isLogin ?
                (role === 'R1' || role === 'R2' ?
                    <WrappedComponent {...props} role={role}/> :
                    <Navigate
                        to={`/admin/login`}
                    />
                ) :
                <Navigate
                    to={`/admin/login`}
                />
        );
    }
}

function adminIsNotAuthenticated(WrappedComponent) {
    return function CustomComponent(props) {
        const { isLogin, role } = useCheckAdminLogin();
        return (
            !isLogin ?
                <WrappedComponent {...props} />
                :
                (
                    role === 'R1' || role === 'R2' ?
                        <Navigate
                            to={`/admin/system/manage-user`}
                        /> :
                        <WrappedComponent {...props} />
                )
        )
    }
}

function userIsAuthenticated(WrappedComponent) {
    return function CustomComponent(props) {
        const token = useSelector(state => state.user.token);
        return (
            token ?
                <WrappedComponent {...props} /> :
                <Navigate to={`/login`} />
        );
    }
}

function userIsNotAuthenticated(WrappedComponent) {
    return function CustomComponent(props) {
        const token = useSelector(state => state.user.token);
        return (
            !token ?
                <WrappedComponent {...props} /> :
                <Navigate to={`/account`} />
        )
    }
}

export {
    adminIsAuthenticated,
    adminIsNotAuthenticated,
    userIsAuthenticated,
    userIsNotAuthenticated,
}