import { Document, Page } from "react-pdf";

interface IProps {
    file: {
        "fileName": string,
        "mimeType": string,
        "dataUrl": string
    };
}

const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};

const SingleDocumentDisplay = ({ file }: IProps) => {
    if (file.fileName.endsWith("pdf")) {
        const blob = base64toBlob(file.dataUrl);
        const url = URL.createObjectURL(blob);

        return <Document file={url}>
            <Page pageNumber={1} />
        </Document>
    }
    return (
        <div>
            <img width={100} src={file.dataUrl} alt="" />
        </div>
    );
};

export default SingleDocumentDisplay;
