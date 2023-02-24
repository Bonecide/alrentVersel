import s from "../../styles/login.module.scss"
import Image from "next/image";
import logo from "../../public/logo.png"
import {useForm} from "react-hook-form";
import okRu from "../../public/okRu.png"
import yandex from "../../public/yandex.png"
import Link from "next/link";
import axios from 'axios'
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { setAuth, setTokens } from "../../store/slices/AuthSlice";
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const Login = () => {
    const {register, handleSubmit,  formState: {errors}} = useForm();
    const router = useRouter()
    const dispatch = useDispatch()
    const onSubmit = data => {
        axios.post(`${baseUrl}users/jwt_create/`,data).then((res) => {
            dispatch(setTokens({
                access : res.data.access,
                refresh: res.data.refresh
            }))
            dispatch(setAuth())
            cookie.set('isAuth', true);
            cookie.set('refresh', res.data.refresh);
            cookie.set('access', res.data.access);
            router.push('/')
        }).catch((e) => {
            console.log(e)
            swal({
                title: 'Ошибка!',
                text : e.response.data.detail,
                icon : 'error',
                dangerMode : true

            })
        })
    };

    return (
        <section className={s.login}>
            <div className={s.wrap}>
                <div className={s.logo}>
                    <Image src={logo} alt={logo} layout={"raw"}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputWrap}>
                        <input {...register("username", {required: true})} placeholder={"."}/>
                        <span className={s.inputTitle}>Имя</span>
                        {errors.userName && <div>Заполните данное поле</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <input {...register("password" , {required: true})} type='password' placeholder={"."}/>
                        <span className={s.inputTitle}>Пароль</span>
                        {errors.password && <div>Заполните данное поле</div>}
                    </div>
                    <input className={s.submitBtn} type="submit" value={"ВХОД"}/>
                </form>

                <div className={s.socialNetworkReg}>
                    <div className={s.regTitle}>
                        или продолжить через
                    </div>

                    <div className={s.icons}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="36" height="36" rx="9" fill="#1A76FF"/>
                            <path
                                d="M15.9513 21.0628V12H19.4701V17.0194C22.2851 16.6848 24.064 13.5337 24.6016 12H28.2669C27.8271 15.2068 24.9192 17.6701 23.4287 18.4137C25.9211 19.1805 29 22.8754 29 24.9668H25.188C23.7805 21.3974 20.7896 20.3192 19.4701 20.2262V24.9668C11.1864 25.5245 6.78794 18.9714 7.00786 12H10.6732C10.8931 18.5531 14.4119 20.5051 15.9513 21.0628Z"
                                fill="white"/>
                        </svg>
                        <Image src={okRu} alt={"okRu"} layout={"raw"}/>
                        <Image src={yandex} alt={"yandex"} layout={"raw"}/>
                    </div>
                </div>
                
                <Link href={"/registration"} className={s.subTitle}>
                    Регистрация
                </Link>
                
                <div className={s.rules}>
                    При регистрации и входе вы подтверждаете <br/>согласие с условиями использования Allrent.ru <br/> и политикой обработки данных.
                </div>
            </div>
        </section>
    );
};

export default Login;