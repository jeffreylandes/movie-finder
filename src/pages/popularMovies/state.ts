import { atom, selector } from "recoil";
import { Actor, fetchActorsFromMovie } from "../../fetch/fetchActors";
import { ActorAndMovies, fetchPersonsMovies } from "../../fetch/fetchNewMovies";
import {
  fetchPopularMovies,
  isMovieFiltered,
  Movie,
} from "../../fetch/fetchPopularMovies";

export type movieFilter = {
  key: string; // Could make enum
  value: string;
};

export const newMoviesSelected = atom<boolean>({
    key: "NewMoviePage",
    default: false
})

export const movieFilters = atom<Set<movieFilter>>({
  key: "DesiredMovieFilters",
  default: new Set(),
});

export const popularMovies = atom<Movie[]>({
  key: "PopularMovies",
  default: [],
});

export const popularMoviesSelector = selector<Movie[]>({
  key: "PopularMoviesSelector",
  get: async ({ get }) => {
    const filters = Array.from(get(movieFilters));
    const allPopularMovies = await fetchPopularMovies();
    if (filters.length === 0) {
      return allPopularMovies;
    }
    const filteredPopularMovies = allPopularMovies.filter((movie) =>
      filters
        .map((filter) => isMovieFiltered(movie, filter))
        .some((bool) => bool)
    );
    return filteredPopularMovies;
  },
});

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
