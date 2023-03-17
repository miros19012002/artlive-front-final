import React from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const BreadcrumbComponent = ({ crumbs }) => {
  return (
    <Breadcrumb className={styles.breadcrumb} separator="/">
      {crumbs.map((el, index) => (
        <Breadcrumb.Item key={index} className={styles.breadcrumbItem}>
          {el.to !== "" ? <NavLink to={el.path}>{el.name}</NavLink> : el.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
