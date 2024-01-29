import React from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { apiBaseURL } from "../utils/api";

const { Dragger } = Upload;

const props: UploadProps = {
    name: "document",
    multiple: false,
    action: `${apiBaseURL}/document`,
    method: "POST",
    withCredentials: true,
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

const FileUploadDragger: React.FC = () => (
    <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
);

export default FileUploadDragger;
