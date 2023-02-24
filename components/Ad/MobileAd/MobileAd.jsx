import s from './MobileAd.module.scss';
import Carousel from './../Carousel/Carousel';
import Map from './../Map/Map';
import userAvatar from "../../../public/userAvatar.png";
import Image from 'next/image';
export default function MobileAd({ad}) {
        console.log(ad)
    return(
        <div className={s.mobileAdContainer}>
            <div className= {s.owner}>
                <div className={s.ownerAvatar}>
                    <Image src={ad.user.avatar} width={0} height={0} alt={'user'}/>
                    <div>
                    <h5>{ad.user.username}</h5>
                    <p>Сегодня 07:56</p>
                    </div>
                </div>
                <div className={s.buttons}>
                    <button className={s.write}>
                    написать
                    </button>
                    <button className={s.phone}>
                    позвонить
                    </button>
                </div>
            </div>
            <div className={s.carousel}>
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

        </div>
    )
}