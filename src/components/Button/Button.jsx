import React from "react";
import classNames from "classnames";
import styles from "../Button/Button.module.css";

const Button = ({
  isBasket,
  type,
  width,
  margin,
  text,
  lineHeight,
  onClick,
  background,
  white,
  fontSize,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.btn,
        // text === "Войти" ? styles.auth : styles.reg,
        white ? styles.auth : styles.reg
      )}
      type={type}
      style={{
        width: width,
        lineHeight: lineHeight,
        margin: margin,
        fontSize: fontSize,
        background: background,
      }}
    >
      {isBasket && (
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4 14.8902C14.8774 14.8902 15.3352 15.0799 15.6728 15.4174C16.0104 15.755 16.2 16.2128 16.2 16.6902C16.2 17.1676 16.0104 17.6255 15.6728 17.963C15.3352 18.3006 14.8774 18.4902 14.4 18.4902C13.401 18.4902 12.6 17.6802 12.6 16.6902C12.6 15.6912 13.401 14.8902 14.4 14.8902ZM0 0.490234H2.943L3.789 2.29023H17.1C17.3387 2.29023 17.5676 2.38506 17.7364 2.55384C17.9052 2.72262 18 2.95154 18 3.19023C18 3.34323 17.955 3.49623 17.892 3.64023L14.67 9.46323C14.364 10.0122 13.77 10.3902 13.095 10.3902H6.39L5.58 11.8572L5.553 11.9652C5.553 12.0249 5.5767 12.0821 5.6189 12.1243C5.6611 12.1665 5.71833 12.1902 5.778 12.1902H16.2V13.9902H5.4C4.401 13.9902 3.6 13.1802 3.6 12.1902C3.6 11.8752 3.681 11.5782 3.816 11.3262L5.04 9.12123L1.8 2.29023H0V0.490234ZM5.4 14.8902C5.87739 14.8902 6.33523 15.0799 6.67279 15.4174C7.01036 15.755 7.2 16.2128 7.2 16.6902C7.2 17.1676 7.01036 17.6255 6.67279 17.963C6.33523 18.3006 5.87739 18.4902 5.4 18.4902C4.401 18.4902 3.6 17.6802 3.6 16.6902C3.6 15.6912 4.401 14.8902 5.4 14.8902ZM13.5 8.59023L16.002 4.09023H4.626L6.75 8.59023H13.5Z"
            fill="white"
          />
        </svg>
      )}
      {text}
    </button>
  );
};

export default Button;
