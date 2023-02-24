
import Layout from "../components/Layout";
import Main from "../components/Main/Main";
import {baseUrl} from "../components/baseApiUrl/baseApiUrl";
import axios from 'axios'
import cookie, {parse} from "cookie";
function index({Ads}) {
   
    return (
        <Layout headerType={"main"}>
            <Main currentAd={Ads}/>
        </Layout>
    )
}
// export async function getServerSideProps(context) {
//     const cookies = parse(context.req.headers.cookie);
//      const token = cookies.access;
//      const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     }
//     const response = await fetch(`${baseUrl}adverts`, config);
//     const array = await response.json();
//     console.log('12323',{data: array.data})
//
//     return {
//         props: {
//             Ads: array
//         }
//     }
// }

index.getInitialProps = async (ctx) => {
    const {req} = ctx;
    const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
    const token = cookies.access;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await fetch(`${baseUrl}adverts`, config);
    const array = await response.json();

    return {Ads: array}
};
export default index
