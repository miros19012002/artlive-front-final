import { privateAxiosInstance } from "../../api/api";

export const createFeedback = (data) => {
  return privateAxiosInstance.post("feedback/create", data);
};
