import { Routes, Route } from "react-router-dom";
import System from "../components/Admin/System";
import ManageUser from "../components/Admin/User/ManageUser";
import CreateStaff from "../components/Admin/User/CreateStaff"
import Login from "../components/Admin/Login";
import ManageProductLine from "../components/Admin/Product/ProductLine/ManageProductLine";
import ManageProduct from "../components/Admin/Product/ManageProduct";
import ManageOrder from "../components/Admin/Order/ManageOrder";

function Admin() {
    return (
        <div className="admin-container">
            <div className="admin-list">
                <Routes>
                    <Route path="system" element={<System />}>
                        <Route path="create-staff" element={<CreateStaff />} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="create-type-product" element={<ManageProductLine />} />
                        <Route path="upsert-product" element={<ManageProduct />} />
                        <Route path="manage-order" element={<ManageOrder />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin;