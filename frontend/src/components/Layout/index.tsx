import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Content from "./Content";
import { Layout as LayoutANTD } from "antd";

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <LayoutANTD>
            <SideBar collapsed={collapsed} />
            <Content collapsed={collapsed} setCollapsed={setCollapsed}>
                <Outlet />
            </Content>
        </LayoutANTD>
    );
};

export default Layout;
