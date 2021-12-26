import { Actor } from "./fetchActors";
import { headers } from "./fetchPopularMovies";
import { animationGenre } from "./genres";

export type SlimMovie = {
  movieId: string;
  title: string;
  posterPath: string;
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
  const url = `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=9e322753c19839dee518ba6927d8f96a`;
  const movies: Array<any> = await fetch(url, { headers: headers })
    .then((response) => response.json())
    .then((allMovies) => allMovies.cast);
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
  }));

  const actorAndMovies = {
    actor: actor,
    movies: finalSlimMovies,
  };
  return actorAndMovies;
}
