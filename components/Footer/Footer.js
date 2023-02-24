import s from "../../styles/Footer.module.scss"
import Link from "next/link";
import MobileFooter from './MobileFooter/MobileFooter';

const Footer = () => {
    return (
        <>
        <footer className={s.footer}>
            <div className="container">
                <div className={s.wrap}>
                    <div className={s.column}>
                        <Link href={"#"} className={s.columnItem}>
                            ссылка...........
                        </Link>
                        <Link href={"#"} className={s.columnItem}>
                            ссылка...........
                        </Link>
                        <Link href={"#"} className={s.columnItem}>
                            ссылка...........
                        </Link>
                    </div>

                    <div className={s.column}>
                        <Link href={"/about"} className={s.columnItem}>
                            О нас
                        </Link>
                        <Link href={"/rules"} className={s.columnItem}>
                            Правила сайта
                        </Link>
                        <Link href={"/paidServices"} className={s.columnItem}>
                            Платные услуги
                        </Link>
                        <Link href={"/info"} className={s.columnItem}>
                            Положение о персональных данных
                        </Link>
                        <Link href={"/requisites"} className={s.columnItem}>
                            реквизиты
                        </Link>
                    </div>

                    <div className={s.column}>
                        <div  className={s.columnItem}>
                            тех. поддержка
                        </div>
                        <Link href={"#"} className={s.columnSubItem}>
                            работе сайта
                        </Link>
                        <Link href={"/paidServices"} className={s.columnSubItem}>
                            финансовый вопрос
                        </Link>

                    </div>

                    <div className={s.column}>
                        <div  className={s.columnItem}>
                            Поддержка
                        </div>
                        <Link href={"#"} className={s.columnSubItem}>
                            Запросы
                        </Link>
                        <Link href={"/paidServices"} className={s.columnSubItem}>
                            Архив запросов
                        </Link>
                        <Link href={"/paidServices"} className={s.columnSubItem}>
                            Уведомления
                        </Link>
                    </div>
                </div>
                <div className={s.year}>
                    2022
                </div>
            </div>
        </footer>
        <MobileFooter/>
        </>
        
    );
};

export default Footer;