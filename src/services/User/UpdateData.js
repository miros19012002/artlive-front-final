import { privateAxiosInstance } from "../../api/api";

export const UpdateData = (data) => {
  return privateAxiosInstance.put("/user/update", data);
};
