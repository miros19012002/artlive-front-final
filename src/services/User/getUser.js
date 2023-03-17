import { privateAxiosInstance } from "../../api/api";

export const getUser = () => {
  return privateAxiosInstance.get("/user/read");
};
