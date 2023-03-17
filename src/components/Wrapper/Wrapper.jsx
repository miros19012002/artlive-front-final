import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MemoContacts from "../ContactsMap/ContactsMap";
import styles from "./Wrapper.module.css";

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header type="header" />
      <div className={styles.wrapperContainer}>{children}</div>
      <div className={styles.contacts} id="contact">
        <div className={styles.contactsContainer}>
          <h2 className={styles.commonTitle}>Контакты</h2>
          <MemoContacts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
