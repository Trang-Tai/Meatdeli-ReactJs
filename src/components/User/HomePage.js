import { useEffect } from "react";
import axios from '../../axios';
import { Input } from "antd";
import { HOTLINE } from "../../utils/constant";
import { Link, Outlet } from "react-router-dom";
import SearchHeader from "./Header/SearchHeader";
import NavHeader from "./Header/NavHeader";
import './HomePage.scss';
import Footer from "./Footer/Footer";
const { Search } = Input;

function HomePage() {
    return (
        <div className="app-container">
            <div className="app-header">
                <SearchHeader />
                <NavHeader />
            </div>
            <div className="app-content">
                <Outlet />
            </div>
            <div className="app-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default HomePage;