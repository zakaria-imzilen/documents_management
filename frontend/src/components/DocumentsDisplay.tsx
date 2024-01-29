import { useQuery } from "@tanstack/react-query";
import { axiosMainInstance } from "../utils/api";
import SingleDocumentDisplay from "./SingleDocumentDisplay";
import { Flex } from "antd";

const DocumentsDisplay = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["documents/get"],
        queryFn: () => axiosMainInstance.get(`/document`),
    });

    if (isLoading) return "Loading..";

    if (error) return "Error";
    if (data) {
        const { files } = data.data;

        return (
            <Flex gap={3} justify="space-around">
                {files.map((doc: any) => <SingleDocumentDisplay file={doc} />)}
            </Flex>
        );
    }
};

export default DocumentsDisplay;
