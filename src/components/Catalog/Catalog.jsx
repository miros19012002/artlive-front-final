import React, { useEffect, useState } from "react";
import { Popover, Row, Col } from "antd";
import { GetMainCategories } from "../../services/Catalog/GetMainGategories";
import classNames from "classnames";
import styles from "./Catalog.module.css";
import { useNavigate } from "react-router-dom";

const CatalogContent = ({ changeVisible }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetMainCategories().then((res) => {
      setCategories(res.data.filter((el) => el.name !== "Пустая категория"));
    });
  }, []);

  return (
    <div className={styles.catContainer}>
      <Row gutter={[20, 20]}>
        {categories.map((el) => {
          return (
            <Col key={el.ID} span={6}>
              <h3>{el.name}</h3>
              <Row>
                {el.categories.map((elem) => {
                  return (
                    <Col key={elem.ID} span={24}>
                      <p
                        onClick={() => {
                          changeVisible(false);
                          navigate(
                            `/catalog?category_id=${el.ID}&sub_category=${elem.ID}`
                          );
                        }}
                      >
                        {elem.name}
                      </p>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const Catalog = ({ type }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      align={15}
      placement={type === "header" ? "bottom" : "top"}
      content={<CatalogContent changeVisible={setVisible} />}
      trigger="click"
      style={{ cursor: "pointer" }}
      visible={visible}
      onVisibleChange={() => setVisible((prev) => !prev)}
      className={classNames(
        styles.items,
        type === "header" && styles.catalog,
        styles.link,

        type === "header" ? styles.blue : styles.white
      )}
    >
      Каталог
    </Popover>
  );
};

export default Catalog;
