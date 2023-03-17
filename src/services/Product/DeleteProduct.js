import { privateAxiosInstance } from "../../api/api";

export const DeleteProduct = (productId, basketId) => {
  return privateAxiosInstance.delete(
    `/content/delete/${productId}?basket_id=${basketId}`
  );
};
