import React from 'react';
import Layout from "../../components/Layout";
import AddAd from "../../components/AddAd/AddAd";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const Index = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const canAddAd = useSelector(state => state.auth.canAddAd)
    const router = useRouter()


    return (
        <Layout headerType={"notMain"}>
            <AddAd/>
        </Layout>
    );
};

export default Index;