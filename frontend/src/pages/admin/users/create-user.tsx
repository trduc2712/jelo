import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../../../components';
import { UserForm as IUserForm } from '../../../interfaces/user';
import { useEntity } from '../../../hooks';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { createEntity } = useEntity('user');

  const handleCreateUser = async (values: IUserForm) => {
    await createEntity(values);
    navigate('/admin/users');
  };

  return <UserForm onFinish={handleCreateUser} />;
};

export default CreateUser;
