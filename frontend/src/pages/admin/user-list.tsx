import React, { useEffect } from "react";

const UserList: React.FC = () => {
  useEffect(() => {
    document.title = "User list | JELO ADMIN";
  }, []);
  return (
    <>
      <span>User list</span>
    </>
  );
};

export default UserList;
