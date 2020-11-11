import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  padding: 10px 0;
`;
const InputWrap = styled.div`
  position: relative;
  display: inline-block;
`;
const SearchInput = styled.input.attrs({
  type: "text",
})`
  padding: 5px 50px 5px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const SubmitButton = styled.input.attrs({
  type: "submit",
})`
  position: absolute;
  padding: 5px;
  background: #ffa800;
  border: 1px solid transparent;
  border-radius: 0 3px 3px 0;
  right: 0;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover {
    opacity: 0.9;
  }
`;

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
    <Form action="" className="search">
      <InputWrap>
        <SearchInput
          id="searchInput"
          type="text"
          value={searchValue}
          onChange={handleSearchInputChanges}
        />
        <SubmitButton
          type="submit"
          onClick={callSearchFunction}
          value="Search"
        />
      </InputWrap>
    </Form>
  );
};

export default Search;
