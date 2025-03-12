import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Tooltip, Dropdown } from 'antd';
import type { TableProps, MenuProps } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useModal, useAuth, useEntity } from '../hooks';
import { toUpperCaseFirstLetter } from '../utils/string';

interface EntityListProps {
  entity: string;
  columns: TableProps<any>['columns'];
}

const EntityList: React.FC<EntityListProps> = ({ entity, columns }) => {
  useEffect(() => {
    fetchAllEntities();
  }, []);
  const navigate = useNavigate();

  const [entities, setEntities] = useState<any[]>([]);
  const [entityCount, setEntityCount] = useState<number>(0);
  const title: string = `All ${toUpperCaseFirstLetter(entity)}s`;

  const modalApi = useModal();
  const { getAllEntities, deleteEntity } = useEntity(entity);
  const { user } = useAuth();

  const fetchAllEntities = async () => {
    const entites = await getAllEntities();
    setEntities(entites);
    setEntityCount(entites.length);
  };

  useEffect(() => {
    if (entity) {
      fetchAllEntities();
    }
  }, [entity]);

  const showDeleteEntityModal = (entityId: number) => {
    modalApi.confirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete this ${entity}?`,
      onOk: async () => {
        await deleteEntity(entityId);
        fetchAllEntities();
      },
      okText: 'Delete',
      okType: 'danger',
      onCancel: () => {},
      cancelText: 'No',
    });
  };

  const actionColumns = [
    {
      key: 'actions',
      width: 30,
      render: (_: any, record: any) => {
        const dropdownActionItems: MenuProps['items'] = [
          {
            key: '1',
            label: `View details`,
            icon: <EyeOutlined />,
            onClick: () => navigate(`/admin/${entity}s/${record.id}`),
          },
          {
            key: '2',
            label: `Edit this ${entity}`,
            icon: <EditOutlined />,
            onClick: () => navigate(`/admin/${entity}s/edit/${record.id}`),
          },
          {
            key: '3',
            label: (
              <Tooltip
                title={`${user?.id === record.id ? 'You cannot delete yourself' : ''}`}>
                {`Delete this ${entity}`}
              </Tooltip>
            ),
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => showDeleteEntityModal(record.id),
            disabled: user?.id === record.id ? true : false,
          },
        ];

        return (
          <div className="flex justify-center">
            <Dropdown
              menu={{ items: dropdownActionItems }}
              placement="bottomLeft"
              trigger={['click']}>
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="!mb-4 flex justify-between">
        <h2 className="text-xl font-bold">
          {title} {`(${entityCount})`}
        </h2>
        <div className="flex gap-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(`/admin/${entity}s/new`)}>
            Create {entity}
          </Button>
        </div>
      </div>
      {columns && (
        <Table<any>
          size="middle"
          key={entities.length}
          columns={[...columns, ...actionColumns]}
          dataSource={entities}
        />
      )}
    </>
  );
};

export default EntityList;
