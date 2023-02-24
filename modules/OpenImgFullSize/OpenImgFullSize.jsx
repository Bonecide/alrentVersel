import React from 'react';
import Image from "next/image";
import s from "../../styles/userId.module.scss"

const OpenImgFullSize = ({img, setIsImgOnFullSize}) => {
    return (
        <div className={s.modalImg} onClick={() => setIsImgOnFullSize(false)}>
            <Image src={img} width={10} height={10} onClick={e => e.stopPropagation()}/>
        </div>
    );

};

export default OpenImgFullSize;