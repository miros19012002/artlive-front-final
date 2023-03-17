import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateBasket } from "../../services/Basket/UpdateBasket";
import basket from "../../assets/images/cart/basket.png";
import styles from "./CardVertical.module.css";
import { DeleteProduct } from "../../services/Product/DeleteProduct";

const CardVertical = ({
  pic,
  title,
  dose,
  nums,
  setClick,
  price,
  id,
  basketContentId,
  basketId,
}) => {
  const navigate = useNavigate();

  console.log(price);
  console.log(nums);

  const countTotal = useMemo(() => {
    return nums * price;
  }, [nums, price]);

  return (
    <>
      <div className={styles.cardMini}>
        <img onClick={() => navigate(`/product/${id}`)} src={pic} alt="text" />
        <div className={styles.main}>
          <h3 onClick={() => navigate(`/product/${id}`)}>{title}</h3>
          <span>{dose}</span>
        </div>
        <span className={styles.price}>{price} ₽</span>
        <div className={styles.counter}>
          <button
            className={styles.counterBtn}
            onClick={() => {
              if (nums > 0) {
                nums = nums - 1;
                UpdateBasket(basketContentId, nums).then(() => {
                  setClick((prev) => !prev);
                });
              }
            }}
          >
            -
          </button>
          <span className={styles.counterText}>{nums}</span>
          <button
            className={styles.counterBtn}
            onClick={() => {
              nums = nums + 1;
              UpdateBasket(basketContentId, nums).then(() => {
                setClick((prev) => !prev);
              });
            }}
          >
            +
          </button>
        </div>
        <span className={styles.amount}>{countTotal} ₽</span>
        <button
          className={styles.amounTrash}
          onClick={() =>
            DeleteProduct(basketContentId, basketId).then(() =>
              setClick((prev) => !prev)
            )
          }
        >
          <img src={basket} alt="basket" />
        </button>
      </div>
    </>
  );
};

export default CardVertical;
