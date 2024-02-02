import { useState } from "react";
import { AutoComplete } from "antd";

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

const Search = () => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const getPanelValue = (searchText: string) =>
        !searchText
            ? []
            : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    const onSelect = (data: string) => {
        console.log("onSelect", data);
    };
    return (
        <AutoComplete
            options={options}
            variant="filled"
            style={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 20,
                paddingInline: 10,
                marginBottom: 10
            }}
            onSelect={onSelect}
            onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="Search for uploaded files.."
        />
    );
};

export default Search;
