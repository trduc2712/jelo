import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";

type BreadcrumbProps = {
  className?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  const breadcrumbItems = [
    {
      title: "Admin Panel",
    },
    {
      title: "User List",
    },
  ];
  return (
    <div>
      <AntBreadcrumb items={breadcrumbItems} className={className} />
    </div>
  );
};

export default Breadcrumb;
