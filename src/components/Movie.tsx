import React from "react";
import styled from "styled-components";

const MovieBlock = styled.div`
  background: #dedede;
  border-radius: 10px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
`;
const MovieWrap = styled.div`
  display: block;
  width: 100%;
  height: 350px;
`;
const H2tag = styled.h2`
  font-size: 18px;
  padding: 5px;
  background: #f5c261;
  color: #101521;
  border-radius: 5px 5px 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  > strong {
    font-size: 14px;
  }
`;

const MovieImgWrap = styled.div`
  display: inline-block;
  width: 100%;
  height: calc(100% - 30px);
  padding: 10px;
  box-sizing: border-box;
`;
const MovieImg = styled.div<ImgProps>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${(props: any) => props.src});
  @media only screen and (max-width: 780px) {
    background-size: cover;
  }
`;
interface ImgProps {
  src: string;
}
interface MovieProps {
  movie: { Poster: object | string; Title: string; Year: string };
}

const DEFAULT_PLACEHOLDER_IMAGE: string =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const { Poster } = movie;
  const poster: any = Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : Poster;
  return (
    <MovieBlock className="movie swiper-slide">
      <MovieWrap>
        <H2tag title={`${movie.Title} (${movie.Year})`}>
          {movie.Title} <strong>({movie.Year})</strong>
        </H2tag>
        <MovieImgWrap>
          <MovieImg src={poster} />
        </MovieImgWrap>
      </MovieWrap>
    </MovieBlock>
  );
};

export default Movie;
