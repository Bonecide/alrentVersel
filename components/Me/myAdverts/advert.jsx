import React from 'react';
import s from "../../../styles/userId.module.scss";
import Image from "next/image";
import Link from "next/link";
import Rating from "../../Rating/Rating";
import {setRating} from "../../../util/setRating";

const Advert = ({p}) => {
    const setRate = (id, rate) => {
        setRating(id, rate, token)
    }
    return (
        <div className={s.mainInfo}>
            <div className={s.mainImg}>
                <Image src={p.image} alt={"mainIng"} layout={"raw"} width={0}
                       height={0}/>
                {p.status === "MODERATION" || p.status === "REJECTED" &&
                    <div className={s.status}>{p.status === "MODERATION" ? "В модерации" : "Отклонено"}</div>
                }
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
    );
};

export default Advert;