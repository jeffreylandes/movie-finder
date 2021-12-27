import { atom, selector } from "recoil";
import { movieFilter, movieFilters } from "../Navbar/state";
import { animationGenre, genresMap } from "./genres";

const readAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTMyMjc1M2MxOTgzOWRlZTUxOGJhNjkyN2Q4Zjk2YSIsInN1YiI6IjYxYjE1ZmIxNTgwMGM0MDAxOTlhMGQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZC3BOQSiAR4sQY0axoNID0byNXGlrouNz6AuP4z5Zk";
export const headers = {
    "Authorization": `Bearer ${readAccessToken}`
};

const NUM_PAGES = 500;

export type Movie = {
  id: string;
  name: string;
  poster: string;
  releaseDate: string;
  genres: Array<string>;
  overview: string;
};

export const popularMovies = atom<Movie[]>({
  key: "PopularMovies",
  default: []
})

function movieWithinTimeframe(movie: Movie, time: string): boolean {
  if (movie.releaseDate === undefined) {
    return false;
  }
  const releaseDate = parseInt(movie.releaseDate.substring(0, 4));
  const yearLow = parseInt(time);
  const yearHigh = parseInt(time) + 10;
  return releaseDate < yearHigh && releaseDate >= yearLow;
}

function movieHasGenre(movie: Movie, genre: string): boolean {
  for (const movieGenre of movie.genres) {
    if (movieGenre === genre) {
      return true;
    }
  }
  return false;
}

function isMovieFiltered(movie: Movie, filter: movieFilter): boolean {
  switch (filter.key) {
    case "time": {
      return movieWithinTimeframe(movie, filter.value);
    }
    case "genre":
      return movieHasGenre(movie, filter.value);
    default:
      return false;
  }
}

export const popularMoviesSelector = selector<Movie[]>({
  key: "PopularMoviesSelector",
  get: async ( {get} ) => {
    const filters = Array.from(get(movieFilters));
    const allPopularMovies = await fetchPopularMovies();
    if (filters.length === 0) {
      return allPopularMovies;
    }
    const filteredPopularMovies = allPopularMovies.filter(
      (movie) => filters.map((filter) => isMovieFiltered(movie, filter)).some(bool => bool)
    )
    return filteredPopularMovies;
  }
});

async function requestPage(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=9e322753c19839dee518ba6927d8f96a&page=${page}`;
  const responseData = await fetch(url, { headers: headers })
    .then((response) => response.json())
    .then((data) => data.results);
  return responseData;
}

function getMovieGenres(movie: any) {
  const genres = movie.genre_ids;
  return genres.map((genreId: number) => genresMap.get(genreId))
}

async function fetchPopularMovies(): Promise<Movie[]> {
  const allPages = Array.from(Array(NUM_PAGES).keys());
  const requestPromises = allPages.map((pageNumber) =>
    requestPage(pageNumber + 1)
  );
  const responseMovies = await Promise.all(requestPromises).then(
    (response) => response
  );
  const responseMoviesFlattened = responseMovies.reduce(
      (accumulator, value) => accumulator.concat(value, [])
  )
  const englishLanguageMovies = responseMoviesFlattened.filter(
    (movie: any) => movie.original_language === "en" && !(movie.genre_ids.includes(animationGenre))
  )
  const popularMovies = englishLanguageMovies.map((movie: any) => ({
    id: movie.id,
    name: movie.original_title,
    poster: movie.poster_path,
    releaseDate: movie.release_date,
    genres: getMovieGenres(movie),
    overview: movie.overview,
  }));
  return popularMovies;
}
