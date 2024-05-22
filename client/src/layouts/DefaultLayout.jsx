"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  WechatWorkOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useStore } from "@/store/store";
const { Header, Content, Footer, Sider } = Layout;


const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const adminItems = [
    {
      key: "/admin/home",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/workshops",
      icon: <WechatWorkOutlined />,
      label: "Workshop Management",
    },

    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "User Management",
    },

    {
      key: "/admin/blogs",
      icon: <BookOutlined />,
      label: "Blog Management",
    },
  ];

  const userItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/workshops",
      icon: <WechatWorkOutlined />,
      label: "Workshop",
    },

    {
      key: "/yoga",
      icon: <UserOutlined />,
      label: "Yoga",
    },

    {
      key: "/food",
      icon: <BookOutlined />,
      label: "Gợi ý bữa ăn",
    },

    {
      key: "/setting",
      icon: <BookOutlined />,
      label: "Cài đặt",
    },
  ];

  const currentUser = useStore((state) => state?.currentUser);
  const setCurrentUser = useStore((state) => state?.currentUser);

  const role = currentUser?.roles[0]?.name;

  const menu = role === "ADMIN" ? adminItems : userItems;

  const router = useRouter();

  const items = [
    {
      key: "1",
      label: <h1>Thông tin cá nhân</h1>,
    },
    {
      key: "2",
      label: "Yoga",
    },

    {
      key: "4",
      danger: true,
      label: "Đăng xuất",
    },
  ];

  function handleClick(e) {
    console.log("click", e);
    console.log(e.key, "key");
    router.replace(e.key);
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
    router.push("/auth/signin");
    console.log("click");
  };

  const handleDropdown = (e) => {
    console.log(e);
    if (e.key == 4) {
      handleLogout();
    }
  };
  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <h1
            className={` text-blue-600 font-extrabold text-3xl text-center my-3 items-center justify-center ${
              collapsed ? "hidden" : "flex"
            }`}
          >
            CareX
          </h1>
        </div>
        <Menu
          theme="dark"
          onClick={handleClick}
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menu}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 60 : 200,
          flex: 1,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-end items-center h-full px-3">
            <div className="flex items-center">
              <Dropdown
                menu={{
                  onClick: handleDropdown,
                  items,
                }}
              >
                <Avatar size={40} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
