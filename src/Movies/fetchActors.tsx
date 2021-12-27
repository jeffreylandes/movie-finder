import { movieFetch, requestParams } from "../fetch/axiosFetch";
import { Movie } from "./fetchPopularMovies";

const ACTOR_POPULARITY_THRESHOLD = 5;

export type Actor = {
  id: string;
  name: string;
  profilePath: string;
  originalMovie: Movie;
};

export async function fetchActorsFromMovie(movie: Movie): Promise<Actor[]> {
  const url = `/movie/${movie.id}/credits`;
  const actors = await movieFetch.get(url, requestParams).then((response: any) =>
    response.data
  );
  const popularActors = actors.cast.filter(
    (person: any) =>
      person.known_for_department === "Acting" &&
      person.popularity > ACTOR_POPULARITY_THRESHOLD
  );
  const finalActors = popularActors.map((person: any) => ({
    id: person.id,
    name: person.name,
    profilePath: person.profile_path,
    originalMovie: movie,
  }));

  return finalActors;
}
