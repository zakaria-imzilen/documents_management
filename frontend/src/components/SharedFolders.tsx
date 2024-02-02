import { Avatar, Badge, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const fakeContributors = [
    {
        id: 1,
        src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
        id: 2,
        src: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    },
];

const fakeFolders = [
    {
        id: "folder1",
        name: "Keynotes folder",
        contributors: fakeContributors,
        bgColor: "#1677ff",
    },
    {
        id: "folder2",
        name: "Vacation photos",
        contributors: [
            {
                id: 1,
                src: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
            },
        ],
        bgColor: "#2f54eb",
    },
];

const SharedFolders = () => {
    return (
        <Badge.Ribbon color="gold" text="Soon..">
            <div
                style={{
                    padding: 15,
                    margin: "20px 0",
                    backgroundColor: "rgb(0, 0, 40)",
                }}
            >
                <Title
                    level={5}
                    style={{
                        fontWeight: 600,
                        color: "white",
                        margin: 0,
                        marginBottom: 15,
                    }}
                >
                    Your shared folders
                </Title>

                <Flex vertical gap={10}>
                    {fakeFolders.map(({ id, bgColor, name, contributors }) => (
                        <Flex
                            key={id}
                            style={{
                                padding: 10,
                                backgroundColor: bgColor,
                                width: "100%",
                                borderRadius: 10,
                            }}
                            justify="space-between"
                            align="center"
                        >
                            <Text
                                style={{
                                    fontWeight: 600,
                                    color: "white",
                                    margin: 0,
                                }}
                            >
                                {name}
                            </Text>
                            <Avatar.Group>
                                {contributors.map((contrib) => (
                                    <Avatar key={contrib.id} {...contrib} />
                                ))}
                            </Avatar.Group>
                        </Flex>
                    ))}
                </Flex>
            </div>
        </Badge.Ribbon>
    );
};

export default SharedFolders;
