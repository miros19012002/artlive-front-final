import React, { useEffect, useState } from "react";
import { Col, Input, Spin, Row, Space, message } from "antd";
import { useSelector } from "react-redux";
import { getFeedbackList } from "../../services/Feedback/getFeedbackList";
import { GetMainCategories } from "../../services/Catalog/GetMainGategories";
import { GetListProduct } from "../../services/Product/GetListProduct";
import { GetActiveBasket } from "../../services/Basket/GetActiveBasket";
import { AddProduct } from "../../services/Product/AddProduct";
import { GetListFavorites } from "../../services/Favorites/GetListFavorites";
import ModalCustom from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import Feedback from "../../components/Feedback/Feedback";
import Button from "../../components/Button/Button";
import Filter from "../../components/Filter/Filter";
import empty from "../../assets/images/catalog/empty_catalog.png";
import photo from "../../assets/images/main_page/Фото.png";
import loc from "../../assets/images/main_page/Локация.png";
import best from "../../assets/images/main_page/Лучшая.png";
import head from "../../assets/images/main_page/Наушники.png";
import pic1 from "../../assets/images/main_page/portrait-of-female-pharmacist-in-drug-store-standing-in-front-of-shelves-with-medications 1.png";
import pic2 from "../../assets/images/main_page/close-up-of-cash-register-in-pharmacy 1.png";
import pic3 from "../../assets/images/main_page/high-angle-of-foils-of-pills 1.png";
import pic4 from "../../assets/images/main_page/medicine-pharmaceutics-health-care-and-people-concept-female-pharmacist-taking-medications-from-the-shelf 1.png";
import pic5 from "../../assets/images/main_page/woman-working-at-pharmacy-and-wearing-coat 1.png";
import pic6 from "../../assets/images/main_page/closeup-view-of-pharmacist-hand-taking-medicine-box-from-the-shelf-in-drug-store 1.png";
import pic7 from "../../assets/images/main_page/pharmacist-in-white-uniform-holding-medicines-for-cardiovascular-disease 1.png";
import pic8 from "../../assets/images/main_page/various-pills-on-wooden-spoon 1.png";
import CustomPagination from "../../components/Pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "../MainPage/MainPage.module.css";
import Empty from "../../components/Empty/Empty";

