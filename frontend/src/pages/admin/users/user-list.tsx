import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../api/user-api";
import { User } from "../../../interfaces/user";
import { Table, Tag, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

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
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
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
    render: () => (
      <>
        <Button icon={<EditOutlined />} />
        <Button className="!ml-4" icon={<DeleteOutlined />} />
      </>
    ),
  },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    document.title = "User list | Jelo ADMIN";

    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setUsers(data.users);
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      <Table<User>
        bordered
        columns={columns}
        dataSource={users.map((user) => ({ ...user, key: user.id }))}
      />
    </>
  );
};

export default UserList;
