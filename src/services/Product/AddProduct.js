import { privateAxiosInstance } from "../../api/api";

export const AddProduct = (basket, id) => {
  return privateAxiosInstance.get(
    `/content/create?product_id=${id}&basket_id=${basket}`
  );
};
