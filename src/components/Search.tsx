import React, { useState } from "react";

interface SearchProps {
  search(searchValue: string): void;
}

const Search: React.FC<SearchProps> = ({ search }) => {
  const [searchValue, setSearchValue] = useState<any | string>("");
  const handleSearchInputChanges = (e: any): void => {
    setSearchValue(e.target.value);
  };
  const resetInputField = (): void => {
    setSearchValue("");
  };
  const callSearchFunction = (e: any): void => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };
  return (
    <form action="" className="search">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <input type="submit" onClick={callSearchFunction} />
    </form>
  );
};

export default Search;