const MainPage = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState("");
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(1);
  const [current, setCurrent] = useState(1);
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [basketId, setBasketId] = useState(-1);
  const [click, setClick] = useState(false);
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getFeedbacks = async () => {
    try {
      const { data } = await getFeedbackList(current);
      setTotal(data.total_records);
      setCards(data.records);
    } catch (e) {
      throw new Error(e);
    }
  };

  const getProducts = (filters) => {
    setLoading(true);
    GetListProduct(category, 1, 6, filters)
      .then((res) => {
        setProducts(res.data.records);
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      getProducts({ search: searchTerm });
    } else {
      getProducts();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getFeedbacks();
  }, [current]);

  useEffect(() => {
    getProducts();
  }, [category]);

  useEffect(() => {
    if (isAuth) {
      GetListFavorites().then((res) => setFav(res.data));
      GetActiveBasket().then((res) => setBasketId(res.data.basket.ID));
    } else {
      setFav([]);
    }
  }, [isAuth, click]);

  useEffect(() => {
    GetMainCategories().then((res) => {
      setCategories(res.data.filter((el) => el.name !== "Пустая категория"));
    });
  }, []);

  return (
    <>
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.description}>
            <h2 className={styles.title}>ПараДная</h2>
            <p className={styles.textMain}>Ваша любимая сеть книг</p>
            <div className={styles.textImage}>
              <img src={loc} alt="" />
              <p className={styles.text}>
                быстрая доставка книг в ближайший к Вам магазин нашей сети
              </p>
            </div>
            <div className={styles.textImage}>
              <img src={best} alt="" />
              <p className={styles.text}>
                демократичные цены на весь ассортимент
              </p>
            </div>
            <div className={styles.textImage}>
              <img src={head} alt="" />
              <p className={styles.text}>
                ответ оператора в течение 15-ти минут для подтверждения заказа
              </p>
            </div>
          </div>
          <img src={photo} alt="woman" />
        </div>
      </main>
      <div className={styles.backMain}>
        <div className={styles.filter}>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Наши лучшие товары</h2>
            <div className={styles.filterCategory}>
              <h3>Категории/группы книг</h3>
              <Space direction="vertical">
                <Input
                  className={styles.filterSearch}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Найти"
                />
              </Space>
            </div>
            <div className={styles.filterItems}>
              {categories.map((el) => {
                return (
                  <Filter
                    name={el.name}
                    key={el.ID}
                    id={el.ID}
                    category={category}
                    onClick={() => setCategory(el.ID)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContainer}>
            {loading ? (
              <Spin />
            ) : (
              <Row
                gutter={[10, 15]}
                justify="center"
                align="center"
                style={{ width: "100%" }}
              >
                {products.length ? (
                  products.map((el) => {
                    return (
                      <Col span={8} key={el.ID}>
                        <Card
                          id={el.ID}
                          favProduct={fav.map((el) => el.product_id)}
                          onClick={() => {
                            if (isAuth) {
                              AddProduct(basketId, el.ID)
                                .then(() =>
                                  message.success("Товар добавлен в корзину!")
                                )
                                .catch(() =>
                                  message.error("Произошла ошибка!")
                                );
                            } else {
                              setModalType("auth");
                              setVisible(true);
                            }
                          }}
                          click={click}
                          iconClick={() => {
                            setModalType("auth");
                            setVisible(true);
                          }}
                          setClick={setClick}
                          pic={el.img_href}
                          title={el.name}
                          text={el.description}
                          price={el.price}
                        />
                      </Col>
                    );
                  })
                ) : (
                  <Col span={24}>
                    <Empty empty={empty} text="Нет подходящих результатов" />
                  </Col>
                )}
              </Row>
            )}
          </div>
        </div>
        <div className={styles.about} id="about">
          <div className={styles.aboutContainer}>
            <h2 className={styles.commonTitle}>О нас</h2>
            <p className={styles.aboutText}>
            Книга – предмет, с которым человек сталкивается с самого детства. 
            Малыши обожают, когда им читают сказки. Взрослые же могут часами лежать 
            с детективом или романтическим романом в руках. Несмотря на возникновение 
            электронных изданий, многие до сих пор отдают предпочтение бумажной литературе.
            
            </p>
            <h2></h2>
            <p className={styles.aboutText}>
            Мы не просто продаём книги! 
            Наш магазин старается, чтобы все желания потребителей были исполнены.
            Вы всегда найдете, что почитать у нас.
            Ведь это всегда так трудно... 
            Не правда ли?
            </p>
            <div className={styles.grid}>
              <div className={styles.gridContainer}>
                <img className={styles.one} src={pic1} alt="pic1" />
                <img className={styles.two} src={pic2} alt="pic2" />
                <img className={styles.three} src={pic3} alt="pic3" />
                <img className={styles.four} src={pic4} alt="pic4" />
                <img className={styles.five} src={pic5} alt="pic5" />
                <img className={styles.six} src={pic6} alt="pic6" />
                <img className={styles.seven} src={pic7} alt="pic7" />
                <img className={styles.eight} src={pic8} alt="pic8" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.feedback} id="feed">
          <div className={styles.feedbackContainer}>
            <h2 className={styles.commonTitle}>Отзывы</h2>
            <div className={styles.feedbackGrid}>
              {cards.map((el) => (
                <Feedback
                  key={el.Id}
                  text={el.Title}
                  date={el.created}
                  nickname={el.Login}
                />
              ))}
            </div>
            <CustomPagination
              style={{ margin: "20px 0 0" }}
              pageSize={6}
              page={current}
              total={total}
              setVal={setCurrent}
            />

            <Button
              onClick={() => {
                setModalType(isAuth ? "feedback" : "auth");
                setVisible(true);
              }}
              type="submit"
              width="190px"
              margin="30px 0 0 0"
              text="Оставить отзыв"
              lineHeight="40px"
            />
          </div>
        </div>
      </div>

      <ModalCustom
        getFeedbacks={getFeedbacks}
        closeModal={() => {
          setModalType("");
          setVisible(false);
        }}
        visible={visible}
        type={modalType}
        switchType={setModalType}
        onCancel={() => {
          setModalType("");
          setVisible(false);
        }}
      />
    </>
  );
};

export default MainPage;
