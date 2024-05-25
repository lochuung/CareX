import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";
import {
  HiCog,
  HiCollection,
  HiEmojiHappy,
  HiInformationCircle,
  HiLogout,
  HiOutlineSparkles,
  HiUser,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Avatar, Dropdown, Layout, Menu, Modal, theme } from "antd";
import { div } from "@tensorflow/tfjs";
import { GrDashboard, GrYoga, GrPlan } from "react-icons/gr";
import ConfirmModal from "../../hooks/useConfirmModal";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const EXECUTE_COMMANDS = {
  LOGOUT_COMMAND: "LOGOUT_COMMAND",
};

const ROUTING_COMMANDS = {
  PROFILE_COMMAND: "/profile",
  CHOOSEPLAN_COMMAND: "/choose-plan",
  NOTIFICATIONS_COMMAND: "/notifications",
  PASSWORDANDSECURITY_COMMAND: "/password-security",
  REWARD_COMMAND: "/reward",
};

const Sidebar = ({ collapsed, onCollapsed }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userItems = [
    {
      key: "/home",
      icon: <HiViewGrid />,
      label: "Dashboard",
    },
    {
      key: "/workshop",
      icon: <HiUsers />,
      label: "Workshop",
    },

    {
      key: "/yoga",
      icon: <GrYoga />,
      label: "Yoga ",
    },

    {
      key: "/diet",
      icon: <HiOutlineSparkles />,
      label: "Healthy diet",
    },

    getItem("User", "COMMANDS", <HiUser />, [
      getItem(
        "Profile",
        ROUTING_COMMANDS.PROFILE_COMMAND,
        <HiInformationCircle />
      ),
      getItem(
        "Notifications",
        ROUTING_COMMANDS.NOTIFICATIONS_COMMAND,
        <IoIosNotifications />
      ),
      getItem(
        "Choose Plan",
        ROUTING_COMMANDS.CHOOSEPLAN_COMMAND,
        <GrPlan />
      ),
      getItem(
        "Password & Security",
        ROUTING_COMMANDS.PASSWORDANDSECURITY_COMMAND,
        <MdOutlineSecurity />
      ),
      getItem("Logout", EXECUTE_COMMANDS.LOGOUT_COMMAND, <HiLogout />),
    ]),
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleClick(e) {
    // Check if the key is a command key

    if (Object.values(EXECUTE_COMMANDS).includes(e.key)) {
      switch (e.key) {
        case EXECUTE_COMMANDS.LOGOUT_COMMAND:
          setIsModalVisible(true);
          break;
        default:
          break;
      }
    } else {
      navigate(e.key);
    }
  }

  const setIsLogged = useUserStore((state) => state.setIsLogged);

  return (
    <div className="flex flex-col gap-1 h-full bg-red-500">
      <ConfirmModal
        title={"Logout"}
        content={"Are you sure you want to logout?"}
        success={() => {
          localStorage.removeItem("access_token");
          setIsLogged(false);
          navigate("/login");
        }}
        open={isModalVisible}
        setOpen={setIsModalVisible}
      />
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
          defaultCheckedKeys={["1"]}
          theme="dark"
          onClick={handleClick}
          mode="inline"
          items={userItems}
        />

        {/* Logout */}
      </Sider>
    </div>
  );
};

export default Sidebar;
