import s from "../../styles/liked.module.scss"
import {useState} from "react";
import ProductCarouselCard from "../../modules/productsCarousel/ProductCarouselCard";
import axios from "axios";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import cookie from "js-cookie";
import {convertData} from "../../modules/ConvertData/ConvertData";
import {setRating} from "../../util/setRating";
import Rating from "../Rating/Rating";

const Liked = ({likedAds}) => {

    const [active, setActive] = useState(1)


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
        <section className={s.liked}>
            <div className="container">
                <div className={s.wrap}>
                    <div className={s.content}>
                        <div className={s.title}>
                            Избранное
                        </div>
                        <div className={s.tabs}>
                            <div className={s.tab} style={{color: `${active === 1 ? "#5855EE" : "#919191"}`}}
                                 onClick={() => setActive(1)}>
                                Объявления
                            </div>
                            <div className={s.tab} style={{color: `${active === 2 ? "#5855EE" : "#919191"}`}}
                                 onClick={() => setActive(2)}>
                                Поиски
                            </div>
                        </div>

                        {active === 1 && (
                            <div className={s.items}>
                                {Array.isArray(likedAds) && likedAds.map(p => {
                                        
                                        return(
                                            <ProductCarouselCard key={p.id} p={p}/>
                                        )
                                    }
                                )}
                            </div>
                        )}

                        {active === 2 && (
                            <div>
                                <p>Гитара</p>
                                <p>Фотоопарат</p>
                                <p>Дом</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Liked;