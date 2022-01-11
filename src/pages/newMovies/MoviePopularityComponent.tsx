import { Actor } from "../../Movies/fetchActors";
import { ActorAndMovies, SlimMovie } from "../../Movies/fetchNewMovies";
import { getFullUrlFromPoster } from "../../Movies/Movies";
import { DisplayImage } from "./ActorListComponent";

type MovieAndActor = {
  movie: SlimMovie;
  actor: Actor;
};

type MovieAndActors = {
  movie: SlimMovie;
  actors: Actor[];
};

function MovieAndActorsComponent(movieAndActors: MovieAndActors) {
  const { movie, actors } = movieAndActors;
  const actorsImages = actors.map((actor) =>
    DisplayImage(
      getFullUrlFromPoster(actor.profilePath),
      actor.name,
      false,
      actor.originalMovie.name
    )
  );
  const movieImage = DisplayImage(
    getFullUrlFromPoster(movie.posterPath),
    movie.title,
    true
  );
  return (
    <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
      {movieImage}
      {actorsImages}
    </div>
  );
}

function sortByMoviePopularity(
  movieOne: MovieAndActors,
  movieTwo: MovieAndActors
) {
  return movieOne.movie.popularity >= movieTwo.movie.popularity ? -1 : 1;
}

export function MoviePopularityComponent(newMovies: ActorAndMovies[]) {
  const flatMovies: MovieAndActor[] = newMovies.flatMap(
    (actorAndMovies: ActorAndMovies) =>
      actorAndMovies.movies.map((movie: SlimMovie) => ({
        movie: movie,
        actor: actorAndMovies.actor,
      }))
  );
  const movieToActorsMap = new Map<string, MovieAndActors>();
  flatMovies.forEach((movieAndActor: MovieAndActor) => {
    const movieId = movieAndActor.movie.movieId;
    const actors = movieToActorsMap.get(movieId);
    const newActors =
      actors !== undefined
        ? actors.actors.concat([movieAndActor.actor])
        : [movieAndActor.actor];
    const movieAndActors: MovieAndActors = {
      movie: movieAndActor.movie,
      actors: newActors,
    };
    movieToActorsMap.set(movieId, movieAndActors);
  });
  const movieToActors = Array.from(movieToActorsMap.values()).sort(
    (movieOne, movieTwo) => sortByMoviePopularity(movieOne, movieTwo)
  );
  const components = movieToActors.map((movieAndActors) =>
    MovieAndActorsComponent(movieAndActors)
  );
  return <div style={{ width: "85%", overflowX: "scroll" }}>{components}</div>;
}
