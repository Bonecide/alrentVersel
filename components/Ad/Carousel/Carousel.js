import s from "../../../styles/adCarousel.module.scss"
import {useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    CustomCarouselArrowLeft,
    CustomCarouselArrowRight
} from "../../../modules/CustomCarouselArrow/CustomCarouselArrow";
import Image from "next/image";
import productImg2 from "../../../public/productImg2.png"

const Carousel = ({img}) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [imgArr,setImgArr] = useState()
    const slider1 = useRef(null);
    const slider2 = useRef(null);
   
    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);
    useEffect(() => {
        if(img) {
            setImgArr(img)
        }
    },[img])
    const settings = {
        nextArrow: <CustomCarouselArrowRight/>,
        prevArrow: <CustomCarouselArrowLeft/>,
        centerPadding: "60px",
    };
    return (
        <div style={{'width' : '460px'}} className={s.slideContainer}>

            <Slider responsive={[ {
       
       breakpoint: 768,
       dots: true,
       arrows : false,
  
     }]} dots= {true} asNavFor={nav2} ref={slider1} {...settings}>
                
                {imgArr && imgArr.map((i) => (
                    <div key={i.id}>
                        <div className={s.mainImg}>
                             <Image src={i.file} width={0} height={0} alt={"productImg2"} layout={"raw"}/>
                        </div>
                    </div>
                ))}

            </Slider>

            <br/> <br/>
        <div className={s.NONMOBILE}>
           {imgArr?.length > 2 && (
             <Slider
             asNavFor={nav1}
             ref={slider2}
             slidesToShow={2}
             swipeToSlide={true}
             focusOnSelect={true}
             
             {...settings}>
             {imgArr && imgArr.map((i) => (
                 <div key={i.id}>
                     <div className={s.secondImg}>
                          <Image src={i.file} width={0} height={0} alt={"productImg2"} layout={"raw"}/>
                     </div>
                 </div>
             ))}

         </Slider>
           )}
        </div>
        </div>
    );
};

export default Carousel;