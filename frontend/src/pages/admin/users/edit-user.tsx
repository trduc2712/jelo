import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserForm } from '../../../components';
import { User } from '../../../interfaces/user';
import { useEntity } from '../../../hooks';

const EditUser: React.FC = () => {
  const { userId } = useParams();
  const { getEntityById, editEntity } = useEntity('user');
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async (userId: number) => {
      const user: any = await getEntityById(userId);
      setUser(user);
    };

    getUserById(Number(userId));
  }, []);

  const handleEditUser = async (values: User) => {
    await editEntity(Number(userId), values);
    // navigate('/admin/users');
  };

  return <UserForm isEdit initialValues={user} onFinish={handleEditUser} />;
};

export default EditUser;
