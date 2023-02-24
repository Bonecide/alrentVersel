import Layout from "../../components/Layout";
import Ad from "../../components/Ad/Ad";
import cookie, {parse} from "cookie";
import {baseUrl} from "../../components/baseApiUrl/baseApiUrl";
import React from "react";
const AdId = ({ad,allAds}) => {

    if (!ad || !allAds) {
        return <div>Loading</div>
    }

    return (
        <Layout headerType={"notMain"}>
            <Ad items={allAds} Ad={ad}/>
        </Layout>
    );
};


// export async function getServerSideProps(context) {
//     const cookies = parse(context.req.headers.cookie);
//      const token = cookies.access;
//      const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     }
//
//     const id = context.params?.adId
//     const response = await fetch(`${baseUrl}adverts`, config);
//     const array = await response.json();
//     const res = await fetch(`${baseUrl}adverts/${id}`, config);
//     const advert = await res.json();
//
//     return {
//         props: {
//             ad: advert,
//             allAds : array
//         }
//     }
// }

AdId.getInitialProps = async (ctx) => {
    const { req } = ctx;
    const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
    const token = cookies.access;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const id = ctx.query.adId
    const response = await fetch(`${baseUrl}adverts`, config);
    const array = await response.json();
    const res = await fetch(`${baseUrl}adverts/${id}`, config);
    const advert = await res.json();

    return {ad: advert, allAds : array}
};


export default AdId;