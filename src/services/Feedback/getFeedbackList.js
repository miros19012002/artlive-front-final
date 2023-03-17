import { axiosInstance } from "../../api/api";

export const getFeedbackList = (pageId) => {
  return axiosInstance.get(`/feedback/list?page_id=${pageId}&page_size=6`);
};
