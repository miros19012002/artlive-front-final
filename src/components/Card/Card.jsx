import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavourite } from "../../hooks/useFavourite";
import { UpdateBasket } from "../../services/Basket/UpdateBasket";
import Button from "../Button/Button";
import styles from "../Card/Card.module.css";

const Card = ({
  pic,
  title,
  text,
  price,
  onClick,
  id,
  click,
  iconClick,
  favProduct,
  setClick,
}) => {
  const navigate = useNavigate();
  const fav = useFavourite(id, favProduct, click, setClick, iconClick);

  return (
    <>
      <div
        className={styles.card}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${id}`);
        }}
      >
        {fav}
        <img className={styles.pic} src={pic} alt="top_pic" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text.substr(0, 90)}...</p>
        <p className={styles.price}>{price.toFixed(2)} ₽</p>
        <div className={styles.buttons}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            isBasket="true"
            type="submit"
            width="140px"
            text="В корзину"
            lineHeight="37px"
            color="#FFFFFF"
            border="none"
            background="#136EEF "
          />
        </div>
      </div>
    </>
  );
};

export default Card;
