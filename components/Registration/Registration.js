import React, {useRef, useState,useEffect} from 'react';
import {useForm} from "react-hook-form";
import s from "../../styles/registration.module.scss";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import RegDropDown from "./dropDown/regDropDown";
import axios from "axios";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import swal from 'sweetalert';
import ActivateAccount from '../../modules/ActivateAccount/ActivateAccount';
const Registration = () => {
    const [region, setCountry] = useState()
    const [city, setCity] = useState()
    const [regions,setRegions] = useState([])
    const [cities,setCities] = useState([])
    const [isActivate,setIsActivate] = useState(false)
    const [email,setEmail] = useState()
    const route = useRouter()
    useEffect(() => {
    axios.get(`${baseUrl}regions/`).then((res) => {
        setRegions(res.data)
    })
    axios.get(`${baseUrl}cities/`).then((res) => {
        setCities(res.data)
    })
    },[])
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
       if (!region || !city) {
        swal({
            title: 'Ошибка!',
            text : 'Пожалуйста,заполните информацию о Вашем Регионе и Городе',
            icon : 'error',
            dangerMode : true

        })
        return
       } 
        axios.post(`${baseUrl}users/`, {
            username: data.userName,
            email: data.email,
            password: data.password,
            first_name: data.name,
            last_name: data.last_name,
            phone: data.phone,
            region : region.id,
            city : city.id,
            re_password: data.confirmPassword,
        }).then((res) => {
           setIsActivate(true)
           setEmail(data.email)
        })
        .catch((e) => {
           const errors = e.response.data
            const error = errors[Object.keys(errors)[0]][0]
            swal({
                title: 'Ошибка!',
                text : error,
                icon : 'error',
                dangerMode : true

            })
        })
    };

   
    
    const confirmPs = useRef(null)
    const Ps = useRef(null)

    const showPassword = (ref) => {
        console.log(ref)
        let inputType = ref.current.attributes.type.value
        if (inputType === "text") {
            ref.current.attributes.type.value = "password"
        } else {
            ref.current.attributes.type.value = "text"
        }
    }


    return (
        <section className={s.registration}>
            {isActivate && <ActivateAccount email={email}/>}
            <div className={s.wrap}>
                <div className={s.logo}>
                    <Image src={logo} alt={logo} layout={"raw"}/>
                </div>
                <div className={s.title}>
                    Регистрация
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.dPWrap}>
                        <RegDropDown arr={regions} mainTitle={"Страна"} setInfo={setCountry}/>
                    </div>
                    <div className={s.dPWrap}>
                        <RegDropDown arr={cities} mainTitle={"Город"} setInfo={setCity}/>
                    </div>

                    <div className={s.inputWrap}>
                        <input {...register("userName", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Логин</span>
                        {errors.userName && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input {...register("name", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Имя</span>
                        {errors.name && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input {...register("last_name", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Фамилия</span>
                        {errors.last_name && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input {...register("email", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Email</span>
                        {errors.userName && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input {...register("phone", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Номер телефона</span>
                        {errors.phone && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input  {...register("password", {required: true})} placeholder={"."}
                               type={"password"} />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => showPassword(Ps)}>
                            <path
                                d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path>
                        </svg> */}
                        <span className={s.inputTitle}>Пароль</span>
                        {errors.password && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input  {...register("confirmPassword", {required: true})} placeholder={"."}
                               type={"password"} />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => showPassword(confirmPs)}>
                            <path
                                d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path>
                        </svg> */}
                        <span className={s.inputTitle}>Повторите пароль</span>
                        {errors.confirmPassword && <div>Заполните данное поле</div>}
                    </div>
                    <input className={s.submitBtn} type="submit" value={"ЗАРЕГИСТРИРОВАТЬСЯ"}/>
                </form>

                <div className={s.rules}>
                    У вас уже есть учётная запись?
                    <Link href={"/login"} className={s.subTitle}>
                        Войти
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Registration;