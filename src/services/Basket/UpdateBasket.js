import { privateAxiosInstance } from "../../api/api";

export const UpdateBasket = (id, count) => {
  return privateAxiosInstance.put(`/content/update/${id}`, { count: count });
};
