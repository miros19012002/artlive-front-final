import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import CardAdmin from "../../components/CardAdmin/CardAdmin";
import ModalCustom from "../../components/Modal/Modal";
import { GetAllOrders } from "../../services/Order/Admin/GetAllOrders";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/reducers/AuthReducer";
import empty from "../../assets/images/admin/empty_admin.png";
import back from "../../assets/images/admin/admin_back.png";
import Empty from "../../components/Empty/Empty";
import styles from "./Admin.module.css";
import { Spin } from "antd";

const Admin = () => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [click, setClick] = useState(false);
  const [id, setId] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const { data } = await GetAllOrders();
      console.log(data);
      const orderArr = data.map((el) => {
        return (
          el.products !== null && [
            ...el.products.map((elem) => {
              return {
                id: el.id,
                count: elem.count,
                data: elem.product,
                status: el.status,
                name: el.name,
                surname: el.surname,
                address: el.pharmacy_address.address,
              };
            }),
          ]
        );
      });

      const filteredOrders = orderArr.filter((el) => Array.isArray(el));

      setProducts(filteredOrders.flat());
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [click]);

  const exit = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <div className={styles.admin}>
        <div className={styles.adminContainer}>
          <div className={styles.adminHeader}>
            <Logo metaType="true" />
            <svg
              onClick={exit}
              className={styles.nickSvg}
              width="31"
              height="25"
              viewBox="0 0 31 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.blueSvgSec}
                d="M25.501 6.69341C25.2079 6.40829 24.6641 6.37274 24.3292 6.62207C23.9943 6.87165 23.9526 7.33474 24.2454 7.61989L28.3049 11.6469H15.917C15.4566 11.6469 15.0801 11.9675 15.0801 12.3595C15.0801 12.7515 15.4567 13.0722 15.917 13.0722H28.3049L24.2454 17.0992C23.9523 17.3843 23.9943 17.8477 24.3292 18.097C24.4965 18.2039 24.664 18.2752 24.8733 18.2752C25.1244 18.2752 25.3337 18.2039 25.501 18.0257L30.7741 12.8226C31.0252 12.5375 31.0252 12.1455 30.7741 11.8961L25.501 6.69341Z"
                fill="#001732"
              />
              <path
                className={styles.blueSvgSec}
                d="M11.8719 24.247V24.25H12.1219C16.7639 24.25 20.9213 21.365 22.6859 16.9707L22.687 16.9679C22.8771 16.4775 22.6464 15.8851 22.1531 15.6819L22.1531 15.6819C21.6622 15.4797 21.0841 15.7303 20.8896 16.229C19.4138 19.8839 15.9755 22.266 12.122 22.266C6.90299 22.266 2.65197 17.8962 2.65197 12.4999C2.65197 7.10346 6.90318 2.73391 12.122 2.73391C15.9752 2.73391 19.4135 5.11561 20.8894 8.8077C21.0837 9.30664 21.6623 9.55739 22.1531 9.35521C22.6464 9.15209 22.8772 8.55929 22.687 8.06917L22.6862 8.06713C20.9219 3.63553 16.7643 0.75 12.1219 0.75C5.8207 0.75 0.711914 6.02545 0.711914 12.4999C0.711914 18.8885 5.68625 24.1097 11.8719 24.247Z"
                fill="#001732"
                stroke="#001732"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <h2>Заказы</h2>
          {loading ? (
            <Spin />
          ) : (
            <div className={styles.adminGrid}>
              {products.length ? (
                products.map((el, index) => {
                  return (
                    <CardAdmin
                      onClick={() => {
                        setId(el.id);
                        setModalType("status");
                        setVisible(true);
                      }}
                      key={index}
                      pic={el.data.img_href}
                      title={el.data.name}
                      dose={el.data.dosage}
                      date={el.data.CreatedAt}
                      name={el.name}
                      surname={el.surname}
                      address={el.address}
                      status={el.status}
                      price={el.data.price}
                      quantity={el.count}
                    />
                  );
                })
              ) : (
                <Empty empty={empty} text="Еще не было ни одного заказа" />
              )}
            </div>
          )}
        </div>
        <img src={back} alt="back" />
      </div>
      <ModalCustom
        closeModal={() => {
          setModalType("");
          setVisible(false);
        }}
        visible={visible}
        type={modalType}
        basketId={id}
        setClick={setClick}
        switchType={setModalType}
        onCancel={() => {
          setModalType("");
          setVisible(false);
        }}
      />
    </>
  );
};

export default Admin;
