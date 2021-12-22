import { atom, selector } from "recoil";
import { movieFilters } from "../Navbar/state";

const readAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTMyMjc1M2MxOTgzOWRlZTUxOGJhNjkyN2Q4Zjk2YSIsInN1YiI6IjYxYjE1ZmIxNTgwMGM0MDAxOTlhMGQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZC3BOQSiAR4sQY0axoNID0byNXGlrouNz6AuP4z5Zk";
export const headers = {
    "Authorization": `Bearer ${readAccessToken}`
};

const NUM_PAGES = 100;

export type Movie = {
  id: string;
  name: string;
  poster: string;
  releaseDate: string;
};

export const popularMovies = atom<Movie[]>({
  key: "PopularMovies",
  default: []
})

function movieWithinTimeframe(movie: Movie, time: string): boolean {
  if (movie.releaseDate === undefined) {
    console.log(movie);
    return false;
  }
  const releaseDate = parseInt(movie.releaseDate.substring(0, 4));
  const yearLow = parseInt(time);
  const yearHigh = parseInt(time) + 10;
  return releaseDate < yearHigh && releaseDate >= yearLow;
}

export const popularMoviesSelector = selector<Movie[]>({
  key: "PopularMoviesSelector",
  get: async ( {get} ) => {
    const filters = Array.from(get(movieFilters));
    let popularMovies = await fetchPopularMovies();
    if (filters.length === 0) {
      return popularMovies;
    }
    for (let filter of filters) {
      switch (filter.key) {
        case "time": {
          popularMovies = popularMovies.filter((movie) => movieWithinTimeframe(movie, filter.value) )
        }
      }
    }
    return popularMovies;
  }
});

async function requestPage(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=9e322753c19839dee518ba6927d8f96a&page=${page}`;
  const responseData = await fetch(url, { headers: headers })
    .then((response) => response.json())
    .then((data) => data.results);
  return responseData;
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
    (movie: any) => movie.original_language === "en"
  )
  const popularMovies = englishLanguageMovies.map((movie: any) => ({
    id: movie.id,
    name: movie.original_title,
    poster: movie.poster_path,
    releaseDate: movie.release_date,
  }));
  return popularMovies;
}
