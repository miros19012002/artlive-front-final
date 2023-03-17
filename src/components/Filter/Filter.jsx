import React from "react";
import classNames from "classnames";
import styles from "./Filter.module.css";

const Filter = ({ name, onClick, category, id }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.filter,
        category === id && styles.filterActive
      )}
    >
      {name}
    </button>
  );
};

export default Filter;
