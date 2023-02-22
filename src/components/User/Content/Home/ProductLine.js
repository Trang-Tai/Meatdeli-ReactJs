import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { PRODUCT_LINE } from "../../../../utils/constant";
import customData from "../../../../utils/customProductLineData";
import './ProductLine.scss';

// chơi ngu đáng lẽ phải lưu image product line trong sql
const imgProductLine = [
    { productLine: PRODUCT_LINE.MEAT, img: "https://theme.hstatic.net/200000507659/1000893368/14/brand_1.jpg?v=215" },
    { productLine: PRODUCT_LINE.CHICKEN, img: "https://theme.hstatic.net/200000507659/1000893368/14/brand_4.jpg?v=215" },
    { productLine: PRODUCT_LINE.INSTANT_FOOD, img: "https://theme.hstatic.net/200000507659/1000893368/14/brand_5.jpg?v=215" },
    { productLine: PRODUCT_LINE.PROCESSED_FOOD, img: "https://theme.hstatic.net/200000507659/1000893368/14/brand_6.jpg?v=215" },
    { productLine: PRODUCT_LINE.SPICE, img: "https://theme.hstatic.net/200000507659/1000893368/14/brand_7.jpg?v=215" },
]

function ProductLine() {
    const listProductLines = useSelector(state => state.product.listProductLines);
    let [customListProductLines, setCustomListProductLines] = useState(customData(listProductLines));

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    // cái này đáng lẽ làm responsive trên setting (giữ resp kiểu này có ji tham khảo thêm)
    // const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

    // useEffect(() => {
    //     // MEDIA QUERY  
    //     const handler = e => setMatches(e.matches);
    //     const media = window.matchMedia("(min-width: 768px)")
    //     media.addEventListener('change', handler);

    //     return () => media.removeEventListener('change', handler);
    // }, []);

    useEffect(() => {
        // add image product line
        let copyListProductLines = listProductLines.map((item, index) => {
            if (item.subType) {
                return item;
            }
            let obj = imgProductLine.filter(x => x.productLine === item.productTypeCode);
            return {
                ...item,
                image: obj[0]?.img,
            }
        })
        setCustomListProductLines(customData(copyListProductLines));
    }, [listProductLines])

    return (
        <div className="product-line-container">
            <div className="product-line-content grid wide">
                <div className="product-line-banner row">
                    <div className="col c-12">
                        <Slider {...settings} responsive={false} autoplay={true} autoplaySpeed={2000} dots={true}>
                            <div className="slider-customize">
                                <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/slider_1.jpg?v=215" />
                            </div>
                            <div className="slider-customize">
                                <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/slider_2.jpg?v=215" />
                            </div>
                            <div className="slider-customize">
                                <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/slider_3.jpg?v=215" />
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="product-line-slick row">
                    <div className="col c-12">
                        {
                            customListProductLines && customListProductLines.length > 0 &&
                            <Slider {...settings} infinite={false} slidesToShow={5} slidesToScroll={5} >
                                {
                                    customListProductLines && customListProductLines.length > 0 &&
                                    customListProductLines.map((item, index) => {
                                        return (
                                            <div className="slider-customize" key={index}>
                                                <Link to={`/collections/${item.productTypeCode}`} className='slider-wrap-img'>
                                                    <img className="slider-img" src={item.image} />
                                                </Link>
                                                <Link to={`/collections/${item.productTypeCode}`}>{item.productTypeName}</Link>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className="slider-customize">
                                    <Link to={'#'} className='slider-wrap-img'>
                                        <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/brand_1.jpg?v=215" />
                                    </Link>
                                    <Link to={'#'}>Thịt heo tươi</Link>
                                </div>
                                <div className="slider-customize">
                                    <Link to={'#'} className='slider-wrap-img'>
                                        <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/brand_4.jpg?v=215" />
                                    </Link>
                                    <Link to={'#'}>Thịt gà tươi</Link>
                                </div>
                                <div className="slider-customize">
                                    <Link to={'#'} className='slider-wrap-img'>
                                        <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/brand_5.jpg?v=215" />
                                    </Link>
                                    <Link to={'#'}>Ăn liền</Link>
                                </div>
                                <div className="slider-customize">
                                    <Link to={'#'} className='slider-wrap-img'>
                                        <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/brand_6.jpg?v=215" />
                                    </Link>
                                    <Link to={'#'}>Chế biến sẵn</Link>
                                </div>
                                <div className="slider-customize">
                                    <Link to={'#'} className='slider-wrap-img'>
                                        <img className="slider-img" src="https://theme.hstatic.net/200000507659/1000893368/14/brand_7.jpg?v=215" />
                                    </Link>
                                    <Link to={'#'}>Gia vị</Link>
                                </div> */}
                            </Slider>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductLine;