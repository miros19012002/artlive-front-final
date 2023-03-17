import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import CardVertical from "../../components/CardVertical/CardVertical";
import Button from "../../components/Button/Button";
import Empty from "../../components/Empty/Empty";
import empty from "../../assets/images/add_to_cart/empty_cart.png";
import pic from "../../assets/images/my_order/anafMini.png";
import { GetActiveBasket } from "../../services/Basket/GetActiveBasket";
import styles from "./AddToCart.module.css";

const AddToCart = ({ finalAmount }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [basketId, setBasketId] = useState(0);
  const [click, setClick] = useState(false);

  const getBasket = async () => {
    try {
      const { data } = await GetActiveBasket();

      setBasket(data.basket.basket_contents);
      setBasketId(data.basket.ID);
      setPrice(data.total_price);
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getBasket();
    }
  }, [isAuth, click]);

  return (
    <div className={styles.cart}>
      <div className={styles.cartContainer}>
        <BreadcrumbComponent
          crumbs={[
            { path: "/", name: "Главная" },
            { path: "/catalog?category_id=1&sub_category=2", name: "Каталог" },
            { path: "", name: "Корзина" },
          ]}
        />
        <h2>Корзина</h2>
        {loading ? (
          <Spin />
        ) : (
          <div className={styles.list}>
            {basket.length ? (
              basket.map((el) => {
                return (
                  <CardVertical
                    key={el.product.ID}
                    id={el.product.ID}
                    pic={el.product.img_href}
                    setClick={setClick}
                    nums={el.count}
                    basketId={basketId}
                    basketContentId={el.ID}
                    title={el.product.name}
                    dose={el.product.dosage}
                    price={el.product.price}
                  />
                );
              })
            ) : (
              <Empty
                isBtn={true}
                empty={empty}
                text="Ваша корзина пуста"
                btnText="Вернуться к покупкам"
                btnWidth="290px"
                lineHeightBtn="50px"
                onClickBtn={() =>
                  navigate("/catalog?category_id=1&sub_category=2")
                }
              />
            )}
          </div>
        )}
        <div className={styles.create}>
          <p>
            Итоговая стоимость заказа: <span>{price} ₽</span>
          </p>
          <div className={styles.buttons}>
            {basket.length !== 0 && (
              <Button
                type="submit"
                width="228px"
                text="Оформить заказ"
                fontSize="20px"
                lineHeight="48px"
                onClick={() => navigate("/ordermaking")}
              />
            )}
            <Button
              type="submit"
              width="280px"
              text="Продолжить покупки"
              fontSize="20px"
              lineHeight="48px"
              onClick={() => navigate("/catalog?category_id=1&sub_category=2")}
              white={true}
              margin="0 0 0 30px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
