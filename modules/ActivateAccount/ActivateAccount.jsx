
import s from '../../styles/ActivateAccount.module.scss';
import  Image  from 'next/image';
import logo from '../../public/logo.svg'
import { useState } from 'react';
import  axios  from 'axios';
import { baseUrl } from './../../components/baseApiUrl/baseApiUrl';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
export default function ActivateAccount({email,close}) {
    const router = useRouter()
    const [code,setCode] = useState('')
    const activate =  () => {
     axios.post(`${baseUrl}users/activate/`,{code,email}).then((res) => {
        swal({
            title: "Успешно!",
            text: "Вы успешно зарегестрировались,прошу перейдите в раздил Входа",
            icon: "success",
            dangerMode: true,
        }).then(() => {
            router.push('/login')
        })
       
     }).catch((e) => {
        const errors = e.response.data
         const error = errors[Object.keys(errors)[0]][0]
         swal({
             title: 'Ошибка!',
             text : error,
             icon : 'error',
             dangerMode : true

         })
     })
    }
    return(
        <div className={s.Modal} >
        <div className={s.ModalContent} onClick={(e) => e.stopPropagation()}>
                <Image src={logo} alt='logo' layout='raw'/>
                <div className={s.text}>
                    <h3>Вам на почту выслано письмо, в котором есть подтверждающий код.</h3>
                    <p>Пожалуйста введите его в пустое поле</p>
                </div>
                
                <input onChange={(e) => setCode(e.target.value)} value={code} />
                <button onClick={activate}>ОТПРАВИТЬ</button>
        </div>
    </div>
    )
}