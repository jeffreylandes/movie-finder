import { atom, selector } from "recoil";
import { fetchActorsFromMovie } from "./fetchActors";
import { Movie } from "./fetchPopularMovies";

type Actor = {
    id: string;
    name: string;
  };

export const favoriteMovies = atom<Set<Movie>>({
    key: "FavoriteMovies",
    default: new Set()
})

const actorSelector = selector<Set<Actor>>({
    key: "ActorSelector",
    get: async ({ get }) => {
      const currentFavoriteMovies = get(favoriteMovies);
      const fetchActorRequests = Array.from(currentFavoriteMovies).map(
        (movie: Movie) => fetchActorsFromMovie(movie.id)
      );
      const allPopularActors = await Promise.all(fetchActorRequests).then(
        (response) => response
      );
      const allPopularActorsFlattened = allPopularActors.reduce(
        (accumulator, value) => accumulator.concat(value, [])
      );
      const finalActors: Set<Actor> = new Set(allPopularActorsFlattened);
      return finalActors;
    },
  });