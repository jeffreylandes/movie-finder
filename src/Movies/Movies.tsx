import { useCallback } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { Movie, PopularMovies } from "./fetchPopularMovies";
import { favoriteMovies } from "./state";

const getFullUrlFromPoster = (poster: string) =>
  `https://image.tmdb.org/t/p/w500/${poster}`;

const getAltTextFromMovieName = (name: string) =>
  `Official movie poster for ${name}`;

function MovieComponent(
  movie: Movie,
  movieInFavorites: any,
) {
  const { name, poster, } = movie;
  const fullPosterUrl = getFullUrlFromPoster(poster);
  const altText = getAltTextFromMovieName(name);

  const onClick = () => {
    movieInFavorites(movie);
  }

  console.log("here")

  return (
    <div>
      <h4 style={{ textAlign: "center", maxWidth: "300px", maxHeight: "15px" }}>{name}</h4>
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
  const popularMovies = useRecoilValueLoadable(PopularMovies);
  const currentFavoriteMovies = useRecoilValue(favoriteMovies);

  const movieInFavorites = useCallback(
    (movie: Movie) => {
      if (!currentFavoriteMovies.has(movie)) {
        currentFavoriteMovies.add(movie);
      } else {
        currentFavoriteMovies.delete(movie);
      }
    },
    [currentFavoriteMovies]
  )

  if (popularMovies.state === "loading") {
    return <></>;
  }

  const movieComponents = popularMovies.contents.map((movie: Movie) =>
    MovieComponent(movie, movieInFavorites)
  );

  return (
    <div
      style={{
        backgroundColor: "#A8A8A8",
        width: "85%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "10px"
      }}
    >
      {movieComponents}
    </div>
  );
}

export default Movies;
