import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserForm } from '../../../components';
import { useEntity } from '../../../hooks';
import { User } from '../../../interfaces/user';

const UserDetail: React.FC = () => {
  const { userId } = useParams();
  const { getEntityById } = useEntity('user');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserById = async (userId: number) => {
      const user: any = await getEntityById(userId);
      setUser(user);
    };

    getUserById(Number(userId));
  }, []);

  return <UserForm isView initialValues={user} />;
};

export default UserDetail;
