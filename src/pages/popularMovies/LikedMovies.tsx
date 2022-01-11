import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Movie } from "../../fetch/fetchPopularMovies";
import { getFullUrlFromPoster } from "./Movies";
import { favoriteMovies } from "./state";

function LikedMovieComponent(
  movie: Movie,
  unsetLikedMovieCallback: (movie: Movie) => void
) {
  const fullPosterUrl = getFullUrlFromPoster(movie.poster);
  const onClick = () => {
    unsetLikedMovieCallback(movie);
  };
  return (
    <img
      src={fullPosterUrl}
      height={300}
      width={300}
      alt={movie.overview}
      onClick={onClick}
    />
  );
}

export function LikedMovies() {
  const [likedMovies, setLikedMovies] = useRecoilState(favoriteMovies);

  const unsetLikedMovieCallback = useCallback(
    (movie: Movie) => {
      likedMovies.delete(movie);
      setLikedMovies(new Set(likedMovies));
    },
    [likedMovies, setLikedMovies]
  );

  const likedMovieComponents = Array.from(likedMovies).map((movie: Movie) =>
    LikedMovieComponent(movie, unsetLikedMovieCallback)
  );
  return (
    <div style={{ width: "15%", textAlign: "center" }}>
      <h3>Liked Movies</h3>
      {likedMovieComponents}
    </div>
  );
}
