"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.default = (0, winston_1.createLogger)({
    format: winston_1.format.json(),
    level: "error",
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "./records/any_other_error.log" }),
    ],
});
