import React from 'react';
import { User } from '../../../interfaces/user';
import type { TableProps } from 'antd';
import { EntityList } from '../../../components';

const Categories: React.FC = () => {
  const columns: TableProps<User>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return <EntityList entity="categorie" columns={columns} />;
};

export default Categories;
