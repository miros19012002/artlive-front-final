import React from "react";
import Empty from "../../components/Empty/Empty";
import empty from "../../assets/images/not_found/404.png";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header type="header" />
      <div className={styles.notFound}>
        <Empty
          isBtn={true}
          empty={empty}
          text="Что-то пошло не так..."
          btnText="Вернуться на главную"
          btnWidth="285px"
          lineHeightBtn="50px"
          onClickBtn={() => navigate("/")}
        />
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
