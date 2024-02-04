import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.json(),
  level: "error",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./records/any_other_error.log" }),
  ],
});
