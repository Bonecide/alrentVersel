export const CustomCarouselArrowLeft = (props) => {
    const {className, style, onClick} = props;
    return (
        <p data-role="none" className="slick-arrow slick-next slick-disabled" onClick={onClick}>
            <span
                className="icon small primary    ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        transform="rotate(-180 12.000003814697266,11.999992370605469)" fillRule="nonzero"
                        d="M9.393 12l8.058 8.304a1 1 0 0 1-1.435 1.392l-8.734-9a1 1 0 0 1 0-1.392l8.734-9a1 1 0 0 1 1.435 1.392L9.393 12z">
                    </path>
                </svg>
            </span>
        </p>
    );
};


export const CustomCarouselArrowRight = (props) => {
    const {className, style, onClick} = props;
    return (
        <p data-role="none" className="slick-arrow slick-prev" onClick={onClick}>
            <span
                className="icon small primary   iconArrowLeft ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                    fillRule="nonzero"
                    d="M9.393 12l8.058 8.304a1 1 0 0 1-1.435 1.392l-8.734-9a1 1 0 0 1 0-1.392l8.734-9a1 1 0 0 1 1.435 1.392L9.393 12z"></path>
                </svg>
            </span>
        </p>
    );
};

