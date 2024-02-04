import { createLogger, format, transports } from "winston";

export default createLogger({
    format: format.json(),
    level: "error",
    transports: [
        new transports.Console(),
        new transports.File({ filename: "../../../logs/any_other_error.log" }),
    ],
});
