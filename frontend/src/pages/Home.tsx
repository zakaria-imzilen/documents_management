import { CSSProperties } from "react";
import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import FileUploadDragger from "../components/FileUploadDragger";
import { DocumentsTable } from "../components/DocumentsTable";

const { Content } = Layout;

const contentStyle: CSSProperties = {
    // textAlign: "center",
    // minHeight: 120,
    // lineHeight: "120px",
    // color: "#fff",
    // backgroundColor: "#2D3250",
    // padding: 20,
    // height: "60vh",
    // overflowY: "auto",
};

// const footerStyle: CSSProperties = {
//     textAlign: "center",
//     color: "white",
//     backgroundColor: "black",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
// };

const Home = () => {
    return (
        <>
            <Content style={contentStyle}>
                <FileUploadDragger />
                <Title level={4} style={{ color: "white", marginTop: 40, marginBottom: 10 }}>
                    Uploaded files
                </Title>
                <DocumentsTable />
            </Content>
            {/* <Footer style={footerStyle}>
                <Text style={{ color: "white", fontFamily: "monospace" }}>
                    Made with ❤️ by{" "}
                    <Link href="http://linkedin.com/in/zakaria-imzilen/">
                        ZakariaImzilen
                    </Link>
                </Text>
            </Footer> */}
        </>
    );
};

export default Home;
