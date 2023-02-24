import s from "../../styles/productsCarousel.module.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {
    CustomCarouselArrowLeft,
    CustomCarouselArrowRight
} from "../CustomCarouselArrow/CustomCarouselArrow";
import Rating from "../../components/Rating/Rating";
import Cookies from 'js-cookie';

import axios from "axios";
import {useState} from "react";
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import ProductCarouselCard from "./ProductCarouselCard";

const ProductsCarousel = ({items, type}) => {

    const token = Cookies.get('access')
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: items.length < 4 ? items.length : 4,
        slidesToScroll: items.length < 4 ? 1 : 3,
        nextArrow: <CustomCarouselArrowLeft/>,
        prevArrow: <CustomCarouselArrowRight/>,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: items.length < 2 ? items.length : 2,
                slidesToScroll: items.length < 2 ? 1 : 2,
                rows: 2,
                infinite: true
            }
        }]
    };
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const like = (id) => {
        axios.post(`${baseUrl}adverts/${id}/like_unlike/`, {}, config)
    }

    const router = useRouter()
   
    return (
        <div>

            <Slider {...settings}>
                {items.length && items.map((p) => (
                     <ProductCarouselCard type={type} key={p.id} p={p}/>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsCarousel;