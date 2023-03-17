import React from "react";
import Header from "../Header/Header";
import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <Header type="footer" />
        <p className={styles.text}>Политика обработки персональных данных</p>
      </div>
    </footer>
  );
};

export default Footer;
  