import { Empty, Flex } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import socketIO from "../utils/socket";
import Title from "antd/es/typography/Title";
import SingleFile from "./SingleFile";

export interface IDoc {
    createdTime: string;
    dataUrl: string;
    mimeType: string;
    modifiedTime: string;
    name: string;
    size: number;
}

// const columns: TableProps<IDoc>["columns"] = [
//     {
//         title: "Name",
//         dataIndex: "name",
//         key: "name",
//     },
//     {
//         title: "Size",
//         dataIndex: "size",
//         key: "size",
//     },
//     {
//         title: "Format",
//         dataIndex: "mimeType",
//         key: "mimeType",
//     },
//     {
//         title: "Date",
//         dataIndex: "createdTime",
//         key: "createdTime",
//     },
// ];

export const DocumentsTable = ({
    filesData,
    setFilesData,
}: {
    filesData: any[];
    setFilesData: Dispatch<SetStateAction<any[]>>;
}) => {
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
        <Empty description={false} style={{ margin: "auto" }} />
    ) : (
        <>
            <Flex
                vertical
                gap={5}
                style={{ height: 500, overflowY: "auto", width: "100%" }}
            >
                {filesData.map((singleDoc) => (
                    <SingleFile key={singleDoc.id} {...singleDoc} />
                ))}
            </Flex>
        </>
    );
};
