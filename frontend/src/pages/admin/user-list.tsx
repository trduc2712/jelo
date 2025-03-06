import React, { useEffect } from "react";

const UserList: React.FC = () => {
  useEffect(() => {
    document.title = "User list | Jelo ADMIN";
  }, []);
  return (
    <>
      <span>User list</span>
    </>
  );
};

export default UserList;
