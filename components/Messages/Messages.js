import s from "../../styles/messages.module.scss"
import {useState,useEffect} from "react";
import Image from "next/image";
import avatar from "../../public/userAvatar.png"
import mainImg from "../../public/productImg1.png"
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import axios from "axios";
const Messages = () => {

    const [currentType, setCurrentType] = useState(1)
    const [currentDialog, setCurrentDialog] = useState()
    const [matches,setMaches] = useState(  )

    const [messages,setMessages] = useState([])
    const token = Cookies.get('access')
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    useEffect(() => {
        setMaches(window.matchMedia("(max-width: 768px)").matches)
    },[])
    useEffect(() => {
        axios.get(`${baseUrl}chats/`, config)
        .then((res) => {
            console.log(res.data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <section className={s.Messages}>
            <div className="container">
                <div className={s.wrap}>
                    <div className={s.container}>
                        {!matches && !currentDialog || matches && !currentDialog || !matches && currentDialog ? (
                            <div>
                                <div className={s.title}>
                            Сообщения
                        </div>
                        <div className={s.types}>
                            <div className={s.type} style={{color: `${currentType === 1 ? "#5855EE" : "#909090"}`}}
                                 onClick={() => setCurrentType(1)}>
                                Чаты
                            </div>
                            <div className={s.type} style={{color: `${currentType === 2 ? "#5855EE" : "#909090"}`}}
                                 onClick={() => setCurrentType(2)}>
                                Уведомления
                            </div>
                        </div>
                            </div>    
                        ) :  null}
                        <div className={s.dFlex}>
                            {!matches || !currentDialog ? (
                                <div className={s.items}>
                                <div className={s.item} onClick={() => setCurrentDialog(1)}>
                                    <div className={s.itemUserImg}>
                                        <Image src={avatar} alt={"avatar"} layout={"raw"}/>
                                    </div>
                                    <div className={s.mainInfo}>
                                        <div className={s.itemTitle}>
                                            Фотоаппарат Sony Alpha dslr-a200 kit
                                        </div>
                                        <div className={s.itemSubTitle}>
                                            Могу арендовать?
                                        </div>
                                        <div className={s.itemSubTitle}>
                                            01.01.0000
                                        </div>
                                    </div>
                                    <div className={s.itemImg}>
                                        <Image src={mainImg} alt={"mainImg"} layout={"raw"}/>
                                    </div>
                                </div>

                                <div className={s.item} onClick={() => setCurrentDialog(1)}>
                                    <div className={s.itemUserImg}>
                                        <Image src={avatar} alt={"avatar"} layout={"raw"}/>
                                    </div>
                                    <div className={s.mainInfo}>
                                        <div className={s.itemTitle}>
                                            Фотоаппарат Sony Alpha dslr-a200 kit
                                        </div>
                                        <div className={s.itemSubTitle}>
                                            Могу арендовать?
                                        </div>
                                        <div className={s.itemSubTitle}>
                                            01.01.0000
                                        </div>
                                    </div>
                                    <div className={s.itemImg}>
                                        <Image src={mainImg} alt={"mainImg"} layout={"raw"}/>
                                    </div>
                                </div>
                            </div>
                            ) : null}
                           {currentDialog === 1 && (
                             <div className={s.dialogWrap}>
                                <CloseIcon onClick = {() => setCurrentDialog(false)} className = {s.close}/>
                             <div className={s.dialogContainer}>
                                 <div className={s.dialogUserInfo}>
                                     <div className={s.dialogUserImg}>
                                         <Image src={avatar} alt={"avatar"} layout={"raw"}/>
                                     </div>
                                     <div className={s.dialogUserMainInfo}>
                                         <div className={s.title}>
                                             ЕЛЕНа
                                         </div>
                                         <div className={s.itemSubTitle}>
                                             Был(а) в сети 0 ч. назад
                                         </div>
                                     </div>
                                     <div className={s.callIcon}>
                                         <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                 d="M6.97812 8.9101L8.24812 7.6401C8.51698 7.36821 8.70227 7.02494 8.78202 6.65098C8.86178 6.27701 8.83266 5.88802 8.69812 5.5301C8.35957 4.62282 8.12474 3.68016 7.99812 2.7201C7.93019 2.23954 7.68985 1.80008 7.32188 1.48363C6.95391 1.16718 6.48342 0.995321 5.99812 1.0001H2.99812C2.72046 1.00036 2.44589 1.05843 2.19191 1.17062C1.93792 1.28281 1.71008 1.44665 1.52288 1.65172C1.33569 1.85679 1.19324 2.09859 1.10462 2.36172C1.01599 2.62486 0.983127 2.90356 1.00812 3.1801C1.33636 6.27109 2.38809 9.2413 4.07812 11.8501C5.61345 14.2663 7.66194 16.3148 10.0781 17.8501C12.6751 19.5342 15.631 20.5857 18.7081 20.9201C18.9855 20.9452 19.265 20.912 19.5289 20.8228C19.7927 20.7336 20.035 20.5902 20.2402 20.402C20.4454 20.2137 20.6091 19.9846 20.7206 19.7294C20.8322 19.4743 20.8892 19.1986 20.8881 18.9201V15.9201C20.9003 15.4297 20.7318 14.9519 20.4146 14.5776C20.0975 14.2033 19.6539 13.9586 19.1681 13.8901C18.2081 13.7635 17.2654 13.5286 16.3581 13.1901C16.0002 13.0556 15.6112 13.0264 15.2372 13.1062C14.8633 13.1859 14.52 13.3712 14.2481 13.6401L12.9781 14.9101"
                                                 stroke="#05FF00" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round"/>
                                         </svg>
                                     </div>
                                 </div>
                                 <div className={s.dialogItemInfo}>
                                     <Image src={mainImg} alt={"mainImg"} layout={"raw"}/>
                                     <div className={s.dialogItemTitle}>
                                         Фотоаппарат Sony Alpha dslr-a200 kit
                                     </div>
                                 </div>

                                 <div className={s.dialogContent}>
                                     <div className={s.myMessage}>
                                         Товарищи! постоянный количественный рост и сфера нашей активности требуют
                                         определения и уточнения новых предложений.
                                     </div>
                                     <div className={s.message}>
                                         Товарищи! постоянный количественный рост и сфера нашей активности требуют
                                         определения и уточнения новых предложений.
                                     </div>
                                 </div>

                                 <div className={s.dialogInputs}>
                                     <input type="text" placeholder={"Сообщение"}/>
                                     <div className={s.submitBtn}>
                                         <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                 d="M8.70711 0.292893C8.31658 -0.0976314 7.68342 -0.0976315 7.29289 0.292893L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 15L9 1L7 1L7 15L9 15Z"
                                                 fill="white"/>
                                         </svg>
                                     </div>
                                 </div>
                             </div>
                         </div>
                           )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Messages;