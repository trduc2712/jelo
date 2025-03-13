import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Tooltip, Drawer, Avatar, Dropdown } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Breadcrumb, ProfileForm, AdminNavMenu } from '.';
import { useAuth, useModal } from '../hooks';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] =
    useState<boolean>(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | undefined>('');
  const { user, logout } = useAuth();
  const modalApi = useModal();
  const navigate = useNavigate();

  const showConfirmLogoutModal = () => {
    modalApi.confirm({
      title: 'Confirm Logout',
      content: `Are you sure you want to log out?`,
      onOk: () => logout(),
      okText: 'Log out',
      okType: 'danger',
      onCancel: () => {},
      cancelText: 'No',
    });
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'View profile',
      icon: <ProfileOutlined />,
    },
    {
      key: '2',
      label: 'Second item',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Log out',
      onClick: showConfirmLogoutModal,
    },
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user) {
      setUserAvatarUrl(user.avatarUrl);
    }
  }, [user]);

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
      <AntHeader className="shadow-sm sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tooltip title="Toggle sidebar">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={handleClickMenuButton}
            />
          </Tooltip>
          <Tooltip title="Go to previous page">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
            />
          </Tooltip>
          <Breadcrumb />
        </div>
        <Dropdown menu={{ items: dropdownItems }}>
          <div className="flex gap-2 items-center cursor-pointer">
            <Avatar
              src={userAvatarUrl}
              icon={<UserOutlined />}
              onClick={handleShowProfileDrawer}
            />
            <span className="font-semibold">{user?.name}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </AntHeader>
      <Drawer
        title="Profile"
        onClose={handleCloseProfileDrawer}
        open={isProfileDrawerOpen}
      >
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
        getContainer={false}
      >
        <AdminNavMenu />
      </Drawer>
    </>
  );
};

export default AdminHeader;
