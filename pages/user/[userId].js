import React from 'react';
import Layout from "../../components/Layout";
import UserId from "../../components/UserId/UserId";
import cookie, {parse} from "cookie";
import Cookies from "js-cookie";
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import AdId from "../ad/[adId]";
import {store} from "../../store/store";
import {useSelector} from "react-redux";
// let accessToken;
//
//
// function setAccessToken(token) {
//     accessToken = token;
// }
//
// export async function getStaticPaths() {
//     // Создаем объект заголовка с токеном
//
//
//     const config = {
//         headers: {Authorization: `Bearer ${accessToken}`}
//     };
//     console.log("token", accessToken)
//     // Получаем список всех пользователей с сервера, отправляя токен в заголовке
//     const usersResponse = await fetch(`${baseUrl}users`, config);
//     const usersData = await usersResponse.json();
//
//     const paths = usersData.map((user) => ({
//         params: {userId: user.id},
//     }));
//
//     return {paths, fallback: false};
// }

const index = ({user, userAdverts}) => {


    if (!user || !userAdverts) {
        return <div>Loading</div>
    }

    return (
        <Layout headerType={"notMain"}>
            <UserId user={user} userAdverts={userAdverts}/>
        </Layout>
    );
};

// export async function getServerSideProps(context) {
//     const cookies = parse(context.req.headers.cookie);
//     const token = cookies.access;
//     const {userId} = context.params;
//     const config = {
//         headers: {Authorization: `Bearer ${token}`}
//     }
//     const response = await fetch(`${baseUrl}users/${userId}`, config);
//
//     const [userData, userAdvertsData] = await Promise.all([
//         fetch(`${baseUrl}users/${userId}`, config),
//         fetch(`${baseUrl}adverts?user=${userId}`, config),
//     ]);
//     const array = await userData.json();
//     const array2 = await userAdvertsData.json();
//
//     return {
//         props: {
//             user: array,
//             userAdverts: array2
//         }
//     }
//
// }





index.getInitialProps = async ({req, query}) => {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
    const token = cookies.access;

    setAccessToken(token)

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const {userId} = query
    const [userData, userAdvertsData] = await Promise.all([
        fetch(`${baseUrl}users/${userId}`, config),
        fetch(`${baseUrl}adverts?user=${userId}`, config),
    ]);
    const array = await userData.json();
    const array2 = await userAdvertsData.json();

    return {
        user: array,
        userAdverts: array2
    }
};


export default index;