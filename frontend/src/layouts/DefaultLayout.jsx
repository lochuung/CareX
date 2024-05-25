import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className=" bg-white">
      <Sidebar collapsed={collapsed} onCollapsed={handleCollapsed} />

      <Layout
        className=" bg-white"
        style={{
          marginLeft: collapsed ? 60 : 200,
          flex: 1,
        }}
      >
        <Content
          className="h-screen"
          style={{
            margin: "24px 16px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
