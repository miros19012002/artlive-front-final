import { privateAxiosInstance } from "../../api/api";

export const DeleteFavorite = (id) => {
  return privateAxiosInstance.delete(`/favorites/delete/${id}`);
};
