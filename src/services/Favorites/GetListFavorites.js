import { privateAxiosInstance } from "../../api/api";

export const GetListFavorites = () => {
  return privateAxiosInstance.get("/favorites/list");
};
