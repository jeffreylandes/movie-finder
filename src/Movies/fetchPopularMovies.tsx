import { selector } from "recoil";

const readAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTMyMjc1M2MxOTgzOWRlZTUxOGJhNjkyN2Q4Zjk2YSIsInN1YiI6IjYxYjE1ZmIxNTgwMGM0MDAxOTlhMGQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZC3BOQSiAR4sQY0axoNID0byNXGlrouNz6AuP4z5Zk";
export const headers = {
    "Authorization": `Bearer ${readAccessToken}`
};

const NUM_PAGES = 10;

export type Movie = {
  id: string;
  name: string;
  poster: string;
  releaseDate: string;
};

export const PopularMovies = selector<Movie[]>({
  key: "popularMovies",
  get: async () => {
    return await fetchPopularMovies();
  },
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
  const popularMovies = responseMoviesFlattened.map((movie: any) => ({
    id: movie.id,
    name: movie.original_title,
    poster: movie.poster_path,
    releaseDate: movie.release_date,
  }));
  return popularMovies;
}
