import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip, Dropdown, Drawer, Form } from 'antd';
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
import { UserForm, CategoryForm } from './';
import useLoading from '../hooks/use-loading';

interface EntityListProps {
  entity: string;
  columns: TableProps<any>['columns'];
}

const EntityList: React.FC<EntityListProps> = ({ entity, columns }) => {
  const [entities, setEntities] = useState<any[]>([]);
  const [entityCount, setEntityCount] = useState<number>(0);
  const title: string = `All ${toUpperCaseFirstLetter(entity)}s`;
  const modalApi = useModal();
  const {
    getAllEntities,
    deleteEntity,
    getEntityById,
    createEntity,
    editEntity,
  } = useEntity(entity);
  const { user } = useAuth();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEntityDetailDrawerOpen, setIsEntityDetailDrawerOpen] =
    useState<boolean>(false);
  const [isCreateEntityDrawerOpen, setIsCreateEntityDrawerOpen] =
    useState<boolean>(false);
  const [isEditEntityDrawerOpen, setIsEditEntityDrawerOpen] =
    useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<any>({});
  const { startLoading, endLoading } = useLoading();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const closeEditEntityDrawerOpen = () => {
    setIsEditEntityDrawerOpen(false);
    editForm.resetFields();
  };

  const showEditEntityDrawerOpen = async (entityId: number) => {
    setIsEditEntityDrawerOpen(true);
    const entity = await getEntityById(entityId);
    setSelectedEntity(entity);
  };

  const closeCreateEntityDrawerOpen = () => {
    setIsCreateEntityDrawerOpen(false);
    createForm.resetFields();
  };

  const showCreateEntityDrawerOpen = async () => {
    setIsCreateEntityDrawerOpen(true);
  };

  const closeEntityDetailDrawerOpen = () => {
    setIsEntityDetailDrawerOpen(false);
  };

  const showEntityDetailDrawerOpen = async (entityId: number) => {
    setIsEntityDetailDrawerOpen(true);
    const entity = await getEntityById(entityId);
    setSelectedEntity(entity);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const fetchAllEntities = async () => {
    const entites = await getAllEntities();
    setEntities(entites);
    setEntityCount(entites.length);
  };

  useEffect(() => {
    fetchAllEntities();
  }, []);

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
        startLoading();
        await deleteEntity(entityId);
        fetchAllEntities();
        endLoading();
      },
      okText: 'Delete',
      okType: 'danger',
      onCancel: () => {},
      cancelText: 'No',
    });
  };

  const showDeleteEntitiesModal = () => {
    modalApi.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete the selected rows?',
      onOk: async () => {
        await Promise.all(
          selectedRowKeys.map((key: React.Key) => deleteEntity(Number(key)))
        );
        fetchAllEntities();
        setSelectedRowKeys([]);
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
            onClick: () => showEntityDetailDrawerOpen(record.id),
          },
          {
            key: '2',
            label: `Edit this ${entity}`,
            icon: <EditOutlined />,
            onClick: () => showEditEntityDrawerOpen(record.id),
          },
          {
            key: '3',
            label: (
              <Tooltip
                title={`${user?.id === record.id ? 'You cannot delete yourself' : ''}`}
              >
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
              trigger={['click']}
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const handleCreateEntity = async (values: any) => {
    startLoading();
    console.log('Entity info to create: ', values);
    await createEntity(values);
    await fetchAllEntities();
    setIsCreateEntityDrawerOpen(false);
    endLoading();
  };

  const showConfirmEditEntityModal = (values: any) => {
    modalApi.confirm({
      title: 'Confirm Edit',
      content: `Are you sure you want to edit  this ${entity}?`,
      onOk: async () => {
        startLoading();
        await editEntity(selectedEntity.id, values);
        await fetchAllEntities();
        setIsEditEntityDrawerOpen(false);
        endLoading();
      },
      okText: 'Yes',
      onCancel: () => {},
      cancelText: 'No',
    });
  };

  const renderDrawerChildren = (type: string) => {
    switch (type) {
      case 'create':
        switch (entity) {
          case 'user':
            return <UserForm form={createForm} onFinish={handleCreateEntity} />;
          case 'categorie':
            return <CategoryForm onFinish={handleCreateEntity} />;
        }
        break;
      case 'view':
        switch (entity) {
          case 'user':
            return (
              <UserForm form={viewForm} isView initialValues={selectedEntity} />
            );
          case 'categorie':
            return <div>View category detail</div>;
        }
        break;
      case 'edit':
        switch (entity) {
          case 'user':
            return (
              <UserForm
                form={editForm}
                isEdit
                initialValues={selectedEntity}
                onFinish={showConfirmEditEntityModal}
              />
            );
          case 'categorie':
            return (
              <CategoryForm
                isEdit
                initialValues={selectedEntity}
                onFinish={showConfirmEditEntityModal}
              />
            );
        }
        break;
      default:
        return <div>Error during render drawer children</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg !p-4 shadow-lg">
      <div className="!mb-4 flex justify-between">
        <h2 className="text-xl font-bold">
          {title} {`(${entityCount})`}
        </h2>
        <div className="flex gap-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateEntityDrawerOpen}
          >
            Create {entity}
          </Button>
          <Tooltip
            title={
              selectedRowKeys.length === 0
                ? 'Select rows to delete'
                : 'Delete selected rows'
            }
          >
            <Button
              type="primary"
              disabled={selectedRowKeys.length === 0 ? true : false}
              danger
              onClick={showDeleteEntitiesModal}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      </div>
      {columns && (
        <Table<any>
          rowSelection={rowSelection}
          size="small"
          key={entities.length}
          columns={[...columns, ...actionColumns]}
          dataSource={entities}
        />
      )}

      <Drawer
        title={`${toUpperCaseFirstLetter(entity)} Detail`}
        onClose={closeEntityDetailDrawerOpen}
        open={isEntityDetailDrawerOpen}
      >
        {renderDrawerChildren('view')}
      </Drawer>

      <Drawer
        title={`Create ${toUpperCaseFirstLetter(entity)}`}
        onClose={closeCreateEntityDrawerOpen}
        open={isCreateEntityDrawerOpen}
      >
        {renderDrawerChildren('create')}
      </Drawer>

      <Drawer
        title={`Edit ${toUpperCaseFirstLetter(entity)}`}
        onClose={closeEditEntityDrawerOpen}
        open={isEditEntityDrawerOpen}
      >
        {renderDrawerChildren('edit')}
      </Drawer>
    </div>
  );
};

export default EntityList;
