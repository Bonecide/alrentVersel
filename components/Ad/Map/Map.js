import s from "../../../styles/adMap.module.scss"
import {useState} from "react";

const Map = () => {

    const [isMapOpen, setIsMapOpen] = useState(false)

    return (
        <div className={s.map}>
            <div className={s.showMapTitle} onClick={() => setIsMapOpen(!isMapOpen)}>
                Скрыть карту
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none"
                     style={{transform: `${isMapOpen ? "rotate(180deg)" : "rotate(0deg)"}`}}>
                    <path d="M1 6L6 1L11 6" stroke="#2C52A5"/>
                </svg>
            </div>
            <div className={s.mapContent}>

            </div>
        </div>
    );
};

export default Map;