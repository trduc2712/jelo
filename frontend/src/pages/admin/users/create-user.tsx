import React, { useEffect } from 'react';
import { UserForm } from '../../../components';
import { createUser } from '../../../api/user-api';
import { uploadImage } from '../../../utils/cloudinary';
import { useNotification } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { UserForm as IUserForm } from '../../../interfaces/user';

const CreateUser: React.FC = () => {
  const notificationApi = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Create User | Jelo';
  }, []);

  const handleCreateUser = async (userInfo: IUserForm) => {
    const avatarUrl = userInfo.avatar ? await uploadImage(userInfo.avatar) : '';
    const { avatar, ...restUserInfo } = userInfo;
    const newUserInfo = { ...restUserInfo, avatarUrl };

    const data = await createUser(newUserInfo);
    if (data && !data.statusCode) {
      notificationApi.success({
        message: 'Success',
        description: data.message,
      });

      navigate('/admin/users');
    } else {
      notificationApi.error({
        message: 'Error',
        description: data.message,
      });
    }
  };

  return <UserForm onFinish={handleCreateUser} />;
};

export default CreateUser;
