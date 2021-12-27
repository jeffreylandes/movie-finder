import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { Movie, popularMovies, popularMoviesSelector } from "./fetchPopularMovies";
import { favoriteMovies } from "./state";

const SCROLL_RATIO = 0.85;

export const getFullUrlFromPoster = (poster: string) =>
  `https://image.tmdb.org/t/p/w500/${poster}`;

const getAltTextFromMovieName = (name: string) =>
  `Official movie poster for ${name}`;

function MovieComponent(
  movie: Movie,
  currentFavoriteMovies: Set<Movie>,
) {
  const { name, poster, } = movie;
  const fullPosterUrl = getFullUrlFromPoster(poster);
  const altText = getAltTextFromMovieName(name);

  const onClick = () => {
    if (!currentFavoriteMovies.has(movie)) {
      currentFavoriteMovies.add(movie);
    } else {
      currentFavoriteMovies.delete(movie);
    }
  }

  const onMouseOver = () => {
    return <div></div>
  }

  return (
    <div>
      <h4 style={{ textAlign: "center", maxWidth: "300px", maxHeight: "15px", fontFamily: "Trebuchet MS" }}>{name}</h4>
      <img
        src={fullPosterUrl}
        height={300}
        width={300}
        alt={altText}
        onClick={onClick}
        onMouseOver={onMouseOver}
      />
    </div>
  );
}

function Movies() {
  const [totalMovies, setTotalMovies] = useState(20);
  const moviesSelector = useRecoilValueLoadable(popularMoviesSelector);
  const [movies, setPopularMovies] = useRecoilState(popularMovies);
  const currentFavoriteMovies = useRecoilValue(favoriteMovies);
  const isLoading = moviesSelector.state === "loading";

  useEffect(
    () => {
      if (!isLoading) {
        setPopularMovies(moviesSelector.contents.slice(0, totalMovies));
      }
    },
    [totalMovies, moviesSelector, isLoading, setPopularMovies]
  )

  window.addEventListener("scroll", () => {
    const documentHeight = document.body.getBoundingClientRect().height;
    if (window.scrollY + window.innerHeight >= documentHeight * SCROLL_RATIO) {
      setTotalMovies(totalMovies + 10);
      setTimeout(() => {}, 1000) // Would like to get rid of this, but effectively limits number of additional rendered movies
    }
  })

  const movieComponents = movies.map((movie: Movie) =>
    MovieComponent(movie, currentFavoriteMovies)
  );

  return (
    <div
      style={{
        backgroundColor: "#A8A8A8",
        width: "85%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "20px"
      }}
    >
      {movieComponents}
    </div>
  );
}

export default Movies;
