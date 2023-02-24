import { useRouter } from "next/router";
import Filter from "../../modules/Filter/Filter";
import { useState, useEffect } from "react";
import ProductsCarousel from "../../modules/productsCarousel/productsCarousel";
import { MainApi } from "../baseApiUrl/baseApiUrl";
import Cookies from "js-cookie";
import s from './SearchComponent.module.scss'
export default function SearchComponent() {
  const [searchedAd, setSearchedAd] = useState([]);
  const router = useRouter();
  const params = router.query;
  const token = Cookies.get("access");
  useEffect(() => {
    MainApi.getData(
      token,
      `adverts/search/${params.text ? `?query=${params.text}` : ""}${
        params.category ? `${!params.text? '?' : '&'}category=${params.category}` : ""
      }${params.subcategory ? `${!params.text && !params.category? '?' : '&'}subcategory=${params.subcategory}` : ""}`
    ).then((res) => {
        setSearchedAd(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
console.log(params)
  return (
    <div className={s.container}>
      <Filter
        setSearchedAd={setSearchedAd}
        isSearch
        data={{
          text: params.text ? params.text : "",
          subcategory: params?.subcategory,
        }}
      />
      {searchedAd.length ? <ProductsCarousel items={searchedAd} /> : undefined}
    </div>
  );
}
