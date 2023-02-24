import { useState } from "react";
import styles from "./Rating.module.scss";

const Rating = ({ value , onClick,id }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const onHover = (index) => {
    setHoverValue(index);
  };
  const onLeave = () => {
    setHoverValue(0);
  };

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {stars.map((i,idx) => {
          const filled = i <= (hoverValue || value) ? styles.filled : "";
          return (
            <Star
              id={id}
              hoverValue={hoverValue}
              onClick={onClick}
              key={i}
              filled={filled}
              onHover={() => onHover(i)}
              onLeave={onLeave}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

const Star = ({ index, filled, onHover, onLeave,onClick,id,hoverValue }) => {
    return (
      <span
        onClick={() => onClick(id,index + 1) }
        className={`${styles.star} ${filled && styles.filled} `}
        onMouseEnter={() => onHover(hoverValue)}
        onMouseLeave={() => onLeave()}
      >
        ★
      </span>
    );
  };

export default Rating;