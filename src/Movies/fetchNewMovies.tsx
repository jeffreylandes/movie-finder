import { movieFetch, requestParams } from "../fetch/axiosFetch";
import { Actor } from "./fetchActors";
import { animationGenre } from "./genres";

export type SlimMovie = {
  movieId: string;
  title: string;
  posterPath: string;
  popularity: number;
};

export type ActorAndMovies = {
  actor: Actor;
  movies: SlimMovie[];
};

function compareTwoMoviesPopularity(movieOne: any, movieTwo: any): number {
  const result = movieOne.popularity >= movieTwo.popularity ? -1 : 1;
  return result;
}

function characterIsCredited(characterName: string | undefined) {
  if (characterName) {
    return !characterName.includes("uncredited");
  }
  return false;
}

export async function fetchPersonsMovies(
  actor: Actor
): Promise<ActorAndMovies> {
  const url = `/person/${actor.id}/movie_credits`;
  const movies: Array<any> = await movieFetch.get(url, requestParams)
    .then((response: any) => response.data.cast)
  const moviesSortedByPopularity = movies.sort(compareTwoMoviesPopularity);
  const creditedMovies = moviesSortedByPopularity.filter(
    (movie) =>
      characterIsCredited(movie.character) &&
      movie.id !== actor.originalMovie.id &&
      !(movie.genre_ids.includes(animationGenre))
  );
  const finalTenMovies = creditedMovies.slice(0, 10);
  const finalSlimMovies = finalTenMovies.map((movie: any) => ({
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    popularity: movie.popularity,
  }));

  const actorAndMovies = {
    actor: actor,
    movies: finalSlimMovies,
  };
  return actorAndMovies;
}
