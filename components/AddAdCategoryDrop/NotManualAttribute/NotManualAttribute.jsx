import s from './NotManualAttribute.module.scss'
import  Image  from 'next/image';
import { useState,useEffect } from 'react';

export default function NotManualAttribute({setAttribute,attribute,isSaved}) {

    const [currentAttribute,setCurrentAttribute] = useState({
        id : '',
        name : ''
    })

    const [isOpen,setIsOpen] = useState(false)
    
    useEffect(() =>   {
      if(isSaved) {
        setAttribute(prev => [...prev, {
          attribute : attribute.id,
          value : currentAttribute.id
        }])
   
      }
    },[attribute.id, currentAttribute.id, isSaved, setAttribute])
    return(
          <div
          onClick={() => setIsOpen(!isOpen)}
          className={s.container}
        >
          <p className={s.title}>{attribute.name}</p>
          <div className={s.info}>
            <p>{currentAttribute.name}</p>
          </div>
          <Image
            style={{
              transform: isOpen && "rotate(90deg)",
              transition: "all 0.3s",
            }}
            width={12}
            height={12}
            className={s.arrow}
            src={"/CategoryArrow.svg"}
            layout={"raw"}
            alt="arrow"
          />

        {isOpen && (
          <div onClick={(e) => e.stopPropagation()} className={s.ListOfItem}>
            {attribute.values.map((info,idx) => {

              return (
                <div onClick={() => {setCurrentAttribute({id : info.id, name : info.value}) ; setIsOpen(false)}} className={s.item} key={info.id}>
                  <p>
                    {info.value}
                  </p>
                </div>
              )
            })}
          </div>
        )}
        </div>
    )
}