import React, {useEffect, useRef, useState} from 'react';
import s from "../../styles/me.module.scss";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from 'next/router';
import Image from 'next/image';
import ProfileSettings from './../../modules/ProfileSettings/ProfileSettings';
import RegDropDown from "../Registration/dropDown/regDropDown";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import axios from "axios";
import swal from 'sweetalert';
import cookie from "js-cookie";
import {useDispatch} from "react-redux";
import {setUserInfo} from "../../store/slices/ProfileSlice";
import MyAdverts from "./myAdverts/myAdverts";
import {setRating} from "../../util/setRating";

const Items = ({cities, regions, userInfo}) => {
    const token = cookie.get("access")
    const router = useRouter()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState()
    const [width, setWidth] = useState(0)
    const [myAdverts, setMyAdverts] = useState()


    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}users_me/phones/`, config).then(res => {
            let lastElem = res.data[res.data.length - 1]
            setPhone(lastElem?.phone)
        })
        axios.get(`${baseUrl}my_adverts/`, config).then(res => {
            setMyAdverts(res.data)
            console.log(res.data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [currentActive, setCurrentActive] = useState(1)


    return (
        <>
            <div className={s.items}>
                <div className={s.itemsContentContainer}>
                    <div className={s.itemWrap} onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                        <div className={s.item}>
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2.25H3.375" stroke="#5855EE" strokeWidth="1.5"/>
                                <path d="M6.75 2.25H22.5" stroke="#5855EE" strokeWidth="1.5"/>
                                <circle cx="5.0625" cy="2.25" r="1.5" stroke="#5855EE" strokeWidth="1.5"/>
                                <path d="M0 8.99998H11.25" stroke="#5855EE" strokeWidth="1.5"/>
                                <path d="M14.625 8.99998L22.5 8.99999" stroke="#5855EE" strokeWidth="1.5"/>
                                <circle cx="12.9375" cy="8.99998" r="1.5" stroke="#5855EE" strokeWidth="1.5"/>
                                <path d="M0 15.75H2.8125" stroke="#5855EE" strokeWidth="1.5"/>
                                <path d="M6.1875 15.75L22.5 15.75" stroke="#5855EE" strokeWidth="1.5"/>
                                <circle cx="4.5" cy="15.75" r="1.5" stroke="#5855EE" strokeWidth="1.5"/>
                            </svg>
                            Настройки
                            <span>
                            <svg width="8" height="12" viewBox="0 0 8 12"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 6L1 11" stroke="#999999"
                                      strokeLinecap="round"/>
                            </svg>
                        </span>
                        </div>
                    </div>
                    <div  className={s.itemWrap} onClick={() => router.push("/me/cash")}>
                        <div className={s.item}>
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.5 5H19L16 1H4L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V8"
                                    stroke="#5855EE" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
                                    stroke="#5855EE" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            Кошелек:
                            <div className={s.cash}>
                                0 руб.
                            </div>
                        </div>
                        <div className={s.btn}>
                            пополнить
                        </div>
                    </div>

                    <div className={s.itemWrap} onClick={() => router.push("/me/updateProfile")}>
                        <div className={s.item}>
                            <svg width="25" height="21" viewBox="0 0 25 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.0319 19.1422C14.4199 18.8923 15.5204 18.5116 16.0319 18C16.1038 17.3531 16.0319 16.3333 16.0319 16.3333C16.0319 15.4493 15.6105 14.6014 14.8604 13.9763C12.4914 12.0022 4.57247 12.0022 2.20352 13.9763C1.45337 14.6014 1.03195 15.4493 1.03195 16.3333C1.03195 16.3333 0.960068 17.3531 1.03195 18C1.54351 18.5116 2.64392 18.8923 4.03194 19.1422"
                                    stroke="#5855EE" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path d="M20.0322 6V12" stroke="#5855EE" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M23.0322 9H17.0322" stroke="#5855EE" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M8.53223 9C10.7414 9 12.5322 7.20914 12.5322 5C12.5322 2.79086 10.7414 1 8.53223 1C6.32309 1 4.53223 2.79086 4.53223 5C4.53223 7.20914 6.32309 9 8.53223 9Z"
                                    stroke="#5855EE" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>

                            Профиль
                        </div>
                        <div className={s.btn}>
                            улучшить
                        </div>
                    </div>

                    <div className={s.itemWrap}>
                        <div className={s.item}>
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 17V11H4.5V17H8V7H11.5V17H15V1H18.5V17" stroke="#5855EE"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Эффективность
                            <span>
                            <svg width="8" height="12" viewBox="0 0 8 12"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 6L1 11" stroke="#999999"
                                      strokeLinecap="round"/>
                            </svg>
                        </span>
                        </div>
                    </div>
                    <div className={s.addCircleContainer}>
                        <div onClick={() => router.push('/addAd')} className={s.addCircle}>
                            <div>
                                <Image width={20} height={20} src={'/addAd.svg/'} alt='add'/>
                            </div>
                            <p>Подать объявление</p>
                        </div>
                    </div>
                    <div className={s.myAdds}>
                        <div className={s.myAddsTitles}>
                            <div className={s.all} style={{color: `${currentActive === 1 ? "#5855EE" : "#919191"}`}}
                                 onClick={() => setCurrentActive(1)}>
                                Ваши объявления
                            </div>
                            <div className={s.active} style={{color: `${currentActive === 2 ? "#5855EE" : "#919191"}`}}
                                 onClick={() => setCurrentActive(2)}>
                                Активные
                            </div>
                            <div className={s.disable} style={{color: `${currentActive === 3 ? "#5855EE" : "#919191"}`}}
                                 onClick={() => setCurrentActive(3)}>
                                Не активные
                            </div>
                        </div>
                        <MyAdverts isSettingsOpen={isSettingsOpen} currentActive={currentActive} myAdverts={myAdverts}/>
                    </div>

                </div>
                {isSettingsOpen && (
                    <ProfileSettings close={setIsSettingsOpen} cities={cities} regions={regions} userInfo={userInfo}
                                     phone={phone} width={width}/>
                )}
            </div>

        </>
    );
};

export default Items;