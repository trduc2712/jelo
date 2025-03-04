import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search: AntSearch } = Input;

const Search: React.FC = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <>
      <h2 className="font-bold text-2xl !mb-4">SEARCH</h2>
      <AntSearch onSearch={onSearch} enterButton />
    </>
  );
};

export default Search;
