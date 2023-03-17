import React from "react";
import moment from "moment";
import styles from "../Feedback/Feedback.module.css";

const Feedback = ({ nickname, date, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.nickname}>{nickname}</h3>
        <span className={styles.date}>{moment(date).format("DD.MM.YYYY")}</span>
      </div>
      <div>
        <p className={styles.feedbackText}>{text}</p>
      </div>
    </div>
  );
};

export default Feedback;
