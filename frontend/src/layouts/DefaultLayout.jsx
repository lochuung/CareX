import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout hasSider>
      <Sidebar collapsed={collapsed} onCollapsed={handleCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 60 : 200,
          flex: 1,
        }}
      >
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
