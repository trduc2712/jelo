import axiosInstance from './axios';

const createEntity = async (entity: string, entityInfo: any) => {
  const response = await axiosInstance.post(`${entity}s`, entityInfo);
  return response.data;
};

const getAllEntities = async (entity: string) => {
  const response = await axiosInstance.get(`${entity}s`);
  return response.data;
};

const getEntityById = async (entity: string, entityId: number) => {
  const response = await axiosInstance.get(`/${entity}s/${entityId}`);
  return response.data;
};

export const editEntity = async (
  entity: string,
  entityId: number,
  entityInfo: any
) => {
  let finalEntityInfo: any = entityInfo;
  if (entity === 'user') {
    const { email, ...userInfoWithoutEmail } = entityInfo;
    finalEntityInfo = userInfoWithoutEmail;
  }

  const response = await axiosInstance.put(
    `/${entity}s/${entityId}`,
    finalEntityInfo
  );
  return response.data;
};

const deleteEntityById = async (entity: string, entityId: number) => {
  const response = await axiosInstance.delete(`/${entity}s/${entityId}`);
  return response.data;
};

const getEntityCount = async (entity: string) => {
  const response = await axiosInstance.get(`${entity}s`);
  return response.data;
};

export const baseApi = {
  createEntity,
  getAllEntities,
  getEntityById,
  editEntity,
  deleteEntityById,
  getEntityCount,
};
