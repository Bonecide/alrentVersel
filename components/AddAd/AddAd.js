import React, {useEffect, useState} from 'react';
import s from "../../styles/addAd.module.scss"
import RegDropDown from "../Registration/dropDown/regDropDown";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import { baseUrl, MainApi} from "../baseApiUrl/baseApiUrl";
import AddAdCategoryDrop from '../AddAdCategoryDrop/AddAdCategoryDrop';
import swal from 'sweetalert';
import axios from 'axios'
import { useRouter } from 'next/router'
const AddAd = () => {
    const [finalDataFromCategory,setFinalDataFromCategory] = useState()
    const [mainImageIndex,setMainImageIndex] = useState(0)
    const [categories,setCategories] = useState([])
    const [img, setImg] = useState([])
    const [id, setId] = useState(0)
    const [curDev,setCurDev] = useState()
    const [curDate,setCurDate] = useState()
    const [curCurrency,setCurCurrency]= useState()
    const token = Cookies.get('access')
    const [countries,setCountries] = useState([])
    const [cities,setCities] = useState([])
    const [city,setCity] = useState('')
    const [country,setCountry] = useState({
        id : '',
        index : null,
        title : ''
    })
    useEffect(() => {
    if(img.length > 5) {
        setImg(img => img.filter((img,idx) => idx !=0 ))
    }
    },[img])
    const router = useRouter()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const delivery = [{
        id : 'PICKUP',
        name : 'Самовывоз'
    },
    {
        id : 'DELIVERY',
        name : 'Доставка'
    }
]

const periods = [{
    id : 'HOUR',
    name : 'Часовая оплата'
},
{
    id : 'DAY',
    name : 'Дневная оплата'
},
{
    id : 'WEEK',
    name : 'Оплата за неделю'
},
{
    id : 'MONTH',
    name : 'Месячная оплата'
},
{
    id : 'YEAR',
    name : 'Годовая оплата'
},
]
const currency = [{
    id : Math.random(),
    name : 'RUB'
},
{
    id : Math.random(),
    name : 'USD'
},
]
    const addImg = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        setId(id + 1)
        fileReader.onload = () => {
            setImg([...img, {img: fileReader.result, id: id,file : e.target.files[0]}])
        }
        fileReader.readAsDataURL(e.target.files[0]);

    }

    const removeImg = (id) => {
        setImg(img => img.filter(e => e.id !== id))
    }
    
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
             if (!finalDataFromCategory) {
                swal({
                    title: 'Ошибка!',
                    text : 'Пожалуйста,заполните информацию о Категории вашего товара!',
                    icon : 'error',
                    dangerMode : true
        
                })

                return
             }
             else if (!city || !country.id) {
                swal({
                    title: 'Ошибка!',
                    text : 'Пожалуйста,заполните информацию о Вашем Регионе и Городе',
                    icon : 'error',
                    dangerMode : true
        
                })
                return
             }
             else if (!curDev) {
                swal({
                    title: 'Ошибка!',
                    text : 'Пожалуйста,заполните информацию о способе доставки',
                    icon : 'error',
                    dangerMode : true
        
                })
                return
             }
             else if (!curDate) {
                swal({
                    title: 'Ошибка!',
                    text : 'Пожалуйста,заполните информацию о сроке оплаты',
                    icon : 'error',
                    dangerMode : true
        
                })
                return
             }
             else if (!curCurrency) {
                swal({
                    title: 'Ошибка!',
                    text : 'Пожалуйста,заполните информацию о валюте',
                    icon : 'error',
                    dangerMode : true
        
                })
                return
             }
             else if(!img[0]) {
                swal({
                    title: 'Ошибка!',
                    text : 'Добавьте как миниму 1 фото',
                    icon : 'error',
                    dangerMode : true
        
                })
                return
             }
             axios.post(`${baseUrl}my_adverts/`,{
                ...data,
                ...finalDataFromCategory,
                region : country.id,
                city : city.id,
                delivery:curDev.id,
                period : curDate.id,
                currency: curCurrency.title
            }, config).then((res) => {
              const id = res.data.id
                 const data = new FormData()
                data.append('file', img[0].file);
                data.append('advert', id);
                data.append('is_main',true);
                 axios.post(`${baseUrl}advert_images/`,data, config)
                .then((res) => {
                    swal({
                        title: 'Успех!',
                        text : 'Ваше объявление отправлено на модерацию',
                        icon : 'success',
                        dangerMode : true
            
                    }).then(() => {
                        router.push('/')
                    } )     
                }).catch((e) => {
                    console.log(e)
                })
            }).catch((e) => {
                console.log(e)
                
              
            }) 
    };
    useEffect(() => {
        MainApi.getData(token,`categories/`).then((res) => {
            setCategories(res.data)
        })
        MainApi.getData(token,`regions/with_cities`).then((res) => {
            setCountries(res.data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
   useEffect(() => {

    if(country.title) {
        setCities(countries[country.index].cities)
    }   
   },[countries, country])
    return (
        <section className={s.addAd}>
            <div className="container">
                <div className={s.wrap}>
                    <div className={s.content}>
                        <div className={s.title}>
                            Добавить объявление
                        </div>

                        <div className={s.images}>
                            <div style={{'backgroundImage' : img.length > 0 ? `url(${img[mainImageIndex].img})` : undefined, 'backgroundSize': 'cover', 'backgroundPosition' : '50%','minWidth' : img.length <=1 ? '100%':'168px'}} className={s.imgInput}>
                                <label htmlFor="img">
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M2 3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44771 18 3V9C18 9.55229 18.4477 10 19 10C19.5523 10 20 9.55229 20 9V3C20 1.34315 18.6569 0 17 0H3C1.34315 0 0 1.34315 0 3V17C0 17.5523 0.447715 18 1 18C1.55228 18 2 17.5523 2 17V3ZM14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L2.29289 18.2929C2.0069 18.5789 1.92134 19.009 2.07612 19.3827C2.2309 19.7564 2.59554 20 3 20H10H17C18.6569 20 20 18.6569 20 17V13C20 12.7348 19.8946 12.4804 19.7071 12.2929L14.7071 7.29289ZM10 18H5.41421L14 9.41421L18 13.4142V17C18 17.5523 17.5523 18 17 18H10ZM6 6.5C6 6.22386 6.22386 6 6.5 6C6.77614 6 7 6.22386 7 6.5C7 6.77614 6.77614 7 6.5 7C6.22386 7 6 6.77614 6 6.5ZM6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4Z"
                                                fill="white"/>
                                        </svg>
                                    </span>
                                    <div>
                                        Добавить
                                        фото
                                    </div>
                                </label>
                                <input type="file" accept={"image/*"} hidden={"hidden"} id={"img"}
                                    onChange={addImg}/>
                               {img.length > 0 ? (
                                    <div className = {s.imageFilter}></div>
                                ) : undefined}
                            </div>
                            <div className={s.sideImage}>
                                {img.map((info,idx) => {
                                    if (idx != mainImageIndex) {

                                        return (
                                            <div onClick={() => setMainImageIndex(idx)} key={`imageN${idx}`} style={{'backgroundImage' : `url(${info.img})` , 'backgroundSize': 'cover', 'backgroundPosition' : '50%'}}/>
                                        )
                                    }
                                })}
                            </div>    
                        </div>

                       

                        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={s.inputWrap}>
                                <div className={s.title}>
                                    Заголовок
                                </div>
                                <input type="text" {...register("title", {required: true})}/>
                            </div>

                            <div className={s.inputWrap}>
                                <div className={s.title}>
                                    Описание
                                </div>
                                <input type="text" {...register("desc", {required: true})}/>
                            </div>

                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <AddAdCategoryDrop setFinalData={setFinalDataFromCategory} title={'Категория'} categories={categories}/>
                            </div>

                            <div className={`${s.inputWrap} ${s.width70}`}>
                                <div className={s.title}>
                                    Цена
                                </div>
                                <input type="text" {...register("price", {required: true})}/>
                            </div>
                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <RegDropDown mainTitle={"Валюта"} arr={currency} setInfo={setCurCurrency} type={"withPadding"}/>

                            </div>
                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <RegDropDown mainTitle={"Срок"} arr={periods} setInfo={setCurDate} type={"withPadding"}/>

                            </div>

                            <div className={`${s.inputWrap} ${s.width70}`} >
                                <div className={s.title}>
                                    Залог
                                </div>
                                <input type="text" {...register("deposit", {required: true})}/>
                            </div>
                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <RegDropDown isCountry = {true} mainTitle={"Страна"} arr={countries} setInfo={setCountry} type={"withPadding"}/>
                            </div>
                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <RegDropDown mainTitle={"Город"} arr={cities} setInfo={setCity} type={"withPadding"}/>
                            </div>
                            <div className={`${s.inputWrap} ${s.width70}`}>
                                <div className={s.title}>
                                    Адрес
                                </div>
                                <input type="text" {...register("address", {required: true})}/>
                            </div>
                            <div className={`${s.dPwrap} ${s.width70}`}>
                                <RegDropDown mainTitle={"Доставка"} arr={delivery} setInfo={setCurDev} type={"withPadding"}/>
                            </div>


                            <button type="submit" className={s.submit}>Создать</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddAd;