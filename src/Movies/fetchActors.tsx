import { headers } from "./fetchPopularMovies";

const ACTOR_POPULARITY_THRESHOLD = 5;

export type Actor = {
  id: string;
  name: string;
  profilePath: string;
};

export async function fetchActorsFromMovie(movieId: string): Promise<Actor[]> {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9e322753c19839dee518ba6927d8f96a`;
  const actors = await fetch(url, { headers: headers }).then((response) =>
    response.json()
  );
  const popularActors = actors.cast.filter(
    (person: any) =>
      person.known_for_department === "Acting" &&
      person.popularity > ACTOR_POPULARITY_THRESHOLD
  );
  const finalActors = popularActors.map(
    (person: any) => ({
      id: person.id,
      name: person.name,
      profilePath: person.profile_path,
    })
  )
  
  return finalActors;
}
