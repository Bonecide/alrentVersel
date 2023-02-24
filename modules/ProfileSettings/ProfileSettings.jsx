import Link from 'next/link';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import s from '../../styles/me.module.scss';
import RegDropDown from "../../components/Registration/dropDown/regDropDown";
import React from "react";
import {useState} from "react";
import axios from "axios";
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import swal from "sweetalert";
import {setUserInfo} from "../../store/slices/ProfileSlice";
import {useRef} from "react";
import cookie from "js-cookie";

export default function ProfileSettings({close, regions, cities, userInfo, phone, width}) {
    const token = cookie.get("access")
    const [city, setCity] = useState()
    const [region, setRegion] = useState()
    const ref = useRef()
    const userPhone = useRef()

    const onLogOut = () => {
        cookie.remove("isAuth")
        cookie.remove("refresh")
        cookie.remove("access")
        cookie.remove("sessionid")
        cookie.remove("csrftoken")
        router.push("/login")
    }

    const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false)

    const router = useRouter()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const confirmCode = () => {
        axios.post(`${baseUrl}users_me/phones/confirm/`, {code: ref.current.value}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            swal("Запрос прошел успешно!", "Выши новые данные были сохранены!", "success");
        })
    }

    const sendMessage = () => {
        axios.post(`${baseUrl}users_me/phones/`, {
            phone: userPhone.current.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            swal("Код успешно отправлен", "", "success")
            setIsPhoneCodeOpen(true)
        }).catch((error) => {
                swal({
                    title: 'Ошибка!',
                    text: error.response.data.detail,
                    icon: 'error',
                    dangerMode: true
                })
            }
        )
    }

    const postData = (endpoint, data) => {
        axios.post(`${baseUrl}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            swal("Запрос прошел успешно!", "Выши новые данные были сохранены!", "success");
        }).catch(error => {
            swal({
                title: 'Ошибка!',
                text: error.response.data.detail,
                icon: 'error',
                dangerMode: true
            })
        })
    }

    const onSubmit = data => {
        if (data.current_password !== "") {
            postData("users_me/set_password/", {
                new_password: data.new_password,
                re_new_password: data.re_new_password,
                current_password: data.current_password,
            })
        }
        if (data.first_name !== "" || data.last_name !== "") {
            axios.put(`${baseUrl}users_me/`, {
                first_name: data.first_name,
                last_name: data.last_name,
                middle_name: data.middle_name,
                city: city?.id, region: region?.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
                dispatch(setUserInfo(res.data))
                swal("Запрос прошел успешно!", "Выши новые данные были сохранены!", "success");
            }).catch(error => {
                swal({
                    title: 'Ошибка!',
                    text: error.response.data.detail,
                    icon: 'error',
                    dangerMode: true
                })
            })
        }
        if (data.username !== "") {
            postData("users_me/set_username/", {
                username: data.username
            })
        }
    };

    return (
        <div onClick={() => close(false)} className={width < 768 ? s.Modal : ""}>
            <div className={s.ModalContent} onClick={(e) => e.stopPropagation()}>
                <div className={s.itemContent}>
                    <form onSubmit={handleSubmit(onSubmit)} className={s.itemContentWrap}>
                        <div className={s.inputWrap}>
                            <RegDropDown arr={regions} mainTitle={"Страна"} setInfo={setRegion} current={userInfo?.region}/>
                        </div>

                        <div className={s.inputWrap}>
                            <RegDropDown arr={cities} mainTitle={"Город"} setInfo={setCity} current={userInfo?.city}/>
                        </div>

                        <div className={s.inputWrap}>
                            <span>Изменить имя</span>
                            <input {...register("first_name")} defaultValue={userInfo?.first_name}/>
                        </div>

                        <div className={s.inputWrap}>
                            <span>Изменить фамилию</span>
                            <input {...register("last_name")} defaultValue={userInfo?.last_name}/>
                        </div>

                        <div className={s.inputWrap}>
                            <span>Изменить отчество</span>
                            <input {...register("middle_name")} defaultValue={userInfo?.middle_name}/>
                        </div>

                        <br/>
                        <div className={s.inputWrap}>
                            <span>Изменить логин</span>
                            <input {...register("username")} defaultValue={userInfo?.username}/>
                        </div>

                        <br/>
                        <div className={s.inputWrap}>
                            <span>Введите старый пароль</span>
                            <input {...register("current_password")} />
                        </div>

                        <div className={s.inputWrap}>
                            <span>Введите новый пароль</span>
                            <input {...register("new_password")} />
                        </div>

                        <div className={s.inputWrap}>
                            <span>Подтвердите новый пароль</span>
                            <input {...register("re_new_password")} />
                        </div>

                        <br/>
                        <div className={s.inputWrap}>
                            <span>Изменить телефон</span>
                            <input ref={userPhone} defaultValue={phone}/>
                            <br/>
                            {!isPhoneCodeOpen && <div className={s.btn} style={{width: "200px"}} onClick={sendMessage}>
                                Отправить код
                            </div>}
                        </div>
                        {isPhoneCodeOpen &&
                            <div className={s.inputWrap}>
                                <span>Введите код с СМС</span>
                                <input type={"number"} ref={ref}/>
                                <br/>
                                <div className={s.btn} onClick={confirmCode}>
                                    Сохранить
                                </div>
                            </div>
                        }

                        <br/>
                        <div className={s.inputWrap}>
                            <Link href={"#"}>
                                Управление уведомлениями
                                <span>
                                <svg width="8" height="12" viewBox="0 0 8 12"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 6L1 11" stroke="#999999"
                                          strokeLinecap="round"/>
                                </svg>
                            </span>
                            </Link>
                        </div>

                        <div className={s.inputWrap}>
                            <Link href={"#"}>
                                Помощь
                                <span>
                                <svg width="8" height="12" viewBox="0 0 8 12"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 6L1 11" stroke="#999999"
                                          strokeLinecap="round"/>
                                </svg>
                            </span>
                            </Link>
                        </div>

                        <div className={s.inputWrap}>
                            <Link href={"#"}>
                                Пользовательское соглашение
                                <span>
                                <svg width="8" height="12" viewBox="0 0 8 12"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 6L1 11" stroke="#999999"
                                          strokeLinecap="round"/>
                                </svg>
                            </span>
                            </Link>
                        </div>

                        <div className={s.inputWrap}>
                            <Link href={"#"}>
                                Акции
                                <span>
                                <svg width="8" height="12" viewBox="0 0 8 12"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 6L1 11" stroke="#999999"
                                          strokeLinecap="round"/>
                                </svg>
                            </span>
                            </Link>
                        </div>
                        <br/>
                        <div className={s.inputWrap}>
                            <button className={s.btn}>
                                Сохранить
                            </button>
                        </div>

                        <div className={s.inputWrap} onClick={onLogOut}>
                            <div className={s.dFlex}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M13 0C12.4477 0 12 0.447715 12 1C12 1.55228 12.4477 2 13 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H13C12.4477 18 12 18.4477 12 19C12 19.5523 12.4477 20 13 20H17C17.7957 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.31607 17.7957 0 17 0H13ZM7.29289 4.29289C7.68342 3.90237 8.31658 3.90237 8.70711 4.29289L10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711C10.3166 8.09763 9.68342 8.09763 9.29289 7.70711L7.29289 5.70711C6.90237 5.31658 6.90237 4.68342 7.29289 4.29289ZM13.7136 9.29945C13.8063 9.3938 13.8764 9.50195 13.9241 9.61722C13.9727 9.73425 13.9996 9.8625 14 9.997L14 10L14 10.003C13.9992 10.2746 13.8901 10.5208 13.7136 10.7005L13.7064 10.7078L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071C6.90237 15.3166 6.90237 14.6834 7.29289 14.2929L10.5858 11H1C0.447715 11 0 10.5523 0 10C0 9.44771 0.447715 9 1 9H12.9993H13L13.003 9C13.2746 9.0008 13.5208 9.1099 13.7005 9.2864L13.7136 9.29945Z"
                                          fill="#5855EE"/>
                                </svg>
                                <span>
                                Выход
                            </span>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}