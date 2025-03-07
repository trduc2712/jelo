import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Tooltip, Drawer, Button } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import CartItems from "./cart-items";
import { ProfileForm } from "./";
import { useAuth } from "../hooks";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openCategoryDrawer = () => {
    setIsCategoryDrawerOpen(true);
  };

  const closeCategoryDrawer = () => {
    setIsCategoryDrawerOpen(false);
  };

  const openProfileDrawer = () => {
    if (!user) navigate("/auth/login");
    setIsProfileDrawerOpen(true);
  };

  const closeProfileDrawer = () => {
    setIsProfileDrawerOpen(false);
  };

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const navbarItems = [
    {
      key: "tops",
      label: "Tops",
      path: "/categories/tops",
    },
    {
      key: "bottoms",
      label: "Bottoms",
      path: "/categories/bottoms",
    },
    {
      key: "sweaters",
      label: "Sweaters",
      path: "/categories/sweaters",
    },
    {
      key: "hoodies",
      label: "Hoodies",
      path: "/categories/hoodies",
    },
    {
      key: "outerwear",
      label: "Outerwear",
      path: "/categories/outerwear",
    },
    {
      key: "accessories",
      label: "Accessories",
      path: "/categories/accessories",
    },
  ];

  return (
    <>
      <AntHeader className="sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
        <div className="flex items-center">
          {isNavbarVisible ? (
            <>
              <Link to="/">
                <h1 className="text-3xl font-bold text-[#bb4d00] !mr-4">
                  JELO
                </h1>
              </Link>
              <div className="flex">
                {navbarItems.map((item) => (
                  <div
                    key={item.key}
                    className="!px-4 uppercase cursor-pointer hover:text-[#bb4d00]"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Button icon={<MenuOutlined />} onClick={openCategoryDrawer} />
          )}
        </div>
        <div className="flex items-center text-2xl gap-4">
          <Tooltip title="Search">
            <Link to="/search" className="!text-black">
              <SearchOutlined className="cursor-pointer" />
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            <ShoppingOutlined
              className="cursor-pointer"
              onClick={openCartDrawer}
            />
          </Tooltip>
          <Tooltip title="Profile">
            <UserOutlined onClick={openProfileDrawer} />
          </Tooltip>
        </div>
      </AntHeader>
      <Drawer
        onClose={closeCategoryDrawer}
        open={isCategoryDrawerOpen}
        placement="left"
        width={200}
        styles={{ header: { display: "none" } }}
      >
        <div className="flex flex-col">
          {navbarItems.map((item) => (
            <div
              key={item.key}
              className="!px-4 uppercase cursor-pointer hover:text-[#bb4d00] !mb-4 !pl-0"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </Drawer>
      <Drawer
        title="Profile"
        onClose={closeProfileDrawer}
        open={isProfileDrawerOpen}
      >
        <ProfileForm />
      </Drawer>
      <Drawer title="Cart" onClose={closeCartDrawer} open={isCartDrawerOpen}>
        <CartItems />
        <Button type="primary">Check out</Button>
      </Drawer>
    </>
  );
};

export default Header;
