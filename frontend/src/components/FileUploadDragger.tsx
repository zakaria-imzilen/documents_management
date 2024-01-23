import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'document',
    multiple: false,
    action: 'http://localhost:5001/api/document',
    method: "POST",
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const FileUploadDragger: React.FC = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "white" }} />
        </p>
        <p style={{ color: "white" }} className="ant-upload-text">Click or drag file to this area to upload</p>
        <p style={{ color: "whitesmoke", marginTop: 2 }} className="ant-upload-hint">
            Currently Support for a PDF and JPG upload.
        </p>
    </Dragger>
);

export default FileUploadDragger;