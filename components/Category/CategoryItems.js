import React from 'react';
import s from "../../styles/category.module.scss";
import Link from "next/link";
import Image from "next/image";

const CategoryItems = ({arr, type}) => {
    const stars = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ]
    return (
        <div className={s.items}>
            {arr[0].items.map(p =>
                <div key={p.id}>
                    <div className={s.item}
                         style={{backgroundColor: `${type === "special" ? "#E7F9FF" : "transparent"}`}}>
                        <div className={s.userInfo}>
                            <Link href={`/user/${p.profile.id}`} className={s.userAvatar}>
                                <Image src={p.profile.avatar} alt={"avatar"} layout={"raw"}/>
                            </Link>
                            <Link href={`/user/${p.profile.id}`} className={s.userName}>
                                {p.profile.name}
                            </Link>
                            <Link href={`/messages/${p.id}`} className={s.message}>
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 3.28571V15C1 16.1046 1.89543 17 3 17H19C20.1046 17 21 16.1046 21 15V3.28571M1 3.28571V3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V3.28571M1 3.28571L9.86894 9.36728C10.5506 9.83466 11.4494 9.83467 12.1311 9.36728L21 3.28571"
                                        stroke="#2C52A5" strokeWidth="2" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <div className={s.like}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.163 1.92195C17.1019 0.818098 15.695 0.146971 14.1982 0.0306135C12.7015 -0.0857435 11.2142 0.360398 10.0071 1.2879C8.73534 0.304245 7.15245 -0.141793 5.57716 0.039611C4.00187 0.221015 2.55117 1.01639 1.51722 2.26556C0.483262 3.51473 -0.0571552 5.12491 0.00479304 6.77185C0.0667413 8.41879 0.726454 9.98016 1.85108 11.1415L9.2974 18.8851C9.39032 18.9826 9.50087 19.0599 9.62267 19.1127C9.74447 19.1654 9.87511 19.1926 10.0071 19.1926C10.139 19.1926 10.2696 19.1654 10.3914 19.1127C10.5132 19.0599 10.6238 18.9826 10.7167 18.8851L18.163 11.1415C18.7454 10.5363 19.2074 9.81767 19.5226 9.0267C19.8378 8.23573 20 7.38793 20 6.53173C20 5.67554 19.8378 4.82773 19.5226 4.03677C19.2074 3.2458 18.7454 2.52717 18.163 1.92195ZM16.7537 9.67595L10.0071 16.6816L3.26038 9.67595C2.66585 9.05511 2.26085 8.26552 2.09619 7.40623C1.93152 6.54694 2.01453 5.65622 2.33479 4.8458C2.65506 4.03538 3.19831 3.34136 3.89642 2.85079C4.59452 2.36022 5.41638 2.09494 6.2589 2.08825C7.38446 2.09112 8.46291 2.55841 9.25742 3.38752C9.35034 3.48494 9.46089 3.56226 9.58269 3.61503C9.70449 3.6678 9.83513 3.69497 9.96707 3.69497C10.099 3.69497 10.2297 3.6678 10.3515 3.61503C10.4733 3.56226 10.5838 3.48494 10.6767 3.38752C11.4946 2.65045 12.5513 2.26406 13.6328 2.30655C14.7143 2.34904 15.7399 2.81724 16.502 3.61638C17.2641 4.41552 17.7058 5.48592 17.7377 6.61093C17.7696 7.73593 17.3893 8.83152 16.6738 9.67595H16.7537Z"
                                        fill="#2C52A5"/>
                                </svg>
                            </div>
                        </div>
                        <div className={s.date}>
                            {p.date}
                        </div>

                        <div className={s.mainInfo}>
                            <div className={s.mainImg}>
                                <Image src={p.img} alt={"mainIng"} layout={"raw"}/>
                                {type === "special" &&
                                    <span>
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M14.2221 4.75H10.9338C9.48162 4.75 8.75551 4.75 8.22084 5.1533C7.68617 5.55661 7.48669 6.25477 7.08774 7.65111L5.48765 13.2514C5.50552 13.2505 5.52352 13.25 5.54163 13.25H12.6284L14.2221 4.75ZM4.9688 15.0698C4.87521 15.4083 4.83507 15.6097 4.87589 15.8073C4.92562 16.048 5.08793 16.2464 5.41255 16.6432L15.7118 29.2311L12.6534 15.25H5.54163C5.32855 15.25 5.13104 15.1834 4.9688 15.0698ZM19.5326 32.4689C19.3538 32.6035 19.1858 32.6708 19 32.6708C18.8141 32.6708 18.6461 32.6035 18.4673 32.4689L14.7007 15.25H23.2992L19.5326 32.4689ZM22.2882 29.2311L32.5874 16.6432C32.912 16.2464 33.0743 16.048 33.124 15.8073C33.1649 15.6097 33.1247 15.4083 33.0311 15.0698C32.8689 15.1834 32.6714 15.25 32.4583 15.25H25.3465L22.2882 29.2311ZM32.5123 13.2514L30.9122 7.65112C30.5132 6.25478 30.3138 5.55661 29.7791 5.1533C29.2444 4.75 28.5183 4.75 27.0661 4.75H23.7778L25.3716 13.25H32.4583C32.4764 13.25 32.4944 13.2505 32.5123 13.2514ZM21.743 4.75H16.257L14.6632 13.25H23.3367L21.743 4.75Z"
                                                      fill="#00ECEC"/>
                                            </svg>
                                        </span>
                                }
                            </div>
                            <div className={s.stars}>
                                {stars.map(stars =>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" key={stars.id}>
                                        <path
                                            d="M11.9687 4.34566C11.8902 4.10267 11.6747 3.93009 11.4197 3.90711L7.95614 3.59262L6.58657 0.387003C6.48558 0.152073 6.25559 0 6.00006 0C5.74453 0 5.51455 0.152073 5.41356 0.387553L4.04399 3.59262L0.579909 3.90711C0.325385 3.93064 0.110414 4.10267 0.0314019 4.34566C-0.0476102 4.58865 0.0253592 4.85517 0.2179 5.02317L2.83592 7.31919L2.06393 10.7198C2.00744 10.9699 2.10448 11.2283 2.31195 11.3783C2.42346 11.4588 2.55393 11.4999 2.68549 11.4999C2.79893 11.4999 2.91145 11.4693 3.01244 11.4089L6.00006 9.62326L8.98659 11.4089C9.20513 11.5403 9.48062 11.5283 9.68763 11.3783C9.89518 11.2279 9.99214 10.9693 9.93565 10.7198L9.16366 7.31919L11.7817 5.02363C11.9742 4.85517 12.0477 4.58911 11.9687 4.34566Z"
                                            fill="#FFC107"/>
                                    </svg>
                                )}
                            </div>
                            <div className={s.mainTitle}>
                                {p.title}
                            </div>
                            <div className={s.price}>
                                {p.price}
                            </div>
                            <div className={s.deposit}>
                                Залог: {p.deposit}
                            </div>
                            <Link href={`/ad/${p.id}`} className={s.action}>
                                {p.action}
                            </Link>
                            <div className={s.location}>
                                {p.location}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryItems;