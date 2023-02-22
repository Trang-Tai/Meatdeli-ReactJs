import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../../redux/actions";
import FreshChicken from "./FreshChicken";
import FreshMeat from "./FreshMeat";
import InstantFood from "./InstantFood";
import ProductLine from "./ProductLine";
import SpecialtyFood from "./SpecialtyFood";
import StrangeTasteFood from "./StrangeTasteFood";

function HomeBody() {
    const dispatch = useDispatch();
    const listProducts = useSelector(state => state.product.listProducts);

    useEffect(() => {
        // get productlist
        if (!listProducts || listProducts.length <= 0) {
            dispatch(productActions.getProduct());
        }
    }, [])

    const handleAddQtyCart = (productInfo, qty, action = '') => {
        dispatch(productActions.addProductCart(productInfo, qty, action));
    }

    console.log(process.env.REACT_APP_SHOPID_GHN)

    return (
        <div className="homebody-container">
            <ProductLine></ProductLine>
            <SpecialtyFood></SpecialtyFood>
            <FreshMeat handleAddQtyCart={handleAddQtyCart}></FreshMeat>
            <FreshChicken handleAddQtyCart={handleAddQtyCart}></FreshChicken>
            <InstantFood handleAddQtyCart={handleAddQtyCart}></InstantFood>
            <StrangeTasteFood handleAddQtyCart={handleAddQtyCart}></StrangeTasteFood>
        </div>
    )
}

export default HomeBody;