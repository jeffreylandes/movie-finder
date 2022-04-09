import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Movie } from "../../fetch/fetchPopularMovies";
import { favoriteMovies, popularMovies, popularMoviesSelector } from "./state";
import { debounce } from "lodash";

const SCROLL_RATIO = 0.85;

export const getFullUrlFromPoster = (poster: string) =>
  `https://image.tmdb.org/t/p/w500/${poster}`;

const getAltTextFromMovieName = (name: string) =>
  `Official movie poster for ${name}`;

function MovieComponent(
  movie: Movie,
  setLikedMoviesCallback: (movie: Movie) => void
) {
  const { name, poster } = movie;
  const fullPosterUrl = getFullUrlFromPoster(poster);
  const altText = getAltTextFromMovieName(name);

  const onClick = () => {
    setLikedMoviesCallback(movie);
  };

  return (
    <div>
      <h4
        style={{
          textAlign: "center",
          maxWidth: "300px",
          maxHeight: "15px",
          fontFamily: "Trebuchet MS",
        }}
      >
        {name}
      </h4>
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
  const [totalMovies, setTotalMovies] = useState(20);
  const setTotalMoviesDebounced = debounce(setTotalMovies, 500);
  const moviesSelector = useRecoilValueLoadable(popularMoviesSelector);
  const [movies, setPopularMovies] = useRecoilState(popularMovies);
  const [currentFavoriteMovies, setCurrentFavoriteMovies] =
    useRecoilState(favoriteMovies);
  const isLoading = moviesSelector.state === "loading";

  useEffect(() => {
    if (!isLoading) {
      setPopularMovies(moviesSelector.contents.slice(0, totalMovies));
    }
  }, [totalMovies, moviesSelector, isLoading, setPopularMovies]);

  useEffect(() => {
    window.onscroll = () => {
      const documentHeight = document.body.getBoundingClientRect().height;
      if (
        window.scrollY + window.innerHeight >=
        documentHeight * SCROLL_RATIO
      ) {
        setTotalMoviesDebounced(totalMovies + 20);
      }
    };
  }, [totalMovies]);

  const setLikedMoviesCallback = useCallback(
    (movie: Movie) => {
      if (currentFavoriteMovies.size >= 5) {
        alert("You have already selected 5 movies!");
        return;
      }
      if (!currentFavoriteMovies.has(movie)) {
        currentFavoriteMovies.add(movie);
        setCurrentFavoriteMovies(new Set(currentFavoriteMovies));
      } else {
        currentFavoriteMovies.delete(movie);
        setCurrentFavoriteMovies(new Set(currentFavoriteMovies));
      }
    },
    [currentFavoriteMovies, setCurrentFavoriteMovies]
  );

  const movieComponents = movies.map((movie: Movie) =>
    MovieComponent(movie, setLikedMoviesCallback)
  );

  return (
    <div
      style={{
        backgroundColor: "#A8A8A8",
        width: "65%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "20px",
      }}
    >
      {movieComponents}
    </div>
  );
}

export default Movies;
