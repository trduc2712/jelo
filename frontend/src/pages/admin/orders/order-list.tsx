import React from 'react';
import { User } from '../../../interfaces/user';
import type { TableProps } from 'antd';
import { EntityList } from '../../../components';

const Orders: React.FC = () => {
  const columns: TableProps<User>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
  ];

  return <EntityList entity="order" columns={columns} />;
};

export default Orders;
