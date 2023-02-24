import s from "../../../styles/Filter.module.scss"
import {useState} from "react";

const DropDown = ({dropDownArr, mainTitle, className}) => {

    const [isDropDownOpen, setIsDropDownOpen] = useState()
    const [dropDownContent, setDropDownContent] = useState()

    const dropDownSetContent = (title, id) => {
        setDropDownContent(title)
        setIsDropDownOpen(false)
    }

    return (
        <div className={className ? className : s.filterMenuItem}>
            <div className={s.dropDown}>
                <div className={s.dropDownMenu}>
                    <div className={s.dropDownMenuTitle}>
                        {mainTitle}
                    </div>
                    <div className={s.select} onClick={() => {setIsDropDownOpen(!isDropDownOpen)}}>
                        {!dropDownContent ? <span>Выберите категорию</span> : dropDownContent}
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1.03139L6 7.06052L1 1.03139" stroke="#999999" strokeLinecap="round"/>
                        </svg>

                    </div>
                </div>
                <div className={s.dropDownContent} style={{display: `${isDropDownOpen ? "block" : "none"}`}}>
                    {dropDownArr.map(e =>
                        <div className={s.dropDownContentTitle} key={e.id} onClick={() => {dropDownSetContent(e.title, e.id)}}>
                            {e.title}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropDown;