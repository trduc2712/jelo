import React, { useEffect } from 'react';
import { UserForm } from '../../../components';
import { createUser } from '../../../api/user-api';
import { useNotification } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { UserForm as IUserForm, User } from '../../../interfaces/user';

const CreateUser: React.FC = () => {
  const notificationApi = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Edit User | Jelo';
  }, []);

  const handleCreateUser = async (userInfo: IUserForm) => {
    const data = await createUser(userInfo);
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

  const newUser: User = {
    id: 1,
    email: 'admin@example.com',
    name: 'John Doe',
    password: 'securepassword123',
    role: 'ADMIN',
  };

  return <UserForm onFinish={handleCreateUser} initialValues={newUser} />;
};

export default CreateUser;
