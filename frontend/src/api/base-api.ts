import axiosClient from './axios-client';

const createEntity = async (entity: string, entityInfo: any) => {
  const res = await axiosClient.post(`${entity}s`, entityInfo);
  return res.data;
};

const getAllEntities = async (entity: string) => {
  const res = await axiosClient.get(`${entity}s`);
  return res.data;
};

const getEntityById = async (entity: string, entityId: number) => {
  const res = await axiosClient.get(`/${entity}s/${entityId}`);
  return res.data;
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

  const res = await axiosClient.put(`/${entity}s/${entityId}`, finalEntityInfo);
  return res.data;
};

const deleteEntityById = async (entity: string, entityId: number) => {
  const res = await axiosClient.delete(`/${entity}s/${entityId}`);
  return res.data;
};

const getEntityCount = async (entity: string) => {
  const res = await axiosClient.get(`${entity}s`);
  return res.data;
};

export const baseApi = {
  createEntity,
  getAllEntities,
  getEntityById,
  editEntity,
  deleteEntityById,
  getEntityCount,
};
