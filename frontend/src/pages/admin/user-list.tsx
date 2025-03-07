import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/user-api";
import { User } from "../../interfaces/user";
import { Table, Tag, Button } from "antd";
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
    render: (role) => (
      <Tag
        color={`${
          role === "ADMIN"
            ? "volcano"
            : role === "MODERATOR"
            ? "green"
            : "geekblue"
        }`}
      >
        {role}
      </Tag>
    ),
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <>
        <Button color="cyan" variant="outlined">
          Edit
        </Button>
        <Button danger className="!ml-4">
          Delete
        </Button>
      </>
    ),
  },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    document.title = "User list | Jelo ADMIN";

    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };

    fetchAllUsers();
  }, []);

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
