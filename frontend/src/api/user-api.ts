import axiosInstance from "./axios";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.users;
};
