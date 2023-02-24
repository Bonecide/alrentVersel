import s from "../../styles/me.module.scss"
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {setAvatar, setUserInfo} from "../../store/slices/ProfileSlice";
import {useRouter} from "next/router";
import Items from "./Items";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {baseUrl} from "../baseApiUrl/baseApiUrl";
import cookie from "js-cookie";

const Me = () => {
    const token = cookie.get("access")

    const userInfo = useSelector(state => state.profile.userInfo)

    const [regions, setRegions] = useState()
    const [cities, setCities] = useState()
    const [avatar, setAvatar] = useState()


    useEffect(() => {
        if ("avatar" in userInfo && userInfo.avatar) {
            setAvatar(userInfo.avatar)
        }
        console.log(userInfo)
    }, [userInfo])

    useEffect(() => {
        axios.get(`${baseUrl}regions/`).then((res) => {
            setRegions(res.data)
        })
        axios.get(`${baseUrl}cities/`).then((res) => {
            setCities(res.data)
        })
    }, [])

    const dispatch = useDispatch()
    const router = useRouter()
    const setNewAvatar = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("avatar", file);
        axios.post(`${baseUrl}users_me/set_avatar/`, {
            avatar: file
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
        })

        let fileReader = new FileReader();
        fileReader.onload = () => {
            setAvatar(fileReader.result)
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    return (
        <section className={s.me}>
            <div>
                <div className={s.wrap}>
                    <div className={s.content}>
                        <div className={s.title}>
                            Профиль
                        </div>

                        <div  className={s.userInfo}>
                            <div className={s.avatar}>
                                <label htmlFor="avatar">
                                    {avatar ?
                                        <Image src={avatar} alt={"userAvatar"} layout={"raw"}
                                               width={"50"} height={"50"}/>
                                        : <div className={"defaultAvatar"}>
                                            {userInfo.first_name[0]}
                                            <div className={s.ChangeAvatar}>
                                                <Image src={'/pen.svg'} alt={'change'} width={6} height={6}/>
                                            </div>
                                        </div>
                                    }
                                </label>
                                <span className={s.title}>{userInfo.first_name}</span>
                            </div>
                            <input type="file" accept={"image/*"} hidden={"hidden"} id={"avatar"}
                                   onChange={setNewAvatar}/>
                        </div>
                        <Items cities={cities} regions={regions} userInfo={userInfo}/>
                    </div>
                </div>
            </div>
           
        </section>
    );
};

export default Me;