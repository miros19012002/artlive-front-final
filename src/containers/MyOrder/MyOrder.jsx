import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { GetOrderList } from "../../services/Order/GetOrderList";
import CardMini from "../../components/CardMini/CardMini";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import Empty from "../../components/Empty/Empty";
import empty from "../../assets/images/my_order/empty_order.png";
import styles from "./MyOrder.module.css";
import { useSelector } from "react-redux";

const MyOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { isAuth } = useSelector((state) => state.auth);
  const [current, setCurrent] = useState(1);

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await GetOrderList(current);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getOrders();
    }
  }, [current, isAuth]);

  return (
    <div className={styles.order}>
      <div className={styles.orderContainer}>
        <BreadcrumbComponent
          crumbs={[
            { path: "/", name: "Главная" },
            { path: "/account", name: "Личный кабинет" },
            { path: "", name: "Мои заказы" },
          ]}
        />
        <h2>Мои заказы</h2>
        {loading ? (
          <Spin />
        ) : (
          <div className={styles.orderGrid}>
            {orders.length ? (
              orders.map((el) => {
                return (
                  <CardMini
                    key={el.data.ID}
                    isMyOrder={true}
                    id={el.data.ID}
                    pic={el.data.img_href}
                    dose={el.data.dosage}
                    title={el.data.name}
                    quantity={el.count}
                    price={el.data.price}
                    date={el.data.CreatedAt}
                    status={el.status}
                  />
                );
              })
            ) : (
              <Empty
                isBtn={true}
                empty={empty}
                text="У Вас пока что не было ни одного заказа"
                btnText="Перейти в каталог"
                btnWidth="250px"
                lineHeightBtn="50px"
                onClickBtn={() => navigate("/catalog?category_id=1&sub_category=2")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
