import React, { useEffect } from "react";
import { UserForm } from "../../../components";
import axios from "axios";

const CreateUser: React.FC = () => {
  useEffect(() => {
    document.title = "Create user | Jelo";
  }, []);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.log("Error uploading image to Cloudinary:", error);
    }
  };

  const handleCreateUser = async (userInfo: any) => {
    const avatarUrl = await uploadImageToCloudinary(userInfo.avatar);
  };

  return (
    <div>
      <UserForm onFinish={handleCreateUser} />
    </div>
  );
};

export default CreateUser;
