import { Empty, Flex } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import socketIO from "../utils/socket";
import SingleFile from "./SingleFile";

export interface IDoc {
  url: string;
  mimetype: string;
  name: string;
  size: number;
}

export const DocumentsTable = ({
  filesData,
  setFilesData,
}: {
  filesData: IDoc[];
  setFilesData: Dispatch<SetStateAction<IDoc[]>>;
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
          <SingleFile key={crypto.randomUUID()} {...singleDoc} />
        ))}
      </Flex>
    </>
  );
};
