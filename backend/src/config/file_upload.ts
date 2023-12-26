import multer from "multer";

const storage = multer.diskStorage({
    destination: __filename + "../../../../../../documents_management_upload",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const fileName =
            file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
        req.fileName = fileName;
        cb(null, fileName);
    },
});

export default multer({ storage });
