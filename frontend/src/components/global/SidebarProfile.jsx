import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const SidebarProfile = ({ collapsed, onCollapsed }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userItems = [
    {
      key: "/edit-profile",
      icon: <EditOutlined />,
      label: "Edit profile",
    },
    {
      key: "/choose-plan",
      icon: <FileDoneOutlined />,
      label: "Choose plan",
    },

    {
      key: "/notifications",
      icon: <NotificationOutlined />,
      label: "Notifications",
    },

    {
      key: "/password-security",
      icon: <SecurityScanOutlined />,
      label: "Password & Security",
    },
  ];

  function handleClick(e) {
    console.log("click", e);
    console.log(e.key, "key");
    navigate(e.key);
  }
  return (
    <div className="flex flex-col gap-3 h-full">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapsed()}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          background: "white",
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
          onClick={handleClick}
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={userItems}
        />
      </Sider>
    </div>
  );
};

export default SidebarProfile;
