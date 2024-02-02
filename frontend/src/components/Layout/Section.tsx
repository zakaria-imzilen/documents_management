import { Flex } from "antd";
import Title from "antd/es/typography/Title"
import { ReactNode } from "react";

interface IProps {
    title: string;
    children: ReactNode;
}

const Section = ({ title, children }: IProps) => {
    return (
        <div style={{ width: "100%" }}>
            <Title style={{ marginBottom: 15, fontWeight: 600, color: "white" }} level={4}>{title}</Title>

            <Flex gap={10}>
                {children}
            </Flex>
        </div>
    )
}

export default Section