import React from 'react';
import Layout from "../../components/Layout";
import Liked from "../../components/Liked/Liked";
import {parse} from "cookie";
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import cookie from 'cookie';

const Index = ({likedAds}) => {
    return (
        <Layout headerType={"notMain"}>
            <Liked likedAds={likedAds}/>
        </Layout>
    );
};

// export async function getServerSideProps(context) {
//     const cookies = parse(context.req.headers.cookie);
//     const token = cookies.access;
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     }
//     const response = await fetch(`${baseUrl}adverts/likes`, config);
//     const array = await response.json();
//
//     return {
//         props: {
//             likedAds: array
//         }
//     }
// }

Index.getInitialProps = async (ctx) => {
    const { req } = ctx;
    const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
    const token = cookies.access;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await fetch(`${baseUrl}adverts/likes`, config);
    const array = await response.json();

    return {likedAds: array}
};


export default Index;