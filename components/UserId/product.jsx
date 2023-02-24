import React, {useState} from 'react';
import s from "../../styles/userId.module.scss";
import Image from "next/image";
import Link from "next/link";
import {convertData} from "../../modules/ConvertData/ConvertData";
import Rating from "../Rating/Rating";

const Product = ({p, user, like, setRate}) => {

    const [isLiked, setIsLiked] = useState(p.is_liked)

    return (
        <div className={s.item} key={p.id}>
            <div className={s.userInfo}>
                <div className={s.userAvatar}>
                    <Image src={user.avatar} alt={"avatar"} layout={"raw"} width={0}
                           height={0}/>
                </div>
                <div className={s.userName}>
                    {user.first_name}
                </div>
                <Link href={`/messages`} className={s.message}>
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 3.28571V15C1 16.1046 1.89543 17 3 17H19C20.1046 17 21 16.1046 21 15V3.28571M1 3.28571V3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V3.28571M1 3.28571L9.86894 9.36728C10.5506 9.83466 11.4494 9.83467 12.1311 9.36728L21 3.28571"
                            stroke="#2C52A5" strokeWidth="2"
                            strokeLinejoin="round"/>
                    </svg>
                </Link>
                <div className={s.like} onClick={() => {
                    like(p.id)
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
            <div className={s.date}>
                {convertData(p.updated_at)}
            </div>

            <div className={s.mainInfo}>
                <div className={s.mainImg}>
                    <Image src={p.image} alt={"mainIng"} layout={"raw"} width={0}
                           height={0}/>
                </div>
                <div className={s.stars}>
                    <Rating onClick={setRate} id={p.id} value={p.rating}/>
                </div>
                <div className={s.mainTitle}>
                    {p.title}
                </div>
                <div className={s.price}>
                    от {p.price} {p.currency}/{p.period === "DAY" ? "сут" : p.period === "HOUR" && "час"}
                </div>
                <div className={s.deposit}>
                    Залог: {p.deposit}
                </div>
                <Link href={`/ad/${p.id}`} className={s.action}>
                    Арендовать
                </Link>
                <br/><br/>
                <div className={s.location}>
                    {p.city.name}, {p.region.name}
                </div>
            </div>

        </div>
    );
};

export default Product;