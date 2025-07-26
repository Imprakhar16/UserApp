import axiosInstance from "../helper/axiosInterceptor";
import API_PATHS from "./apiPath";

const userFetch = async (pageNumber, pageSize) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.USER_LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw error || { message: "send verification link failed" };
  }
};

const userDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_PATHS.USER_LIST}/${id}`);
    return response.data;
  } catch (error) {
    throw error || { message: "can't get details of a a user" };
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.DELETE_USER}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
export const userServices = {
  userFetch: userFetch,
  userDetail: userDetail,
  deleteUser:deleteUser
};
