import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { statusObj } from "../../utils/statusObj";
import styles from "./CardMini.module.css";

const CardMini = ({
  isMyOrder,
  id,
  pic,
  title,
  dose,
  quantity,
  status,
  price,
  date,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.cardMiniContainer}
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className={styles.main}>
        <div className={styles.left}>
          <h3>{title}</h3>
          <span>{dose}</span>
        </div>
        <div className={styles.right}>
          <img src={pic} alt="" />
        </div>
      </div>
      <div className={styles.about}>
        <p>{quantity}</p>
        <h3>{price} ₽</h3>
      </div>
      {isMyOrder && (
        <div className={styles.status}>
          <p>
            <span>Дата совершения заказа: </span>
            {moment(date).format("DD.MM.YYYY")}
          </p>
          <p>
            <span>Статус: </span>
            {statusObj[status]}
          </p>
        </div>
      )}
    </div>
  );
};

export default CardMini;
