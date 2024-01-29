import { Table, TableProps } from "antd";
import { apiBaseURL, axiosMainInstance } from "../utils/api";
import { useEffect, useState } from "react";
import socketIO from "../utils/socket";
import Title from "antd/es/typography/Title";

interface IDoc {
    createdTime: string;
    dataUrl: string;
    mimeType: string;
    modifiedTime: string;
    name: string;
    size: number;
}

const columns: TableProps<IDoc>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
    },
    {
        title: "Format",
        dataIndex: "mimeType",
        key: "mimeType",
    },
    {
        title: "Date",
        dataIndex: "createdTime",
        key: "createdTime",
    },
];

export const DocumentsTable = () => {
    const [filesData, setFilesData] = useState<any[]>([]);

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

    useEffect(() => {
        socketIO.on("document", (coming) => {
            console.log("Coming in", coming);

            if (coming.operationType == "insert") {
                const newFileAdded = coming.document;
                if (newFileAdded) setFilesData((prev) => [...prev, newFileAdded]);
            }
        });
    }, []);

    return filesData.length == 0 ? (
        <Title level={5} style={{ color: "white" }}>Empty</Title>
    ) : (
        <>
            <Table
                // style={{ backgroundColor: "#424769" }}
                columns={columns}
                dataSource={filesData as IDoc[]}
            />
            <style>
                {`
                table {
                    background-color: #131629;
                    color: white;
                }
            `}
            </style>
        </>
    );
};
