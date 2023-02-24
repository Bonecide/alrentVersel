import '../styles/globals.css'
import {Provider} from "react-redux";
import {store} from "../store/store"
import NextNProgress from 'nextjs-progressbar'
import {useEffect} from "react";
import cookie from 'js-cookie';
import {useRouter} from "next/router";
import axios from "axios";
import {setAuth, setTokens} from "../store/slices/AuthSlice";
import {baseUrl, MainApi} from "../components/baseApiUrl/baseApiUrl";
import {parse} from "cookie";
import {setUserInfo} from "../store/slices/ProfileSlice";


function MyApp({Component, pageProps}) {
    const router = useRouter()
    useEffect(() => {
        const isAuth = cookie.get("isAuth")
        const token = cookie.get("access")
        const refresh = cookie.get("refresh")
        if (isAuth) {
            axios.post(`${baseUrl}users/jwt_refresh/`, {refresh}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
                cookie.set('access', res.data.access);
                cookie.set('refresh', res.data.refresh);
            })
            store.dispatch(setAuth(true));
            store.dispatch(setTokens({access: token, refresh}))
        }
        else {
            router.push('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Provider store={store}>
            <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            />
            <Component {...pageProps} />
        </Provider>
    </>
}


export default MyApp
