import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.json(),
  level: "info",
  transports: [
    new transports.Console(),
    new transports.File({ filename: __dirname + "/./records/database.log" }),
  ],
});
