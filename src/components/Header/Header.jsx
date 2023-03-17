import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/User/getUser";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import classNames from "classnames";
import ModalCustom from "../Modal/Modal";
import { logOut } from "../../store/reducers/AuthReducer";
import { Badge } from "antd";
import Catalog from "../Catalog/Catalog";
import { anchorEvent } from "../../utils/anchorEvent";
import { GetActiveBasket } from "../../services/Basket/GetActiveBasket";
import styles from "../../components/Header/Header.module.css";
import { GetListFavorites } from "../../services/Favorites/GetListFavorites";

const Header = ({ type }) => {
  const [modalType, setModalType] = useState("");
  const [visible, setVisible] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [basketCount, setBasketCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      getUser().then((res) => {
        setUserName(res.data.login);
      });

      GetActiveBasket().then((res) =>
        setBasketCount(res.data.basket.basket_contents.length)
      );

      GetListFavorites().then((res) => setFavCount(res.data.length));
    } else {
      setBasketCount(0);
      setFavCount(0);
    }
  }, [isAuth]);

  const exit = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          <Logo type={type} />
          <nav className={styles.menu}>
            <ul className={styles.list}>
              <li
                className={classNames(
                  styles.link,
                  styles.items,
                  type === "header" ? styles.blue : styles.white
                )}
              >
                <Catalog type={type} />
              </li>

              <li
                onClick={() => anchorEvent("about", navigate)}
                className={classNames(
                  styles.link,
                  styles.items,
                  type === "header" ? styles.blue : styles.white
                )}
              >
                О нас
              </li>
              <li
                onClick={() => anchorEvent("feed", navigate)}
                className={classNames(
                  styles.link,
                  styles.items,
                  type === "header" ? styles.blue : styles.white
                )}
              >
                Отзывы
              </li>
              <li
                onClick={() => anchorEvent("contact", navigate)}
                className={classNames(
                  styles.link,
                  styles.items,
                  type === "header" ? styles.blue : styles.white
                )}
              >
                Контакты
              </li>
            </ul>
          </nav>
          {type === "header" && (
            <nav className={styles.profile}>
              <ul className={styles.profileList}>
                <li
                  className={styles.profileItems}
                  onClick={() => {
                    setModalType(!isAuth && "auth");
                    setVisible(!isAuth && true);
                    navigate(isAuth && "/favourites");
                  }}
                >
                  <NavLink to="" className={styles.profileLink}>
                    <Badge
                      count={favCount}
                      showZero
                      size="small"
                      color="#AC4C58"
                      offset={[0, 15]}
                    >
                      <svg
                        width="19"
                        height="17"
                        viewBox="0 0 19 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.50189 17L16.4339 10.1484C18.6307 7.97709 19.4737 5.48438 18.7424 3.31312C18.1558 1.56903 16.643 0.317915 14.7954 0.0526698C12.867 -0.224371 10.9719 0.59955 9.49952 2.33433C8.02949 0.602023 6.13435 -0.224186 4.2036 0.0526698C2.35355 0.317919 0.84077 1.56903 0.256684 3.31312C-0.472353 5.48668 0.368335 7.97713 2.56512 10.1484L9.50189 17ZM1.38457 3.67905C1.82871 2.35756 2.97572 1.41147 4.37684 1.20977C4.56204 1.1839 4.74493 1.16981 4.93014 1.16981C6.431 1.16981 7.89391 2.04301 9.01488 3.62979L9.50172 4.31763L9.98628 3.62996C11.2449 1.84835 12.9358 0.968114 14.6244 1.20997C16.0281 1.41185 17.1751 2.35776 17.6167 3.67925C18.201 5.4163 17.4623 7.4725 15.5934 9.31739L9.50189 15.3428L3.40574 9.31949C1.5391 7.47208 0.80061 5.41588 1.38491 3.67883L1.38457 3.67905Z"
                          fill="#BE9C84"
                        />
                      </svg>
                    </Badge>
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    setModalType(!isAuth && "auth");
                    setVisible(!isAuth && true);
                    navigate(isAuth && "/cart");
                  }}
                  className={styles.profileItems}
                >
                  <NavLink to="" className={styles.profileLink}>
                    <Badge
                      showZero
                      count={basketCount}
                      size="small"
                      color="#AC4C58"
                      offset={[-3, 19]}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 9H17.21L12.83 2.44C12.64 2.16 12.32 2 12 2C11.68 2 11.36 2.16 11.17 2.45L6.79 9H2C1.45 9 1 9.45 1 10C1 10.09 1 10.18 1.04 10.27L3.58 19.54C3.81 20.38 4.58 21 5.5 21H18.5C19.42 21 20.19 20.38 20.43 19.54L22.97 10.27L23 10C23 9.45 22.55 9 22 9ZM12 4.8L14.8 9H9.2L12 4.8ZM18.5 19H5.5L3.31 11H20.7L18.5 19ZM12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13Z"
                          fill="#BE9C84"
                        />
                      </svg>
                    </Badge>
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
          <div className={styles.buttons}>
            {!isAuth ? (
              <>
                <Button
                  onClick={() => {
                    setModalType("auth");
                    setVisible(true);
                  }}
                  type="submit"
                  width="70px"
                  text="Войти"
                  lineHeight="30px"
                  margin="0 15px 0 0"
                  white={true}
                />
                <Button
                  onClick={() => {
                    setModalType("reg");
                    setVisible(true);
                  }}
                  type="submit"
                  width="120px"
                  text="Регистрация"
                  lineHeight="30px"
                />
              </>
            ) : (
              <>
                <div className={styles.account}>
                  <NavLink
                    to="/account"
                    className={classNames(
                      styles.nickname,
                      type === "header" ? styles.blue : styles.white
                    )}
                  >
                    {userName}
                  </NavLink>

                  <svg
                    onClick={() => navigate("/account")}
                    className={styles.nickSvg}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className={
                        type === "header"
                          ? styles.blueSvgFirst
                          : styles.whiteSvgFirst
                      }
                      d="M13 0.5C11.3585 0.5 9.73303 0.823322 8.21646 1.45151C6.69989 2.07969 5.3219 3.00043 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C5.3219 22.9996 6.69989 23.9203 8.21646 24.5485C9.73303 25.1767 11.3585 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 11.3585 25.1767 9.73303 24.5485 8.21646C23.9203 6.69989 22.9996 5.3219 21.8388 4.16117C20.6781 3.00043 19.3001 2.07969 17.7835 1.45151C16.267 0.823322 14.6415 0.5 13 0.5V0.5ZM6.8375 20.85C7.375 19.725 10.65 18.625 13 18.625C15.35 18.625 18.625 19.725 19.1625 20.85C17.4625 22.2 15.325 23 13 23C10.675 23 8.5375 22.2 6.8375 20.85ZM20.95 19.0375C19.1625 16.8625 14.825 16.125 13 16.125C11.175 16.125 6.8375 16.8625 5.05 19.0375C3.775 17.375 3 15.275 3 13C3 7.4875 7.4875 3 13 3C18.5125 3 23 7.4875 23 13C23 15.275 22.225 17.375 20.95 19.0375ZM13 5.5C10.575 5.5 8.625 7.45 8.625 9.875C8.625 12.3 10.575 14.25 13 14.25C15.425 14.25 17.375 12.3 17.375 9.875C17.375 7.45 15.425 5.5 13 5.5ZM13 11.75C12.5027 11.75 12.0258 11.5525 11.6742 11.2008C11.3225 10.8492 11.125 10.3723 11.125 9.875C11.125 9.37772 11.3225 8.90081 11.6742 8.54917C12.0258 8.19754 12.5027 8 13 8C13.4973 8 13.9742 8.19754 14.3258 8.54917C14.6775 8.90081 14.875 9.37772 14.875 9.875C14.875 10.3723 14.6775 10.8492 14.3258 11.2008C13.9742 11.5525 13.4973 11.75 13 11.75Z"
                    />
                  </svg>

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
                      className={
                        type === "header"
                          ? styles.blueSvgSec
                          : styles.whiteSvgSec
                      }
                      d="M25.501 6.69341C25.2079 6.40829 24.6641 6.37274 24.3292 6.62207C23.9943 6.87165 23.9526 7.33474 24.2454 7.61989L28.3049 11.6469H15.917C15.4566 11.6469 15.0801 11.9675 15.0801 12.3595C15.0801 12.7515 15.4567 13.0722 15.917 13.0722H28.3049L24.2454 17.0992C23.9523 17.3843 23.9943 17.8477 24.3292 18.097C24.4965 18.2039 24.664 18.2752 24.8733 18.2752C25.1244 18.2752 25.3337 18.2039 25.501 18.0257L30.7741 12.8226C31.0252 12.5375 31.0252 12.1455 30.7741 11.8961L25.501 6.69341Z"
                      fill="#001732"
                    />
                    <path
                      className={
                        type === "header"
                          ? styles.blueSvgSec
                          : styles.whiteSvgSec
                      }
                      d="M11.8719 24.247V24.25H12.1219C16.7639 24.25 20.9213 21.365 22.6859 16.9707L22.687 16.9679C22.8771 16.4775 22.6464 15.8851 22.1531 15.6819L22.1531 15.6819C21.6622 15.4797 21.0841 15.7303 20.8896 16.229C19.4138 19.8839 15.9755 22.266 12.122 22.266C6.90299 22.266 2.65197 17.8962 2.65197 12.4999C2.65197 7.10346 6.90318 2.73391 12.122 2.73391C15.9752 2.73391 19.4135 5.11561 20.8894 8.8077C21.0837 9.30664 21.6623 9.55739 22.1531 9.35521C22.6464 9.15209 22.8772 8.55929 22.687 8.06917L22.6862 8.06713C20.9219 3.63553 16.7643 0.75 12.1219 0.75C5.8207 0.75 0.711914 6.02545 0.711914 12.4999C0.711914 18.8885 5.68625 24.1097 11.8719 24.247Z"
                      fill="#001732"
                      stroke="#001732"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
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

export default Header;
