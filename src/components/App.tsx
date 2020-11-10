import React, { useReducer, useEffect } from "react";

import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import spinner from "../assets/img/ajax-loader.gif";
import "../App.css";
import { initialState, reducer } from "../store/reducer";
import {
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "../store/reducer/actions";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: SEARCH_MOVIES_SUCCESS,
        payload: jsonResponse.data.Search,
      });
    });
  }, []);
  const refreshPage = (): void => {
    window.location.reload();
  };
  const search = (searchValue: string) => {
    console.log(searchValue);
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
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
