import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Tooltip, Drawer } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Breadcrumb, ProfileForm, AdminNavMenu } from './';

const { Header: AntHeader } = Layout;

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarVisible(false);
        onToggleSidebar();
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleShowProfileDrawer = () => {
    setIsProfileDrawerOpen(true);
  };

  const handleCloseProfileDrawer = () => {
    setIsProfileDrawerOpen(false);
  };

  const handleShowNavDrawer = () => {
    setIsNavDrawerOpen(true);
  };

  const handleCloseNavDrawer = () => {
    setIsNavDrawerOpen(false);
  };

  const handleClickMenuButton = () => {
    if (isSidebarVisible) {
      onToggleSidebar();
    } else {
      handleShowNavDrawer();
    }
  };

  return (
    <>
      <AntHeader className="sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tooltip title="Toggle sidebar">
            <Button icon={<MenuOutlined />} onClick={handleClickMenuButton} />
          </Tooltip>
          <Tooltip title="Go to previous page">
            <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack} />
          </Tooltip>
          <Breadcrumb />
        </div>
        <Tooltip title="Profile">
          <Button icon={<UserOutlined />} onClick={handleShowProfileDrawer} />
        </Tooltip>
      </AntHeader>
      <Drawer
        title="Profile"
        onClose={handleCloseProfileDrawer}
        open={isProfileDrawerOpen}>
        <ProfileForm />
      </Drawer>
      <Drawer
        onClose={handleCloseNavDrawer}
        open={isNavDrawerOpen}
        placement="left"
        styles={{
          header: { display: 'none' },
          body: { padding: 0, overflow: 'hidden' },
        }}
        width={200}
        getContainer={false}>
        <AdminNavMenu />
      </Drawer>
    </>
  );
};

export default AdminHeader;
