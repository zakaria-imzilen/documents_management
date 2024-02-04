import multer, { memoryStorage } from "multer";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const MAX_SIZE = 1048576; // 10MB

const storage = multer.diskStorage({
  destination: __filename + "../../../../../../documents_management_upload",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const fileName =
      file.originalname +
      "-" +
      uniqueSuffix +
      "." +
      file.mimetype.split("/")[1];
    req.fileName = fileName;
    cb(null, fileName);
  },
});

export const temporaryStorage = multer({
  storage: memoryStorage(),
  limits: { fileSize: MAX_SIZE /* bytes */ },
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_STORAGE_PATH,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// FIREBASE_STORAGE_PATH
export const firebaseStorage = getStorage(
  app,
  process.env.FIREBASE_STORAGE_PATH
);

export const local_file_upload = multer({ storage });
