import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUserById } from "../../../api/user-api";
import { User } from "../../../interfaces/user";
import { Table, Tag, Button, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useNotification, useModal } from "../../../hooks";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const notificationApi = useNotification();
  const modalApi = useModal();

  const fetchAllUsers = async () => {
    const data = await getAllUsers();
    let users: User[] = data.users;
    users = users.map((user) => ({ ...user, key: user.id }));
    setUsers(users);
  };

  useEffect(() => {
    document.title = "User List | Jelo Admin";
    fetchAllUsers();
  }, []);

  const openConfirmDeleteUserModal = (userId: number) => {
    modalApi.confirm({
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
      notificationApi.success({
        message: "Success",
        description: data.message,
      });

      fetchAllUsers();
    } else {
      notificationApi.error({
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
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatar",
      render: (avatarUrl) => (
        <div className="w-[50px] h-[50px]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User's avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <Avatar icon={<UserOutlined />} shape="square" size={50} />
          )}
        </div>
      ),
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

  return <Table<User> columns={columns} dataSource={users} />;
};

export default UserList;
