import { Layout, theme } from "antd";
import { DocumentsTable, IDoc } from "../components/DocumentsTable";
import Search from "../components/Search";
import Section from "../components/Layout/Section";
import {
  AudioFilled,
  CameraFilled,
  FileFilled,
  VideoCameraFilled,
} from "@ant-design/icons";
import Category from "../components/Category";
import { useContext, useEffect, useMemo, useState } from "react";
import { apiBaseURL, axiosMainInstance } from "../utils/api";
import Sider from "antd/es/layout/Sider";
import FileUploadDragger from "../components/FileUploadDragger";
import StorageDisplay from "../components/StorageDisplay";
import SharedFolders from "../components/SharedFolders";
import { ModalContext } from "../context/ModalProvider";
import CustomModal from "../components/CustomModal";

const { Content } = Layout;

const templateSections = [
  {
    id: "section1",
    title: "Photos",
    bgColor: "#002c8c",
    Icon: CameraFilled,
    qty: 0,
    types: ["image/png", "image/jpeg", "image/jpg"],
  },
  {
    id: "section2",
    title: "Files",
    bgColor: "#a8071a",
    Icon: FileFilled,
    qty: 0,
    types: ["application/pdf"],
  },
  {
    id: "section3",
    title: "Videos",
    bgColor: "#9e1068",
    Icon: VideoCameraFilled,
    qty: 0,
    types: ["video/mp4"],
  },
  {
    id: "section4",
    title: "Audios",
    bgColor: "#391085",
    Icon: AudioFilled,
    qty: 0,
    types: ["audio/mp3"],
  },
];

const Home = () => {
  const modalState = useContext(ModalContext);
  if (!modalState) throw new Error("Modal Context not provided");

  const [filesData, setFilesData] = useState<IDoc[]>([]);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const sections = useMemo(() => {
    return templateSections.map((sec) => {
      const count = filesData.reduce((acc, curr) => {
        if (sec.types.includes(curr.mimetype)) return acc + 1;
        return acc;
      }, 0);

      return {
        ...sec,
        qty: count,
      };
    });
  }, [filesData]);

  useEffect(() => {
    axiosMainInstance
      .get(`${apiBaseURL}/document`)
      .then(({ data }) => {
        if (data.data) {
          setFilesData(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const totalUsedStorage = useMemo(
    () => filesData.reduce((acc, curr) => curr.size + acc, 0),
    [filesData]
  );

  return (
    <>
      <CustomModal {...modalState}>{modalState.isOpen.content}</CustomModal>

      <Layout
        style={{
          borderRadius: borderRadiusLG,
          background: "rgb(19, 22, 41)",
        }}
      >
        <Content style={{ padding: "0 24px", minHeight: "100%" }}>
          <Search filesData={filesData} />

          <Section title={"Categories"}>
            {sections.map((section) => (
              <Category key={section.id} {...section} />
            ))}
          </Section>

          <Section title={"Uploaded files"}>
            <DocumentsTable filesData={filesData} setFilesData={setFilesData} />
          </Section>
        </Content>

        <Sider
          style={{
            background: "black",
            borderRadius: 20,
            color: "white",
            position: "sticky",
            height: "fit-content",
            padding: 20,
          }}
          width={350}
        >
          <FileUploadDragger />
          <StorageDisplay storageUsed={totalUsedStorage} />
          <SharedFolders />
        </Sider>
      </Layout>
    </>
  );
};

export default Home;
