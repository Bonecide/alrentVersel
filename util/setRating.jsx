import axios from "axios"
import { baseUrl } from "../components/baseApiUrl/baseApiUrl"
import swal from 'sweetalert'

export const setRating = (id,rate,token) => {
    
    axios.post(`${baseUrl}adverts/${id}/rate/`, {
        rate
    }, {headers: {
        Authorization: `Bearer ${token}`
    }}).then((res) => {
        swal({
            title: 'Успех!',
            text : `Вы успешно поставили оценку ${rate} данному товару!`,
            icon : 'success',
            dangerMode : true

        })
    })
    .catch((e) => {
        swal({
            title: 'Ошибка!',
            text : `Что-то пошло не так,попробуйте позже!`,
            icon : 'error',
            dangerMode : true

        })
    })
}