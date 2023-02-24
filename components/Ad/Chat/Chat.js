import s from "../../../styles/adChat.module.scss"
import Image from "next/image";
import profileImg from "../../../public/userAvatar.png"
import Link from "next/link";

const Chat = () => {

    const handleClickSendMessage = (e) => {
        e.preventDefault()

    }

    return (
        <div className={s.chat}>
            <div className={s.profileInfo}>
                <div className={s.wrap}>
                    <div className={s.profileImg}>
                        <Image src={profileImg} alt={"profileImg"} layout={"raw"}/>
                    </div>
                    <div className={s.profileName}>
                        ЭЛЕНа
                    </div>
                </div>
                <div className={s.profileLastVisit}>
                    Сегодня 07:56
                </div>
            </div>

            <div className={s.chatContent}>
                <form onSubmit={handleClickSendMessage}>
                    <input type="text" placeholder={"Сообщение"}/>

                    <input type="file" accept={"image"} hidden={"hidden"} id={"getFile"}/>
                    <label htmlFor="getFile">
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 7.54923V1.45074C1 0.969584 1.39005 0.579529 1.87121 0.579529H7.9697C8.45085 0.579529 8.84091 0.969584 8.84091 1.45074V4.06438M8.84091 7.54923C8.84091 8.03038 8.45085 8.42044 7.9697 8.42044H4.92045H1.87121L6.66288 3.62877L8.84091 5.8068V7.54923Z"
                                stroke="#343A3F" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M3.39578 3.62876C3.75665 3.62876 4.04919 3.33621 4.04919 2.97535C4.04919 2.61448 3.75665 2.32194 3.39578 2.32194C3.03491 2.32194 2.74237 2.61448 2.74237 2.97535C2.74237 3.33621 3.03491 3.62876 3.39578 3.62876Z"
                                stroke="#343A3F" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </label>
                </form>

            </div>
            <div className={s.btnsWrap} onClick={handleClickSendMessage}>
                <div className={s.sendMsgBtn}>
                    отправить
                </div>
                <Link href={"tel::+952375"} className={s.callBtn}>
                    позвонить
                </Link>
                <Link href={"user/1"} className={s.allAdOfUser}>
                    все объявления пользователя
                </Link>
            </div>
        </div>
    );
};

export default Chat;