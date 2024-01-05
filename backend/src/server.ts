import app from "./app";
import { config } from "dotenv";
config({ path: __dirname + "/environments/.env" });

export let PORT: number;

if (process.env.NODE_ENV == "dev") {
    const portFromENV = process.env.PORT;

    if (!portFromENV) {
        PORT = 4000;
    } else {
        PORT = Number(portFromENV)
    }
} else if (process.env.NODE_ENV == "test") {
    const portFromENV = process.env.PORT_TEST;

    if (!portFromENV) {
        PORT = 4001;
    } else {
        PORT = Number(portFromENV)
    }
} else {
    PORT = 3003;
}

app.listen(PORT, () => console.log("Listening on: " + PORT));
