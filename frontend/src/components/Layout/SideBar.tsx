import { CloudFilled, ShareAltOutlined, StarFilled } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Main_Logo from "../../assets/Long_Logo.png";
import Minimal_Logo from "../../assets/Min.png";
import { useContext } from "react";
import userContext from "../../context/user.context";

interface IProps {
    collapsed: boolean;
}

const SideBar = ({ collapsed }: IProps) => {
    const consumingUserContext = useContext(userContext);
    if (!consumingUserContext) throw new Error("User Context not provided");

    const { userState } = consumingUserContext;
    console.log(userState.data);

    return (
        <Sider
            style={{
                height: "100vh",
                backgroundColor: "black",
                borderRight: "1px solid black",
                textAlign: "center"
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
                        icon: <ShareAltOutlined />,
                        label: "Shared Cloud",
                    },
                    {
                        key: "3",
                        icon: <StarFilled />,
                        label: "Favorites",
                    },
                ]}
            />

            <style>
                {`.ant-menu-item-selected {
    background-color: #112545 !important;
  }`}
            </style>
        </Sider>
    );
};

export default SideBar;
