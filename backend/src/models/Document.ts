import { Schema, Types, model } from "mongoose";
import { IDocument } from "../types/models/document";
import { socket_server_init } from "../server";
import { getDocument } from "../helpers/file.helper";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../config/file_upload";

export const validateEmail = function (email: string): boolean {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      full_path: String,
      mimetype: {
        type: String,
        enum: [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "application/pdf",
        ],
      },
      name: String,
      size: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Document = model<IDocument>("Document", schema);
Document.watch().on("change", async (data) => {
  console.log("Document Modal got changes", data);

  try {
    console.log("Full Doc:", data.fullDocument);
    const { file } = data.fullDocument;

    const fileRef = ref(firebaseStorage, file.full_path);
    const fileURL = await getDownloadURL(fileRef);

    socket_server_init.emit("document", {
      operationType: data.operationType,
      document: {
        ...file,
        url: fileURL,
      },
    });
  } catch (error) {
    console.log("While watching document model, got this error:", error);
  }
});

export default Document;
