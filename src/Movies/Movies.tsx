import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { Movie, popularMovies, popularMoviesSelector } from "./fetchPopularMovies";
import { favoriteMovies } from "./state";

const getFullUrlFromPoster = (poster: string) =>
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

  return (
    <div>
      <h4 style={{ textAlign: "center", maxWidth: "300px", maxHeight: "15px", fontFamily: "Trebuchet MS" }}>{name}</h4>
      <img
        src={fullPosterUrl}
        height={300}
        width={300}
        alt={altText}
        onClick={onClick}
      />
    </div>
  );
}

function Movies() {
  const moviesSelector = useRecoilValueLoadable(popularMoviesSelector);
  const [movies, setPopularMovies] = useRecoilState(popularMovies);
  const currentFavoriteMovies = useRecoilValue(favoriteMovies);
  const isLoading = moviesSelector.state === "loading";

  useEffect(
    () => {
      if (!isLoading) {
        setPopularMovies(moviesSelector.contents);
      }
    },
    [moviesSelector, isLoading, setPopularMovies]
  )

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
