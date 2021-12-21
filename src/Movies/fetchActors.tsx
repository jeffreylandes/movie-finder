import { headers } from "./fetchPopularMovies";

const ACTOR_POPULARITY_THRESHOLD = 5;

export async function fetchActorsFromMovie(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9e322753c19839dee518ba6927d8f96a`;
  const actors = await fetch(url, { headers: headers }).then((response) =>
    response.json()
  );
  const popularActors = actors.cast.filter(
    (person: any) =>
      person.known_for_department === "Acting" &&
      person.popularity > ACTOR_POPULARITY_THRESHOLD
  );
  
  return popularActors;
}
