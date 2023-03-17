import React from "react";
import Button from "../Button/Button";
import styles from "./Empty.module.css";

const Empty = ({
  isBtn,
  empty,
  text,
  btnText,
  btnWidth,
  lineHeightBtn,
  onClickBtn,
}) => {
  return (
    <div className={styles.empty__container}>
      <div className={styles.empty}>
        <img src={empty} alt="empty" />
        <span>{text}</span>
        {isBtn && (
          <Button
            type="submit"
            fontSize="22px"
            text={btnText}
            width={btnWidth}
            lineHeight={lineHeightBtn}
            onClick={onClickBtn}
          />
        )}
      </div>
    </div>
  );
};

export default Empty;
