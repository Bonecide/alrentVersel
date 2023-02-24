import s from "../../styles/userId.module.scss"
import Image from "next/image";
import Link from "next/link";
import avatar from "../../public/userAvatar.png"
import productImg1 from "../../public/productImg1.png";
import userAvatar from "../../public/userAvatar.png";
import OpenImgFullSize from "../../modules/OpenImgFullSize/OpenImgFullSize";
import {useEffect, useState} from "react";
import {convertData} from "../../modules/ConvertData/ConvertData";
import Rating from "../Rating/Rating";
import {setRating} from "../../util/setRating";
import axios from "axios";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import cookie from "js-cookie";
import Product from "./product";

const UserId = ({user, userAdverts}) => {

    const [isImgOnFullSize, setIsImgOnFullSize] = useState(false)

    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(userAdverts ? userAdverts : [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const like = (id) => {
        axios.post(`${baseUrl}adverts/${id}/like_unlike/`, {}, config)
    }
    const token = cookie.get("access")
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const setRate = (id, rate) => {
        setRating(id, rate, token)
    }

    return (
        <section className={s.userId}>
            <div className="container">
                {isImgOnFullSize && <OpenImgFullSize img={user.avatar} setIsImgOnFullSize={setIsImgOnFullSize}/>}
                <div className={s.wrap}>
                    <div className={s.content}>
                        <div className={s.userInfo1}>
                            <div className={s.dFlex}>
                                {user.avatar ?
                                    <Image src={user.avatar} alt={"userAvatar"} layout={"raw"} width={"50"} height={50}
                                           className={s.avatar} onClick={() => setIsImgOnFullSize(true)}/>
                                    : <div className={"defaultAvatar"}>
                                        {userName[0]}
                                    </div>
                                }
                                <span>
                                     {user.first_name}
                                    <div>
                                        Была в сети 0 ч. назад
                                    </div>
                                </span>
                            </div>
                            <div className={s.subtitle}>
                                Отвечает на 17% сообщений <br/>
                                На сайте с 01.01.0000
                            </div>
                        </div>

                        <div className={s.ads}>
                            <div className={s.adsTitle}>
                                Объявления
                            </div>

                            <div className={s.items}>
                                {items.map(p => {
                                        if (p.status === "ACTIVE") {
                                            return (
                                                <Product key={p.id} user={user} p={p} like={like} setRate={setRate}/>
                                            )
                                        }
                                    }
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserId;