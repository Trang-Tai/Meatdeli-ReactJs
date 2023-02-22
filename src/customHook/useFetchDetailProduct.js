import { useEffect, useState } from "react";
import { productServices } from "../services";

function useFetchDetailProduct({ id }) {
    const [product, setProduct] = useState({});
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await productServices.getProduct({ id, });
                if (res.errCode === 0) {
                    setProduct(res.products[0])
                } else {
                    setProduct({})
                }
            } catch (error) {
                setProduct({})
            }
        }
        fetchData();
    }, [id]);
    return product;
}

export default useFetchDetailProduct;