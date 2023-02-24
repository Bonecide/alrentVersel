import s from "./AddAdCategoryDrop.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { MainApi } from "../baseApiUrl/baseApiUrl";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotManualAttribute from "./NotManualAttribute/NotManualAttribute";
import ManualAttribute from "./ManualAttribute/ManualAttribute";
export default function AddAdCategoryDrop({
  title,
  categories,
  setFinalData
}) {
  const token = Cookies.get("access");
  const [isSaved,setIsSaved] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [subCategories, setSubCategories] = useState();
  const [attributes, setAttributes] = useState();
  const [ActiveCategory, setActiveCategory] = useState({
    name: "",
    id: undefined,
  });
  const [activeSubCategory, setActiveSubCategory] = useState({
    name: "",
    id: "",
  });
 const [activeAttributes,setActiveAttributes] = useState([])
  useEffect(() => {
    if (ActiveCategory.id) {
     MainApi.getData(token,`subcategories?category=${ActiveCategory.id}`)
        .then((res) => {
          setSubCategories(res.data);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ActiveCategory]);
  useEffect(() => {
    if (activeSubCategory.id) {
      MainApi.getData(token,`subcategories/${activeSubCategory.id}/with_attributes/`)
        .then((res) => {
          setAttributes(res.data);
        });
        
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubCategory]);

 
  
  const closeAll = () => {
    setIsAttributesOpen(false);
    setIsSubCategoryOpen(false);
    setIsCategoryOpen(false);
    setActiveCategory("");
    setActiveSubCategory("");
    setActiveAttributes([])
  };

  useEffect(() => {
    if(isSaved && activeAttributes.length) {

      setFinalData({
        category : ActiveCategory.id,
        subcategory : activeSubCategory.id,
        attributes : activeAttributes
      }) 
     
      setIsAttributesOpen(false);
      setIsSubCategoryOpen(false);
      setIsCategoryOpen(false);
      setActiveCategory("");
      setActiveAttributes([])
      setIsSaved(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSaved,activeAttributes])

  return (
    <div
      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      className={s.container}
    >
      <p className={s.title}>{title}</p>
      <div className={s.info}>
        <p>{activeSubCategory.name}</p>
      </div>
      <Image
        style={{
          transform: isCategoryOpen && "rotate(90deg)",
          transition: "all 0.3s",
        }}
        width={12}
        height={12}
        className={s.arrow}
        src={"/CategoryArrow.svg"}
        layout={"raw"}
        alt="arrow"
      />

      {/* ALL CATEGORIES */}


       <div
       onClick={(e) => e.stopPropagation()}
       style={{
         transform: !isCategoryOpen ? "translateX(-150%)" : "translateX(0)",
         transition: "all, 0.3s",
       }}
       className={s.MobileCategoryContainer}
     >
       <div className={s.modalInfo}>
         <div className={s.titleContainer}>
           <p className={s.title}>Все категории</p>
           <CloseIcon
             className={s.close}
             onClick={() => setIsCategoryOpen(false)}
           />
         </div>
         <div className={s.ItemsContainer}>
           {categories.map((e) => (
             <div
               onClick={() => {
                 setActiveCategory({
                   id: e.id,
                   name: e.name,
                 });
                 setIsSubCategoryOpen(true);
               }}
               key={e.id}
             >
               <p>{e.name}</p>
               <Image
                 width={12}
                 height={12}
                 className={s.arrow}
                 src={"/CategoryArrow.svg"}
                 layout={"raw"}
                 alt="arrow"
               />
             </div>
           ))}
         </div>
       </div>
     </div>

     {/* SUBCATEGORIES */}
     <div
       onClick={(e) => e.stopPropagation()}
       style={{
         transform: !isSubCategoryOpen ? "translateX(-150%)" : "translateX(0)",
         transition: "all, 0.3s",
       }}
       className={s.MobileCategoryContainer}
     >
       <div className={s.modalInfo}>
         <div className={s.titleContainer}>
           <p className={s.title}>Все Подкатегории</p>
           <ArrowBackIosIcon
             className={s.back}
             onClick={() => setIsSubCategoryOpen(false)}
           />
           <CloseIcon className={s.close} onClick={closeAll} />
         </div>
         <div className={s.ItemsContainer}>
           {subCategories ? (
             subCategories.map((e) => (
               <div
                 onClick={() => {
                   setActiveSubCategory({
                     id: e.id,
                     name: e.name,
                   });
                   setIsAttributesOpen(true);
                 }}
                 key={e.id}
               >
                 <p>{e.name}</p>
                 <Image
                   width={12}
                   height={12}
                   className={s.arrow}
                   src={"/CategoryArrow.svg"}
                   layout={"raw"}
                   alt="arrow"
                 />
               </div>
             ))
           ) : (
             <p>Загрузка...</p>
           )}
         </div>
       </div>
     </div>

     {/* ATTRIBUTES */}

     <div
       onClick={(e) => e.stopPropagation()}
       style={{
         transform: !isAttributesOpen ? "translateX(-150%)" : "translateX(0)",
         transition: "all, 0.3s",
       }}
       className={s.Attributes}
     >
       <div className={s.modalInfo}>
         <div className={s.titleContainer}>
           <p className={s.title}>Заполните Информацию!</p>
           <ArrowBackIosIcon
             className={s.back}
             onClick={() => {
               setIsAttributesOpen(false)
               setActiveAttributes([])
             }}
           />
           <CloseIcon className={s.close} onClick={closeAll} />
         </div>
         <div className={s.ItemsContainer}>
           {attributes ? (
             attributes.attributes.map((i, idx) => {

               if (i.is_manual) {
                 return <ManualAttribute isSaved={isSaved} key={i.id} attribute={i} setAttribute={setActiveAttributes} /> ;
               } else {
                
                   return <NotManualAttribute isSaved={isSaved} key={i.id} attribute={i} setAttribute={setActiveAttributes}/>
               }
             })
           ) : (
             <p>Загрузка....</p>
           )}
         </div>
         <button type='button' onClick={() => {
          setIsSaved(true)
          }} className={s.SaveButton}>Сохранить</button>
       </div>
     </div>
     
    </div>
  );
}
