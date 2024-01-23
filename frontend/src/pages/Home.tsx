import React, { CSSProperties } from "react";
import { Flex, Layout, Typography } from "antd";
import { CloudUploadOutlined, FileSyncOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import FileUploadDragger from "../components/FileUploadDragger";
import DocumentsDisplay from "../components/DocumentsDisplay";
import { DocumentsTable } from "../components/DocumentsTable";
const { Text, Link } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: CSSProperties = {
    textAlign: "center",
    color: "#fff",
    padding: 100,
    height: "fit-content",
    backgroundColor: "#2D3250",
};

const contentStyle: CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#2D3250",
    padding: 20
};

const siderStyle: CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    height: "100%",
    borderTopRightRadius: 20,
};

const footerStyle: CSSProperties = {
    textAlign: "center",
    color: "white",
    backgroundColor: "#424769",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
};

const mainLayoutStyle: CSSProperties = {
    height: "60vh",
    backgroundColor: "#2D3250",
};

const layoutStyle = {
    overflow: "hidden",
};

const mainTitleStyle: CSSProperties = {
    margin: 2,
};

const Home = () => {
    return (
        <Layout style={layoutStyle} className="dark-bg" id="home-page">
            <Header style={headerStyle}>
                <Flex justify="center" gap={3}>
                    <FileSyncOutlined style={{ fontSize: 30 }} />
                    <Title mark style={mainTitleStyle} level={3}>
                        Manage your documents in ease!
                    </Title>
                </Flex>
            </Header>
            <Layout style={mainLayoutStyle}>
                <Sider width="30%" style={siderStyle}>
                    <FileUploadDragger />
                </Sider>
                <Content style={contentStyle}>
                    <Title level={4} style={{ color: "white", marginBottom: 50 }}>Browse all files</Title>
                    <DocumentsTable />
                </Content>
            </Layout>
            <Footer style={footerStyle}>
                <Text style={{ color: "white", fontFamily: "monospace" }}>
                    Made with ❤️ by{" "}
                    <Link href="http://linkedin.com/in/zakaria-imzilen/">
                        ZakariaImzilen
                    </Link>
                </Text>
            </Footer>
        </Layout>
    );
};

export default Home;
