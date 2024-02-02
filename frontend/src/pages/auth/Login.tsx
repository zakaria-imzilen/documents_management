import {
    CSSProperties,
    ChangeEventHandler,
    FormEventHandler,
    useCallback,
    useContext,
    useState,
} from "react";
import { Button, Input, Layout } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { convertArrToObj } from "../../utils/helpers";
import { API_login } from "../../utils/api/mock";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Long_Logo.png"
import userContext from "../../context/user.context";

const layoutStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(50% - 8px)",
    maxWidth: 600,
    backgroundColor: "black",
    borderRadius: 5,
    padding: "calc(5%)",
};

const typographyStyle: CSSProperties = {
    color: "whitesmoke",
};

const inputStyle: CSSProperties = {
    backgroundColor: "#242424",
    color: "white",
    margin: "5px 0",
};

const inputs = [
    {
        id: "input-email",
        component: Input,
        name: "email",
        attributes: {
            name: "email",
            type: "email",
            placeholder: "Enter your email..",
            style: inputStyle,
        },
        prefix: <UserOutlined />,
    },
    {
        id: "input-password",
        component: Input,
        name: "password",
        attributes: {
            name: "password",
            type: "password",
            placeholder: "Enter your password..",
            style: inputStyle,
        },
        prefix: <LockOutlined />,
    },
];

const initializeFormState = convertArrToObj(inputs, "name");

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(initializeFormState);

    const consumingUserContext = useContext(userContext);
    if (!consumingUserContext) throw new Error("User Context not provided");

    const { setUserState } = consumingUserContext;

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target }) => {
            const newVal = { [target.name]: target.value };
            setForm((prev) => ({ ...prev, ...newVal }));
        },
        [form]
    );

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            const logIN = API_login(form.email, form.password);
            toast.promise(logIN, {
                loading: "Loading...",
                success: (data) => data.message,
                error: (err) => err.message,
            });

            logIN.then((resp) => {
                if (resp.status) {
                    console.log("Success")
                    setUserState({ isConnected: true, data: resp.data });
                    navigate("/");
                }
            });
        },
        [form]
    );

    return (
        <Layout style={layoutStyle} id="login-page">
            <img src={Logo} alt="Logo" />

            <Title style={typographyStyle} level={2}>
                Sign in
            </Title>
            <Paragraph style={{ ...typographyStyle, marginBottom: 30 }}>
                Welcome back to DocumentUpload! <br /> Please enter your details below
                to sign in.
            </Paragraph>

            <form onSubmit={handleFormSubmit}>
                {inputs.map((input) => (
                    <Input
                        key={input.id}
                        variant="filled"
                        onChange={handleInputChange}
                        {...input.attributes}
                    />
                ))}

                <Button
                    htmlType="submit"
                    style={{ margin: "20px 0" }}
                    type="dashed"
                    block
                >
                    Submit
                </Button>
            </form>

            <style>
                {` 
                    input::placeholder { 
                        color: gray !important; 
                    }`}
            </style>
        </Layout>
    );
};

export default Login;
