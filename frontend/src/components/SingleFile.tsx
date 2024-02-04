import { Flex, Popover } from "antd";
import { IDoc } from "./DocumentsTable";
import { CameraFilled, FileFilled, VideoCameraFilled } from "@ant-design/icons";
import Text from "antd/es/typography/Text";

const IconPerMimeType = {
  jpeg: CameraFilled,
  png: CameraFilled,
  jpg: CameraFilled,
  pdf: FileFilled,
  video: VideoCameraFilled,
};

const SingleFile = (props: IDoc) => {
  const { mimetype, name, url, size } = props;

  const fileType = mimetype.split("/")[1] as
    | "jpeg"
    | "png"
    | "jpg"
    | "pdf"
    | "video";
  const Icon = IconPerMimeType[fileType];

  const fileDisplay =
    fileType == "pdf" || fileType == "video" ? (
      "Can't preview PDF/Video/Audio for the moment"
    ) : (
      <img src={url} height={100} alt={name} />
    );
  const fileSize = (size / 1000000).toFixed(2);

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        padding: 20,
        backgroundColor: "rgb(0, 0, 40)",
        borderRadius: 5,
        width: "100%",
      }}
    >
      <Popover content={fileDisplay} title={name.split(".")[0]}>
        <Flex gap={15} align="center">
          <div
            style={{
              padding: 10,
              backgroundColor: "white",
              width: "fit-content",
              borderRadius: "10px",
            }}
          >
            <Icon style={{ color: "black" }} />
          </div>

          <Text
            style={{
              color: "white",
              margin: 0,
            }}
          >
            {name}
          </Text>
        </Flex>
      </Popover>

      <Text
        style={{
          color: "white",
        }}
        type="secondary"
      >
        {fileType.toUpperCase()} file
      </Text>

      <Text
        style={{
          color: "white",
        }}
        type="secondary"
      >
        {fileSize} MB
      </Text>
    </Flex>
  );
};

export default SingleFile;
