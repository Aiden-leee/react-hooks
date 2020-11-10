import React, { useReducer } from "react";
import Search from "./Search";
import styled from "styled-components";
// redux
import {
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "../store/reducer/actions";
import { initialState, reducer } from "../store/reducer";
// third-party
import axios from "axios";

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #233250;
  padding: 20px;
`;
const H2tag = styled.h2`
  color: #fff;
`;

interface HeaderProps {
  text: string;
  data?: object;
}

const Header: React.FC<HeaderProps> = ({ text, data }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (searchValue: string) => {
    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      (jsonResponse) => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.data.Search,
          });
        } else {
          dispatch({
            type: SEARCH_MOVIES_FAILURE,
            error: jsonResponse.data.Error,
          });
        }
      }
    );
  };
  return (
    <HeaderBlock className="app-header">
      <H2tag>{text}</H2tag>
      <Search search={search} />
    </HeaderBlock>
  );
};

export default Header;
