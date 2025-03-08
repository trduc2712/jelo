import React, { useEffect } from "react";
import { UserForm } from "../../../components";
import { createUser } from "../../../api/user-api";
import { uploadImageToCloudinary } from "../../../utils/upload";
import { useNotification } from "../../../hooks";

const CreateUser: React.FC = () => {
  const api = useNotification();

  useEffect(() => {
    document.title = "Create user | Jelo";
  }, []);

  const handleCreateUser = async (userInfo: any) => {
    const avatarUrl = await uploadImageToCloudinary(userInfo.avatar);
    const { avatar, ...restUserInfo } = userInfo;
    const newUserInfo = { ...restUserInfo, avatarUrl };

    const data = await createUser(newUserInfo);
    if (data && !data.statusCode) {
      api.success({
        message: "Success",
        description: data.message,
      });
    } else {
      api.error({
        message: "Error",
        description: data.message,
      });
    }
  };

  return (
    <div>
      <UserForm onFinish={handleCreateUser} />
    </div>
  );
};

export default CreateUser;
