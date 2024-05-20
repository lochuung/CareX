"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiHome, FiSettings } from "react-icons/fi";
import { GrWorkshop, GrYoga } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaBloggerB, FaUser } from "react-icons/fa";
import { useStore } from "@/store/store";
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
import { Menu } from "antd";
const Menubar = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  const menuUser = [
    {
      name: "Trang chủ",
      icon: <FiHome />,
      link: "/home",
    },
    { name: "Workshops", icon: <GrWorkshop />, link: "/workshops" },
    { name: "Yoga", icon: <GrYoga />, link: "/yoga" },
    { name: "Cài đặt", icon: <FiSettings />, link: "/settings" },
  ];

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

  const { role } = useStore();

  const menu = role === "admin" ? adminItems : userItems;
  return (
    <div className="fixed h-screen">
      <div className="text-center flex p-3 justify-center">
        <h1 className="text-blue-500 font-bold text-3xl">CareX</h1>
      </div>

      <div className="flex flex-col gap-3 px-4 mt-4 h-full">
        <Menu
          onClick={({ key }) => router.push(key)}
          style={{
            width: 256,
            height: "calc(100%-40px)",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={menu}
        />
      </div>
    </div>
  );
};

export default Menubar;
