import React, {useEffect} from 'react';
import {useState} from "react";
import s from "../../../styles/registration.module.scss"

const RegDropDown = ({arr, mainTitle, setInfo, current}) => {

    const [isDropDownOpen, setIsDropDownOpen] = useState()
    const [dropDownContent, setDropDownContent] = useState(current?.name)

    // useEffect(() => {
    //     setDropDownContent(current ? current.name : "")
    // }, [])
   
    const dropDownSetContent = (info) => {
        setDropDownContent(info.title)
        setIsDropDownOpen(false)
       if (setInfo) {
        setInfo(info)
       }
    }   


    return (
        <div>
            <div className={s.filterMenuItem}>
                <div className={s.dropDown}>
                    <div className={s.dropDownMenu}>
                        <div className={s.title}>
                            {mainTitle}
                        </div>
                        <div className={s.select} onClick={() => {setIsDropDownOpen(!isDropDownOpen)}}>
                            {!dropDownContent ? <span>Выберите категорию</span> : <div><p className={s.currentName}>{dropDownContent}</p></div>}
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1.03139L6 7.06052L1 1.03139" stroke="#999999" strokeLinecap="round"/>
                            </svg>

                        </div>
                    </div>
                    <div className={s.dropDownContent} style={{display: `${isDropDownOpen ? "block" : "none"}`}}>
                        {arr.length && arr.map((info,idx) =>
                            <div className={s.dropDownContentTitle} key={info.id} onClick={() => {dropDownSetContent({
                                id : info.id,
                                title : info.name,
                                index : idx
                            })}}>
                                <p>{info.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegDropDown;