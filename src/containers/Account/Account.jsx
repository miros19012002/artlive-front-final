import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { GetListFavorites } from "../../services/Favorites/GetListFavorites";
import { GetOrderList } from "../../services/Order/GetOrderList";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const [fav, setFav] = useState([]);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await GetOrderList(1);

      const orderArr = data.map((el) => {
        return [
          ...el.products.map((elem) => {
            return { count: elem.count, data: elem.product, status: el.status };
          }),
        ];
      });

      setOrders(orderArr.flat());
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    GetListFavorites()
      .then((res) => setFav(res.data))
      .catch((e) => {
        throw new Error(e);
      });
    getOrders();
  }, []);

  return (
    <div className={styles.account}>
      <div className={styles.accountContainer}>
        <BreadcrumbComponent
          crumbs={[
            { path: "/", name: "Главная" },
            { path: "", name: "Личный кабинет" },
          ]}
        />
        <h2>Личный кабинет</h2>
        <div className={styles.blocks}>
          <Badge
            count={orders.length}
            size="large"
            showZero
            color="#136EEF"
            offset={[-25, 0]}
          >
            <button
              onClick={() => navigate("/myorder")}
              className={styles.titleBtn}
            >
              <p>Мои заказы</p>
            </button>
          </Badge>
          <Badge
            count={fav.length}
            size="large"
            showZero
            color="#136EEF"
            offset={[-25, 0]}
          >
            <button
              onClick={() => navigate("/favourites")}
              className={styles.titleBtn}
            >
              <p>Избранное</p>
            </button>
          </Badge>

          <button onClick={() => navigate("/edit")} className={styles.titleBtn}>
            <p>Изменить личные данные</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
