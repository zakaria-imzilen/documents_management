import { Flex, Progress } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

function calculatePercentage(fileSizeInMB: number): string {
  const oneGBInMB = 1000;
  const percentage = (fileSizeInMB / oneGBInMB) * 100;
  return percentage.toFixed(2);
}

// Max Storage for a User --> 1GB
const StorageDisplay = ({ storageUsed }: { storageUsed: number }) => {
  const totalUsed = Number((storageUsed / 1000000).toFixed(2));
  const totalLeft = calculatePercentage(totalUsed);

  return (
    <div
      style={{
        padding: 15,
        margin: "20px 0",
        backgroundColor: "rgb(0, 0, 40)",
      }}
    >
      <Flex align="center" justify="space-between" style={{ marginBottom: 15 }}>
        <Title
          level={5}
          style={{
            fontWeight: 600,
            color: "white",
            margin: 0,
          }}
        >
          Your storage
        </Title>
        <Text
          style={{
            fontWeight: 600,
            color: "burlywood",
            textAlign: "right",
          }}
        >
          <b>{totalLeft}</b>% Left
        </Text>
      </Flex>

      <Text style={{ color: "white" }}>
        <b>{totalUsed}</b>MB is used out of 1GB{" "}
      </Text>

      <Progress style={{ marginBottom: 0 }} percent={totalUsed} size="small" />
    </div>
  );
};

export default StorageDisplay;
