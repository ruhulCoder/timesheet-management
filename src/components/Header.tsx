import React from "react";
import {
  Space,
  Layout,
  Avatar,
  Dropdown,
  Typography,
} from "antd";
import toast from 'react-hot-toast';
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, 
  DownOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const getUserName = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return userData.name || "User";
    }
    return "User";
  };

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      localStorage.clear();
      navigate("/signin");
      toast.success('Logged out successfully!');
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <AntHeader
      style={{ backgroundColor: "white" }}
      className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6"
    >
      <div className="flex items-center justify-between h-full">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Text className="text-xl font-semibold text-gray-900 hidden sm:block">
              ticktock
            </Text>
            <Text className="text-lg text-gray-500 hidden md:block">
              Timesheets
            </Text>
          </div>
        </div>

        {/* Right side - User profile */}
        <div className="flex items-center space-x-3">
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: ({ key }) => handleMenuClick(key),
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Space className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                className="bg-blue-500"
              />
              <Text className="text-gray-700 hidden sm:block">
                {getUserName()}
              </Text>
              <DownOutlined className="text-gray-400 text-xs" />
            </Space>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
