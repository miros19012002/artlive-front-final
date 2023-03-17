import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import Card from "../../components/Card/Card";
import Empty from "../../components/Empty/Empty";
import empty from "../../assets/images/favourites/empty_favourites.png";
import { useNavigate } from "react-router-dom";
import styles from "./Favourites.module.css";
import { useSelector } from "react-redux";
import { GetListFavorites } from "../../services/Favorites/GetListFavorites";
import { message, Spin } from "antd";
import { AddProduct } from "../../services/Product/AddProduct";
import { GetActiveBasket } from "../../services/Basket/GetActiveBasket";
import ModalCustom from "../../components/Modal/Modal";

const Favourites = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [basketId, setBasketId] = useState(-1);
  const [products, setProducts] = useState([]);
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");

  const addToCart = async (id) => {
    if (isAuth) {
      try {
        const res = await AddProduct(basketId, id);

        message.success("Товар успешно добавлен в корзину!");
      } catch (e) {
        message.error("Произошла ошибка!");
      }
    } else {
      setType("auth");
      setVisible(true);
    }
  };

  const getBasket = async () => {
    if (isAuth) {
      const { data } = await GetActiveBasket();
      setBasketId(data.basket.ID);
    }
  };

  const getList = async () => {
    if (isAuth) {
      try {
        const { data } = await GetListFavorites();

        setProducts(data.map((el) => el.product));
      } catch (e) {
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getList();
    getBasket();
  }, [isAuth, click]);

  return (
    <>
      <div className={styles.favourites}>
        <div className={styles.favouritesContainer}>
          <BreadcrumbComponent
            crumbs={[
              { path: "/", name: "Главная" },
              { path: "/account", name: "Личный кабинет" },
              { path: "", name: "Избранное" },
            ]}
          />
          <h2>Избранное</h2>
          {loading ? (
            <Spin />
          ) : products.length ? (
            <div className={styles.favouritesGrid}>
              {products.map((el) => (
                <Card
                  key={el.ID}
                  id={el.ID}
                  favProduct={products.map((el) => el.ID)}
                  click={click}
                  pic={el.img_href}
                  text={el.description}
                  title={el.name}
                  price={el.price}
                  onClick={() => addToCart(el.ID)}
                  setClick={setClick}
                  iconClick={() => {
                    setVisible(false);
                    setType("");
                  }}
                />
              ))}
            </div>
          ) : (
            <Empty
              isBtn={true}
              empty={empty}
              text="В Вашем избранном пока что пусто"
              btnText="Перейти в каталог"
              btnWidth="250px"
              lineHeightBtn="50px"
              onClickBtn={() =>
                navigate("/catalog?category_id=1&sub_category=2")
              }
            />
          )}
        </div>
      </div>
      <ModalCustom
        closeModal={() => {
          setType("");
          setVisible(false);
        }}
        visible={visible}
        type={type}
        switchType={setType}
        onCancel={() => {
          setType("");
          setVisible(false);
        }}
      />
    </>
  );
};

export default Favourites;
