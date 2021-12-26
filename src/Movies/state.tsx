import { atom, selector } from "recoil";
import { Actor, fetchActorsFromMovie } from "./fetchActors";
import { ActorAndMovies, fetchPersonsMovies } from "./fetchNewMovies";
import { Movie } from "./fetchPopularMovies";

export const favoriteMovies = atom<Set<Movie>>({
  key: "FavoriteMovies",
  default: new Set(),
});

export const actorSelector = selector<Set<Actor>>({
  key: "ActorSelector",
  get: async ({ get }) => {
    const currentFavoriteMovies = get(favoriteMovies);
    const fetchActorRequests = Array.from(currentFavoriteMovies).map(
      (movie: Movie) => fetchActorsFromMovie(movie)
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

export const newFavoriteMovies = selector<ActorAndMovies[]>({
  key: "NewMovieSelector",
  get: async ({ get }) => {
    const currentActors = get(actorSelector);
    const actorAndMovieRequests = Array.from(currentActors).map((actor) =>
      fetchPersonsMovies(actor)
    );

    const actorsAndMovies: ActorAndMovies[] = await Promise.all(
      actorAndMovieRequests
    ).then((response) => response);
    return actorsAndMovies;
  },
});
