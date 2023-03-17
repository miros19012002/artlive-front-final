import { privateAxiosInstance } from "../../api/api";

export const AddToFavorites = (id) => {
  return privateAxiosInstance.get(`/favorites/create?product_id=${id}`);
};
