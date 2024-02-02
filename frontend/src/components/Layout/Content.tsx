import { Dispatch, ReactNode, SetStateAction } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Header, Content as ContentANTD } from "antd/es/layout/layout";

interface IProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

const Content = ({ collapsed, setCollapsed, children }: IProps) => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                height: "100vh",
                overflowY: "auto",
                backgroundColor: "#131629",
            }}
        >
            <Header
                style={{
                    padding: 0,
                    position: "sticky",
                    top: 0,
                    backgroundColor: "rgb(19, 22, 41)",
                    zIndex: 2,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                        color: "white",
                    }}
                />
            </Header>
            <ContentANTD
                style={{
                    margin: "0px 16px",
                    padding: 24,
                    minHeight: 280,
                    background: "#131629",
                    borderRadius: borderRadiusLG,
                }}
            >
                {children}
            </ContentANTD>
        </Layout>
    );
};

export default Content;
