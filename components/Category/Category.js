import s from "../../styles/category.module.scss"
import Filter from "../../modules/Filter/Filter";
import productImg1 from "../../public/productImg1.png";
import userAvatar from "../../public/userAvatar.png";
import CategoryItems from "./CategoryItems";

const Category = () => {

    const items = [
        {
            id: 1, title: "Премиум", type: "special", items: [
                {
                    id: 1, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },
                {
                    id: 2, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },
                {
                    id: 3, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },

                {
                    id: 4, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },

                {
                    id: 5, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },
                {
                    id: 6, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },
                {
                    id: 7, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 10
                    }
                },
                {
                    id: 8, title: "Дом 155 м² на участке 8 сот.", date: "Сегодня 07:26", img: productImg1,
                    price: "от 5 000 ₽/сут.", deposit: "паспорт", action: "арендовать",
                    location: "Санкт-Петербург, Проспект Просвещения", profile: {
                        name: "ЭЛЕНа", avatar: userAvatar, id: 7
                    }
                },
            ]
        },
    ]

    return (
        <section className={s.category}>
            <div className="container">
                <Filter page={"notMain"}/>
                <div className={s.title}>
                    {items[0].title}
                </div>
                <CategoryItems arr={items} type={items[0].type}/>
            </div>
        </section>
    );
};

export default Category;