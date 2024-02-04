import { useContext, useRef, useState } from "react";
import { AutoComplete } from "antd";
import { IDoc } from "../DocumentsTable";
import { ModalContext } from "../../context/ModalProvider";
import toast from "react-hot-toast";

const Search = ({ filesData }: { filesData: IDoc[] }) => {
  const modalState = useContext(ModalContext);
  if (!modalState) throw new Error("Modal Context not provided");

  const { setIsOpen } = modalState;

  const inputRef = useRef(null);

  const [options, setOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) => {
    const result = filesData
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((doc) => ({ value: doc.name }));

    return !searchText ? [] : result;
  };

  const onSelect = (data: string) => {
    console.log("onSelect", data);
    const findFile = filesData.find((file) => file.name == data);

    if (
      !findFile ||
      findFile.mimetype.includes("pdf") ||
      findFile.mimetype.includes("video") ||
      findFile.mimetype.includes("audio")
    )
      return toast.error("Couldn't preview the file");

    const img = (
      <img src={findFile.url} style={{ width: "100%" }} alt={findFile.name} />
    );
    setIsOpen({ status: true, content: img });
  };
  return (
    <AutoComplete
      ref={inputRef}
      options={options}
      variant="filled"
      style={{
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingInline: 10,
        marginBottom: 10,
      }}
      onSelect={onSelect}
      onSearch={(text) => setOptions(getPanelValue(text))}
      placeholder="Search for uploaded files.."
    />
  );
};

export default Search;
