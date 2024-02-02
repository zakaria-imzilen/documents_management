import { Flex, Progress } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const StorageDisplay = ({ storageUsed }: { storageUsed: number }) => {
    const inGB = Number((storageUsed / 1000).toFixed(2));
    const totalLeft = (100 - (storageUsed / 1000)).toFixed(2);

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
                    {totalLeft}% Left
                </Text>
            </Flex>

            <Text style={{ color: "white" }}>
                {inGB}GB out of 100GB is used
            </Text>

            <Progress style={{ marginBottom: 0 }} percent={inGB} size="small" />
        </div>
    );
};

export default StorageDisplay;
