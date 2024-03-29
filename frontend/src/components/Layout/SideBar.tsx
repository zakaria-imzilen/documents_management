import {
  CloudFilled,
  LogoutOutlined,
  SettingFilled,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Badge, Button, Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Main_Logo from "../../assets/Long_Logo.png";
import Minimal_Logo from "../../assets/Min.png";
import { useCallback, useContext } from "react";
import userContext from "../../context/user.context";
import { axiosMainInstance } from "../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  collapsed: boolean;
}

const SideBar = ({ collapsed }: IProps) => {
  const consumingUserContext = useContext(userContext);
  if (!consumingUserContext) throw new Error("User Context not provided");

  const { userState, setUserState } = consumingUserContext;
  const navigate = useNavigate();

  const logOut = useCallback(async () => {
    console.log("Running");
    try {
      const loggingOutRequest = axiosMainInstance.get("/auth/logout");
      toast.promise(loggingOutRequest, {
        success: "Logged out..",
        error: "Could'nt logging out for some reason",
        loading: "Loading..",
      });
      setUserState({ isConnected: false, data: null });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Sider
      style={{
        height: "100vh",
        backgroundColor: "black",
        borderRight: "1px solid black",
        textAlign: "center",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <img
        width={"100%"}
        src={!collapsed ? Main_Logo : Minimal_Logo}
        alt="Our Logo"
      />

      {userState.isConnected && (
        <img
          src={userState.data.image}
          height={"60"}
          style={{ borderRadius: "100%" }}
          alt=""
        />
      )}

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "black",
          marginTop: "20px",
        }}
        items={[
          {
            key: "1",
            icon: <CloudFilled />,
            label: "My Cloud",
          },
          {
            key: "2",
            icon: (
              <Badge dot={true} color={"gold"}>
                <ShareAltOutlined />
              </Badge>
            ),
            label: "Shared Cloud",
          },
          {
            key: "3",
            icon: (
              <Badge dot={true} color={"gold"}>
                <StarFilled />
              </Badge>
            ),
            label: "Favorites",
          },
        ]}
      />

      <Flex
        vertical
        style={{
          backgroundColor: "black",
          position: "absolute",
          left: collapsed ? 35 : 50,
          bottom: 40,
        }}
        gap={10}
      >
        <Badge dot={true} color={"gold"}>
          {collapsed ? (
            <SettingFilled style={{ color: "white" }} />
          ) : (
            <Button type="dashed" ghost icon={<SettingFilled />}>
              Settings
            </Button>
          )}
        </Badge>
        <Badge dot={true} color={"gold"}>
          {collapsed ? (
            <LogoutOutlined onClick={logOut} style={{ color: "white" }} />
          ) : (
            <Button
              onClick={logOut}
              type="dashed"
              ghost
              icon={<LogoutOutlined />}
            >
              Log Out
            </Button>
          )}
        </Badge>
      </Flex>

      {/* <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "black",
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
        items={[
          {
            key: "1",
            icon: (
              <Badge dot={true} color={"gold"}>
                <SettingFilled />
              </Badge>
            ),
            label: "Settings",
          },
          {
            key: "2",
            icon: (
              <Badge dot={true} color={"gold"}>
                <LogoutOutlined onClick={logOut} />
              </Badge>
            ),
            label: "Log out",
          },
        ]}
      /> */}

      <style>
        {`.ant-menu-item-selected {
    background-color: #112545 !important;
  }`}
      </style>
    </Sider>
  );
};

export default SideBar;
