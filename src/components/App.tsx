import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Movie from "./Movie";
// redux
import { initialState, reducer } from "../store/reducer";
import { SEARCH_MOVIES_SUCCESS } from "../store/reducer/actions";
// third-party
import axios from "axios";
// assets
import spinner from "../assets/img/ajax-loader.gif";
import "../App.css";

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
        <Header text="MOVIE SHARING" data={state} />

        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
