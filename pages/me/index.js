import React from 'react';
import Layout from "../../components/Layout";
import Me from "../../components/Me/Me";
import {parse} from "cookie";
import {MainApi} from "../../components/baseApiUrl/baseApiUrl";

const Index = () => {
    return (
        <Layout headerType={"notMain"}>
            <Me />
        </Layout>
    );
};



export default Index;