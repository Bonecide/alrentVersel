import s from "../../styles/Header.module.scss"
import Image from "next/image";
import logo from "../../public/logo.png"
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {baseUrl, MainApi} from "../baseApiUrl/baseApiUrl";
import cookie from "js-cookie";
import {setUserInfo} from "../../store/slices/ProfileSlice";
import axios from "axios";

const Header = ({headerType}) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const userCash = useSelector(state => state.profile.userCash)
    const userInfo = useSelector(state => state.profile.userInfo)
    const avatar = useSelector(state => state.profile.userInfo.avatar)
    const userId = useSelector(state => state.profile.userId)
    const canAddAd = useSelector(state => state.auth.canAddAd)

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const addAd = () => {
        if (canAddAd && isAuth) {
            router.push("/addAd")
        } else {
            setIsOpen(!isOpen)
        }
    }

    const token = cookie.get("access")
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${baseUrl}users_me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            dispatch(setUserInfo(res.data))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className={s.header} style={{
            boxShadow: `${headerType === "notMain" && "0px 0px 15px rgba(0, 0, 0, 0.25)"}`,
            marginBottom: `${headerType === "notMain" && "20px"}`
        }}>
            <div className="container">
                <div className={s.wrap}>
                    <div className={s.itemWrap}>
                        <Link href={"/"} className={s.img}>
                            <Image src={logo} alt={"logo"} layout={"raw"}/>
                        </Link>
                        <div className={s.burgerMenu}>
                            <svg width="29" height="19" viewBox="0 0 29 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="29" height="3" fill="#2C52A5"/>
                                <rect y="8" width="29" height="3" fill="#2C52A5"/>
                                <rect y="16" width="29" height="3" fill="#2C52A5"/>
                            </svg>
                        </div>
                        <div className={s.items}>
                            <Link href={"/business"} className={s.item}>
                                Для бизнеса
                            </Link>
                            <Link href={"/faq"} className={s.item}>
                                Помощь
                            </Link>
                        </div>
                    </div>
                    <div className={s.itemWrap}>
                        <div className={s.items}>
                            {!isAuth ?
                                <>
                                    <Link href={"/login"} className={s.item}>
                                        войти
                                    </Link>
                                    <Link href={"/registration"} className={s.item}>
                                        регистрация
                                    </Link>
                                </>
                                : <>
                                    <Link href={"/liked"} className={s.icon}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.8026 2.26846L17.8027 2.26863C18.3396 2.82659 18.7665 3.49014 19.0581 4.22186C19.3497 4.9536 19.5 5.73857 19.5 6.53173C19.5 7.3249 19.3497 8.10986 19.0581 8.84161C18.7665 9.57333 18.3396 10.2369 17.8027 10.7948L17.8026 10.795L10.3563 18.5386L10.3549 18.54C10.3075 18.5897 10.2522 18.6281 10.1927 18.6539C10.1332 18.6796 10.0702 18.6926 10.0071 18.6926C9.94391 18.6926 9.88088 18.6796 9.82144 18.6539C9.76194 18.6281 9.70662 18.5897 9.65923 18.54L9.65781 18.5386L2.21149 10.795L2.21027 10.7937C1.17326 9.72281 0.561852 8.2794 0.50444 6.75306C0.447026 5.22668 0.94818 3.7372 1.90239 2.58437C2.85615 1.4321 4.19044 0.702604 5.63436 0.536328C7.07805 0.37008 8.53102 0.778322 9.70114 1.6834L10.006 1.91923L10.3117 1.68439C11.4225 0.830962 12.7877 0.422472 14.1595 0.529109C15.5313 0.635757 16.8245 1.25106 17.8026 2.26846ZM17.1139 10.0228L17.9294 9.17595H17.6201C18.0471 8.39535 18.2632 7.50391 18.2375 6.59676C18.2022 5.35081 17.7131 4.16178 16.8639 3.27131C16.0141 2.38028 14.8667 1.85464 13.6524 1.80694C12.4381 1.75923 11.2549 2.1934 10.342 3.01608L10.328 3.02874L10.3149 3.04243C10.2675 3.09213 10.2122 3.13047 10.1527 3.15624C10.0932 3.182 10.0302 3.19497 9.96707 3.19497C9.90393 3.19497 9.8409 3.182 9.78146 3.15624C9.72196 3.13047 9.66665 3.09213 9.61924 3.04243L9.61843 3.04157C8.73206 2.11662 7.52466 1.59147 6.26018 1.58825V1.58823L6.25493 1.58827C5.3095 1.59578 4.389 1.89353 3.60894 2.44169C2.82913 2.98968 2.22513 3.76284 1.86979 4.66204C1.51449 5.56111 1.42267 6.54823 1.60512 7.50033C1.78759 8.45251 2.23681 9.33 2.89926 10.0218L2.90024 10.0228L9.64691 17.0284L10.0071 17.4024L10.3672 17.0284L17.1139 10.0228Z"
                                                fill="#9F9F9F" stroke="#2C52A5"/>
                                        </svg>
                                    </Link>

                                    <Link href={"/messages"} className={s.icon}>
                                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 3.28571V15C1 16.1046 1.89543 17 3 17H19C20.1046 17 21 16.1046 21 15V3.28571M1 3.28571V3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V3.28571M1 3.28571L9.86894 9.36728C10.5506 9.83466 11.4494 9.83467 12.1311 9.36728L21 3.28571"
                                                stroke="#2C52A5" strokeWidth="2" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>

                                    <Link href={"/cart"} className={s.icon}>
                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.5 5H19L16 1H4L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V8"
                                                stroke="#2C52A5" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                            <path
                                                d="M9 9C9 10.0609 8.57857 11.0783 7.82843 11.8284C7.07828 12.5786 6.06087 13 5 13C3.93913 13 2.92172 12.5786 2.17157 11.8284C1.42143 11.0783 1 10.0609 1 9"
                                                stroke="#2C52A5" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                        </svg>
                                    </Link>

                                    <div className={s.cash}>
                                        Кошелек: {userCash}
                                    </div>

                                    <Link href={"/me"} className={s.userInfo}>
                                        {avatar ?
                                            <Image src={avatar} alt={"userAvatar"} layout={"raw"} width={"50"} height={50}/>
                                            : <div className={"defaultAvatar"}>
                                                {userInfo.first_name[0]}
                                            </div>
                                        }
                                        <span>{userInfo.first_name}</span>
                                    </Link>
                                </>
                            }
                            <div onClick={addAd} className={s.btn}>
                                подать объявление
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen &&
                <div className={s.cantAddAdModal} onClick={() => {
                    setIsOpen(false)
                }}>
                    <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                        {canAddAd ?
                            <>
                                <p>
                                    Извините, чтоб подавать объявления нужно заполнить профиль
                                </p>
                                <Link href={"/profile/1"}>
                                    Заполнить профиль
                                </Link>
                            </>
                            :
                            <>
                                <p>
                                    Извините, чтоб подавать объявления нужно быть авторизованным на сайте
                                </p>
                                <Link href={"/login"}>
                                    Войти
                                </Link>
                            </>
                        }
                    </div>
                </div>
            }
        </header>
    );
};

export default Header;