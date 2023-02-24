import React from 'react';
import s from "../../styles/ad.module.scss";
import Filter from "../../modules/Filter/Filter";
import MainInfo from "./MainInfo";
import ProductsCarousel from "../../modules/productsCarousel/productsCarousel";
import productImg1 from "../../public/productImg1.png";
import userAvatar from "../../public/userAvatar.png";
import Link from "next/link";
import MobileAd from './MobileAd/MobileAd';

const Ad = ({Ad,items}) => {



    return (
        <section className={s.ad}>
            <div className="container">
                <Filter page={"notMain"}/>
                <MainInfo  ad ={Ad}/>
                <MobileAd ad ={Ad}/>
                <div className={s.mainCarousel}>
                    <div className={s.title}>
                        <h1>похожие объявления</h1>
                        <Link href={"/category/1"}>Еще...</Link>
                    </div>
                    <ProductsCarousel items={items} type={"default"}/>
                </div>
            </div>
        </section>
    );
};

export default Ad;