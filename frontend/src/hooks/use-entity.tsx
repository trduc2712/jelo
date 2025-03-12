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

  const handleResponse = (data: any) => {
    if (data && !data.statusCode) {
      notificationApi.success({
        message: 'Success',
        description: data.message,
      });
    } else {
      notificationApi.error({
        message: 'Error',
        description: data.message,
      });
    }
  };

  const createEntity = async (entityInfo: any) => {
    let finalEntityInfo: any = await processEntityInfo(entityInfo);
    const data = await baseApi.createEntity(entity, finalEntityInfo);
    handleResponse(data);
  };

  const editEntity = async (entityId: number, entityInfo: any) => {
    let finalEntityInfo: any = await processEntityInfo(entityInfo);
    const data = await baseApi.editEntity(entity, entityId, finalEntityInfo);
    handleResponse(data);
  };

  const getEntityById = async (entityId: number) => {
    const data = await baseApi.getEntityById(entity, entityId);
    return data[entity];
  };

  const getAllEntities = async () => {
    const data = await baseApi.getAllEntities(entity);
    let entities: any[] = data[`${entity}s`];
    entities = entities.map((entity) => ({ ...entity, key: entity.id }));
    return entities;
  };

  const deleteEntity = async (entityId: number) => {
    const data = await baseApi.deleteEntityById(entity, entityId);
    handleResponse(data);
  };

  const getEntityCount = async () => {
    const data = await baseApi.getAllEntities(entity);
    return data.meta.total;
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
