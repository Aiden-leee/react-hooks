import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Movie from "./Movie";
import Content from "./Content";
// redux
import { initialState, reducers } from "../store/reducer";
// import { SEARCH_MOVIES_SUCCESS } from "../store/reducer/actions";
import {
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "../store/reducer/actions";
// third-party
import axios from "axios";
import styled from "styled-components";
// assets
import spinner from "../assets/img/ajax-loader.gif";
import "../App.css";

const Ptag = styled.p`
  padding: 10px 0;
  background: #ccc;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: SEARCH_MOVIES_SUCCESS,
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

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

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie: any, index: number) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );
  return (
    <div className="App">
      <div className="m-container">
        <Header text="MOVIE SHARING" search={search} />

        <Ptag className="App-intro">Sharing a few of our favourite movies</Ptag>
        <Content data={retrievedMovies}></Content>
      </div>
    </div>
  );
};

export default App;
