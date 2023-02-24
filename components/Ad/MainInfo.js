import s from "../../styles/ad.module.scss"
import Carousel from "./Carousel/Carousel";
import Map from "./Map/Map";
import Chat from "./Chat/Chat";
import { useState,useEffect } from "react";
import Cookies  from 'js-cookie';
import Rating from "../../components/Rating/Rating";
import { setRating } from './../../util/setRating';
import axios from "axios";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
const MainInfo = ({ad}) => {


   const token = Cookies.get('access')
    const setRate = (id,rate) => {
        setRating(id,rate,token)
    }

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const like = (id) => {
        axios.post(`${baseUrl}adverts/${id}/like_unlike/`, {}, config)
    }
    const [isLiked, setIsLiked] = useState()
    useEffect(() => {
        setIsLiked(ad.is_liked)
    }, [ad])
    return (
        <div className={s.MainInfo}>
            <div className={s.carousel}>
               
                <div className={s.stars}>
                   <Rating onClick={setRate} id={ad.id} value={ad.rating} />
                    <div className={s.like} onClick={() => {
                        like(ad.id)
                        setIsLiked(!isLiked)
                    }}>
                        {!isLiked ?
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.163 1.92195C17.1019 0.818098 15.695 0.146971 14.1982 0.0306135C12.7015 -0.0857435 11.2142 0.360398 10.0071 1.2879C8.73534 0.304245 7.15245 -0.141793 5.57716 0.039611C4.00187 0.221015 2.55117 1.01639 1.51722 2.26556C0.483262 3.51473 -0.0571552 5.12491 0.00479304 6.77185C0.0667413 8.41879 0.726454 9.98016 1.85108 11.1415L9.2974 18.8851C9.39032 18.9826 9.50087 19.0599 9.62267 19.1127C9.74447 19.1654 9.87511 19.1926 10.0071 19.1926C10.139 19.1926 10.2696 19.1654 10.3914 19.1127C10.5132 19.0599 10.6238 18.9826 10.7167 18.8851L18.163 11.1415C18.7454 10.5363 19.2074 9.81767 19.5226 9.0267C19.8378 8.23573 20 7.38793 20 6.53173C20 5.67554 19.8378 4.82773 19.5226 4.03677C19.2074 3.2458 18.7454 2.52717 18.163 1.92195ZM16.7537 9.67595L10.0071 16.6816L3.26038 9.67595C2.66585 9.05511 2.26085 8.26552 2.09619 7.40623C1.93152 6.54694 2.01453 5.65622 2.33479 4.8458C2.65506 4.03538 3.19831 3.34136 3.89642 2.85079C4.59452 2.36022 5.41638 2.09494 6.2589 2.08825C7.38446 2.09112 8.46291 2.55841 9.25742 3.38752C9.35034 3.48494 9.46089 3.56226 9.58269 3.61503C9.70449 3.6678 9.83513 3.69497 9.96707 3.69497C10.099 3.69497 10.2297 3.6678 10.3515 3.61503C10.4733 3.56226 10.5838 3.48494 10.6767 3.38752C11.4946 2.65045 12.5513 2.26406 13.6328 2.30655C14.7143 2.34904 15.7399 2.81724 16.502 3.61638C17.2641 4.41552 17.7058 5.48592 17.7377 6.61093C17.7696 7.73593 17.3893 8.83152 16.6738 9.67595H16.7537Z"
                                    fill="#2C52A5"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill={"rgba(44, 82, 165, 1)"}>
                                <path
                                    d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
                            </svg>
                        }
                    </div>
                </div>
                <Carousel img={ad.images}/>
            </div>
            <div className={s.mainTextContent}>
                <div className={s.mainTitle}>
                    {ad.title}
                </div>
                <div className={s.mainPrice}>
                    {ad.price}{' '}{ad.currency} {' '}/{' '}{ad.period}
                </div>
                <div className={s.mainText}>
                    Залог: {ad.deposit}
                </div>
                <div className={`${s.mainText} ${s.attributes}`}>
                    <span>Характеристики</span> <br/>
                    {ad.attributes.map((i) => {


                        if(i.attribute.is_manual) {

                            const value = () => {
                                if(i.integer_value) {
                                    return i.integer_value
                                }
                                else if(i.boolean_value === true || i.boolean_value === false) {
                                    if( i.boolean_value === true) {
                                        return "Да"
                                    }
                                    else return "Нет"
                                }
                                else if (i.decimal_value) {
                                    return i.decimal_value
                                }
                                else if (i.string_value) {
                                    return i.string_value
                                }
                            }
                            return (
                                <div className={s.attribute} key={i.id}>
                                    <p className={s.title}>{i.attribute.name}:</p>
                                    <p>{value()} {' '} {i.attribute.measure}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={s.mainText}>
                    <span>Описание</span> <br/>
                    {ad.desc}
                </div>
                <div className={s.mainText}>
                    <span>Расположение</span> <br/>
                    {ad.address}
                </div>
                <div className={s.map}>
                    <Map/>
                </div>
            </div>

            <div className={s.chat}>
                <Chat/>
            </div>

        </div>
    );
};

export default MainInfo;