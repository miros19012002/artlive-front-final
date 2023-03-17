import moment from "moment";
import React from "react";
import { statusObj } from "../../utils/statusObj";
import Button from "../Button/Button";
import styles from "./CardAdmin.module.css";

const CardAdmin = ({
  pic,
  onClick,
  title,
  dose,
  name,
  surname,
  address,
  quantity,
  status,
  price,
  date,
}) => {
  return (
    <div className={styles.cardAdminContainer}>
      <div className={styles.adminMain}>
        <div className={styles.adminLeft}>
          <div>
            <h3>{title}</h3>
            <span>{dose}</span>
            <p>
              <span>Дата совершения заказа: </span>
              {moment(date).format("DD.MM.YYYY")}
            </p>
            <p>
              <span>ФИО клиента: </span>
              {name} {surname}
            </p>
            <p>
              <span>Адрес выбранной аптеки: </span>
              {address}
            </p>
            <p>
              <span>Статус: </span>
              {statusObj[status]}
            </p>
          </div>
          <Button
            type="submit"
            width="170px"
            text="Сменить статус"
            lineHeight="33px"
            fontSize="16px"
            onClick={onClick}
          />
        </div>
        <div className={styles.adminRight}>
          <img src={pic} alt="" />
          <h3>{price} ₽</h3>
          <p>{quantity} шт</p>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
