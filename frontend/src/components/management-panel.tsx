import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import { toUpperCaseFirstLetter } from '../utils/string';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteEntityById, getAllEntities } from '../api/base-api';
import { useModal, useNotification, useAuth } from '../hooks';

interface ManagementPanelProps {
  entity: string;
  columns: TableProps<any>['columns'];
}

const ManagementPanel: React.FC<ManagementPanelProps> = ({
  entity,
  columns,
}) => {
  const [data, setData] = useState<any[]>([]);
  const title: string = `All ${toUpperCaseFirstLetter(entity)}s`;
  const modalApi = useModal();
  const notificationApi = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    document.title = `${toUpperCaseFirstLetter(entity)} Management | Jelo Admin`;
  }, []);

  useEffect(() => {
    fetchAllEntities();
  }, [data]);

  const fetchAllEntities = async () => {
    const dataFromApi = await getAllEntities(entity);
    let data: any[] = dataFromApi[`${entity}s`];
    data = data.map(data => ({ ...data, key: data.id }));
    setData(data);
  };

  const renderDeleteUserButton = (userId: number) => {
    const isCurrentUser = user?.id === userId;

    return (
      <Tooltip
        title={`${isCurrentUser ? 'You cannot delete yourself' : ''}`}
        color="red">
        <Button
          className="!ml-4"
          disabled={isCurrentUser}
          icon={<DeleteOutlined />}
          onClick={() => openConfirmDeleteModal(userId)}
        />
      </Tooltip>
    );
  };

  const openConfirmDeleteModal = (entityId: number) => {
    modalApi.confirm({
      title: 'Confirm deletion',
      content: `Are you sure you want to delete this ${entity}?`,
      onOk: () => {
        handleDeleteEntity(entityId);
        fetchAllEntities();
      },
      onCancel: () => {},
    });
  };

  const handleDeleteEntity = async (entityId: number) => {
    const data = await deleteEntityById(entity, entityId);

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

  const actionColumns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-4">
          <Button icon={<EditOutlined />} />
          {entity === 'user' ? (
            renderDeleteUserButton(record.id)
          ) : (
            <Button
              icon={<DeleteOutlined />}
              onClick={() => openConfirmDeleteModal(record.id)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="!mb-4 flex justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-4">
          <Button>Filter</Button>
          <Button type="primary">
            Create {toUpperCaseFirstLetter(entity)}
          </Button>
        </div>
      </div>
      {columns && (
        <Table<any>
          columns={[...columns, ...actionColumns]}
          dataSource={data}
        />
      )}
    </>
  );
};

export default ManagementPanel;
