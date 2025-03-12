import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Tooltip, Drawer, Avatar, Dropdown } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Breadcrumb, ProfileForm, AdminNavMenu } from '.';
import { useAuth } from '../hooks';
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
  const { user } = useAuth();
  const navigate = useNavigate();

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
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
