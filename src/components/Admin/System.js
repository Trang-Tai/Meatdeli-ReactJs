import { Outlet } from "react-router-dom";
import { adminIsAuthenticated, withRouter } from "../../hoc/authentication";
import Header from "./Header/Header";

function System(props) {
    return (
        <div className="system-container">
            <Header role={props.role} />
            <Outlet />
        </div>
    )
}

// export default System;

export default adminIsAuthenticated(System);