import axiosInstance from './axios';

export const getAllEntities = async (entity: string) => {
  const response = await axiosInstance.get(`${entity}s`);
  return response.data;
};

export const deleteEntityById = async (entity: string, entityId: number) => {
  const response = await axiosInstance.delete(`/${entity}s/${entityId}`);
  return response.data;
};
