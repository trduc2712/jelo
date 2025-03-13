import useNotification from './use-notification';
import { baseApi } from '../api/base-api';
import { uploadImage } from '../utils/cloudinary';

const useEntity = (entity: string) => {
  const notificationApi = useNotification();

  const processEntityInfo = async (entityInfo: any) => {
    if (entity !== 'user') return entityInfo;

    const avatarUrl = entityInfo.avatar
      ? await uploadImage(entityInfo.avatar).catch(() => '')
      : '';
    const { avatar, ...restInfo } = entityInfo;
    return { ...restInfo, avatarUrl };
  };

  const handleResponse = (resData: any) => {
    if (resData && !resData.statusCode) {
      notificationApi.success({
        message: 'Success',
        description: resData.message,
      });
    } else {
      notificationApi.error({
        message: 'Error',
        description: resData.message,
      });
    }
  };

  const createEntity = async (entityInfo: any) => {
    let finalEntityInfo: any = await processEntityInfo(entityInfo);
    const resData = await baseApi.createEntity(entity, finalEntityInfo);
    handleResponse(resData);
  };

  const editEntity = async (entityId: number, entityInfo: any) => {
    let finalEntityInfo: any = await processEntityInfo(entityInfo);
    const resData = await baseApi.editEntity(entity, entityId, finalEntityInfo);
    handleResponse(resData);
  };

  const getEntityById = async (entityId: number) => {
    const resData = await baseApi.getEntityById(entity, entityId);
    return resData[entity];
  };

  const getAllEntities = async () => {
    const resData = await baseApi.getAllEntities(entity);
    let entities: any[] = resData[`${entity}s`];
    entities = entities.map((entity) => ({ ...entity, key: entity.id }));
    return entities;
  };

  const deleteEntity = async (entityId: number) => {
    const resData = await baseApi.deleteEntityById(entity, entityId);
    handleResponse(resData);
  };

  const getEntityCount = async () => {
    const resData = await baseApi.getAllEntities(entity);
    return resData.meta.total;
  };

  return {
    createEntity,
    getAllEntities,
    getEntityById,
    deleteEntity,
    getEntityCount,
    editEntity,
  };
};

export default useEntity;
