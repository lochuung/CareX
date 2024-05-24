import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const { Header, Content, Footer, Sider } = Layout;

const Sidebar = ({ collapsed, onCollapsed }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      children: [
        { key: "yoga/practice", label: "Yoga Practice" },
        { key: "yoga/exercise ", label: "Yoga Exercise" },
        { key: "yoga/shop ", label: "Yoga Shop " },
      ],
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

  function handleClick(e) {
    console.log("click", e);
    console.log(e.key, "key");
    navigate(e.key);
  }
  return (
    <div className="flex flex-col gap-3 h-full bg-red-500">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapsed()}
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
          items={userItems}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
