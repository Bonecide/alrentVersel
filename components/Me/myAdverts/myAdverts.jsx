import React from 'react';
import s from "../../../styles/userId.module.scss";
import Advert from "./advert";

const MyAdverts = ({myAdverts, currentActive,isSettingsOpen}) => {
    return (
        <div style={{maxWidth : isSettingsOpen ? '700px' : '100%'}} className={s.items}>
            {myAdverts && myAdverts.map(p => {
                    if (currentActive === 1) {
                        return (
                            <div className={s.item} key={p.id}>
                                <Advert p={p}/>
                            </div>
                        )
                    }
                    if (p.status === "ACTIVE" && currentActive === 2) {
                        return (
                            <div className={s.item} key={p.id}>
                                <Advert p={p}/>
                            </div>
                        )
                    }
                    if ((p.status === "MODERATION" || p.status === "REJECTED") && currentActive === 3) {
                        return (
                            <div className={s.item} key={p.id}>
                                <Advert p={p}/>
                            </div>
                        )
                    }
                }
            )}
        </div>
    );
};

export default MyAdverts;