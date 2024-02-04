import winston, { createLogger } from "winston";

export default createLogger({
  format: winston.format.json(),
  level: "warn",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./records/urgent_type_error.log",
    }),
  ],
});
