import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUserById } from "../../../api/user-api";
import { User } from "../../../interfaces/user";
import { Table, Tag, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useNotification, useModal } from "../../../hooks";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const api = useNotification();
  const modal = useModal();

  const fetchAllUsers = async () => {
    const data = await getAllUsers();
    setUsers(data.users);
  };

  useEffect(() => {
    document.title = "User List | Jelo ADMIN";
    fetchAllUsers();
  }, []);

  const openConfirmDeleteUserModal = (userId: number) => {
    modal.confirm({
      title: "Confirm delettion",
      content: `Are you sure you want to delete user with ID ${userId}?`,
      onOk: () => {
        handleDeleteUser(userId);
      },
      onCancel: () => {},
    });
  };

  const handleDeleteUser = async (userId: number) => {
    const data = await deleteUserById(userId);

    if (data && !data.statusCode) {
      api.success({
        message: "Success",
        description: data.message,
      });

      fetchAllUsers();
    } else {
      api.error({
        message: "Error",
        description: data.message,
      });
    }
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role) => <Tag>{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={`${status === "ACTIVE" ? "green" : "red"}`}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} />
          <Button
            className="!ml-4"
            icon={<DeleteOutlined />}
            onClick={() => openConfirmDeleteUserModal(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <Table<User>
      bordered
      columns={columns}
      dataSource={users.map((user) => ({ ...user, key: user.id }))}
    />
  );
};

export default UserList;
