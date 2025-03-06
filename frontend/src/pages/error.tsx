import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface ErrorProps {
  statusCode: number;
  message: string;
}

const Error: React.FC<ErrorProps> = ({ statusCode, message }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${statusCode} | Jelo`;
  }, []);

  return (
    <div className="font-[Arial] h-screen flex items-center justify-center flex-col gap-6">
      <span className="text-xl font-bold text-[#bb4d00]">
        {statusCode} | {message}
      </span>
      <Button type="primary" onClick={() => navigate("/")}>
        Return to home page
      </Button>
    </div>
  );
};

export default Error;
