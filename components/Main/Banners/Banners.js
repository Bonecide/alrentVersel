import s from "../../../styles/MainBanner.module.scss"
import Image from "next/image";
import banner1 from "../../../public/baner1.png"
import banner2 from "../../../public/baner2.png"
import banner3 from "../../../public/baner3.png"

const Banners = () => {
    return (
        <section className={s.banners}>
            <div >
                <div className={s.wrap}>
                    <div className={s.bigImg}>
                        <Image layout={"raw"} src={banner1} alt={"banner1"}/>
                    </div>
                    <div className={s.miniImg}>
                        <Image layout={"raw"} src={banner2} alt={"banner1"}/>
                        <Image layout={"raw"} src={banner3} alt={"banner1"}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banners;