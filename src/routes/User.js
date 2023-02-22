import { Routes, Route } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import Test from "../components/Test";
import AccountDetail from "../components/User/Content/Account/AccountDetail";
import Address from "../components/User/Content/Account/Address";
import ChangePassword from "../components/User/Content/Account/ChangePassword";
import NavAccount from "../components/User/Content/Account/NavAccount";
import OrderDetail from "../components/User/Content/Account/OrderDetail";
import Login from "../components/User/Content/Auth/Login";
import Register from "../components/User/Content/Auth/Register";
import Cart from "../components/User/Content/Cart/Cart";
import Checkout from "../components/User/Content/Checkout/Checkout";
import FulFill from "../components/User/Content/Checkout/FulFill";
import DetailProduct from "../components/User/Content/DetailProduct/DetailProduct";
import HomeBody from "../components/User/Content/Home/HomeBody";
import ListProduct from "../components/User/Content/ListProduct/ListProduct";
import HomePage from "../components/User/HomePage";

function User() {
    return (
        <div className="user-container">
            <div className="user-list">
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="account" element={<NavAccount />}>
                            <Route path="change-password" element={<ChangePassword />} />
                            <Route path="address" element={<Address />} />
                            <Route path="order-detail/:orderId" element={<OrderDetail />} />
                            <Route index exact element={<AccountDetail />} />
                        </Route>
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/finish-order/:orderCode" element={<FulFill />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/collections/:productLine" element={<ListProduct />} />
                        <Route path="/products/:productId" element={<DetailProduct />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route index element={<HomeBody />} />
                        <Route path="test" element={<Test />} /> 
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
// ROUTE /test dùng để test
export default User;