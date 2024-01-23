import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { axiosMainInstance } from "../utils/api";

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
    const { isLoading, error, data } = useQuery({
        queryKey: ["documents/get"],
        queryFn: () => axiosMainInstance.get("http://localhost:5001/api/document"),
    });

    if (isLoading) return "Loading..";

    if (error) return "Error";
    if (data) {
        console.log(data.data.files);
        return <Table style={{ backgroundColor: "#424769" }} columns={columns} dataSource={data.data.files as IDoc[]} />;
    }
};
