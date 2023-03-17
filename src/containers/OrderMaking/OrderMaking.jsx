import { Form, Input, message, Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import location from "../../assets/images/order_making/location.png";
import time from "../../assets/images/order_making/time.png";
import Button from "../../components/Button/Button";
import ModalCustom from "../../components/Modal/Modal";
import CardMini from "../../components/CardMini/CardMini";
import { mapData } from "../../utils/mapData";
import { GetActiveBasket } from "../../services/Basket/GetActiveBasket";
import styles from "./OrderMaking.module.css";
import { useNavigate } from "react-router-dom";
import { MakeOrder } from "../../services/Order/MakeOrder";

const OrderMaking = () => {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedVal, setSelectedVal] = useState(mapData[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [basketId, setBasketId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    GetActiveBasket()
      .then((res) => {
        setBasketId(res.data.basket.ID);
        setPrice(res.data.total_price);
        setProducts(res.data.basket.basket_contents);
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const options = mapData.map((el) => {
    return (
      <Option key={el.ID} value={el.ID}>
        {el.address}
      </Option>
    );
  });

  const onFinish = (values) => {
    values.basket_id = basketId;
    values.pharmacy_address_id = selectedVal.ID;
    message.loading("Заказ оформляется", 0);
    MakeOrder(values)
      .then(() => {
        setModalType("order");
        setVisible(true);

        setTimeout(() => {
          setModalType("");
          setVisible(false);
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        message.error("Произошла ошибка!");
      })
      .finally(() => message.destroy());
  };

  return (
    <>
      <div className={styles.orderMaking}>
        <div className={styles.orderMakingContainer}>
          <BreadcrumbComponent
            crumbs={[
              { path: "/", name: "Главная" },
              {
                path: "/catalog?category_id=1&sub_category=2",
                name: "Каталог",
              },
              { path: "/cart", name: "Корзина" },
              { path: "", name: "Оформление заказа" },
            ]}
          />
          <h2>Введите Ваши данные</h2>
        </div>
      </div>
      <Form className={styles.form} onFinish={onFinish}>
        <div className={styles.mainForm}>
          <div className={styles.mainFormItem}>
            <Form.Item
              name="surname"
              rules={[{ required: true, message: "Введите фамилию" }]}
            >
              <Input placeholder="Фамилия" className={styles.modalInput} />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[{ required: true, message: "Введите имя" }]}
            >
              <Input placeholder="Имя" className={styles.modalInput} />
            </Form.Item>

            <Form.Item
              name="patronymic"
              rules={[{ required: true, message: "Введите отчество" }]}
            >
              <Input placeholder="Отчество" className={styles.modalInput} />
            </Form.Item>

            <Form.Item
              name="phone_number"
              rules={[{ required: true, message: "Введите номер телефона" }]}
            >
              <Input placeholder="Телефон" className={styles.modalInput} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Не соответствует типу e-mail" },
              ]}
            >
              <Input placeholder="E-mail" className={styles.modalInput} />
            </Form.Item>
          </div>
          <div className={styles.mainFormItem}>
            <Select
              className={styles.select}
              defaultValue={1}
              onChange={(val) =>
                setSelectedVal(mapData.find((el) => el.ID === val))
              }
              placeholder="Выберите аптеку для доставки"
              allowClear
            >
              {options}
            </Select>
          </div>
        </div>
        <div className={styles.composition}>
          <div className={styles.compositionContainer}>
            <h2>Проверьте состав заказа</h2>
            <div className={styles.compGrid}>
              {loading ? (
                <Spin />
              ) : (
                products.map((el) => {
                  return (
                    <CardMini
                      key={el.product.ID}
                      id={el.product.ID}
                      isMyOrder={false}
                      pic={el.product.img_href}
                      title={el.product.name}
                      dose={el.product.dosage}
                      price={el.product.price}
                      quantity={el.count}
                    />
                  );
                })
              )}
            </div>
            <p>
              Итоговая стоимость заказа: <span>{price} ₽</span>
            </p>
            <div className={styles.compDeliver}>
              <h2>Мы доставим заказ сюда:</h2>
              <div className={styles.deliverDetails}>
                <div className={styles.deliverAdress}>
                  <img src={location} alt="location" />
                  <p>{selectedVal.address}</p>
                </div>
                <div className={styles.deliverAdress}>
                  <img src={time} alt="time" />
                  <p>{selectedVal.time}</p>
                </div>
              </div>
              <Button
                type="submit"
                width="228px"
                text="Оформить заказ"
                lineHeight="50px"
                fontSize="22px"
              />
            </div>
          </div>
        </div>
      </Form>
      <ModalCustom
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

export default OrderMaking;
