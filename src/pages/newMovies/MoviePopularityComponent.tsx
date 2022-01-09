import { Actor } from "../../Movies/fetchActors";
import { ActorAndMovies, SlimMovie } from "../../Movies/fetchNewMovies";
import { getFullUrlFromPoster } from "../../Movies/Movies";

type MovieAndActor = {
  movie: SlimMovie;
  actor: Actor;
};

type MovieAndActors = {
  movie: SlimMovie;
  actors: Actor[];
};

function ActorImage(actor: Actor) {
  return (
    <img
      src={getFullUrlFromPoster(actor.profilePath)}
      width={"300px"}
      height={"300px"}
      alt={`Headshot of ${actor.name}`}
    ></img>
  );
}

function MovieAndActorsComponent(movieAndActors: MovieAndActors) {
  const actors = movieAndActors.actors.map((actor) => ActorImage(actor));
  return (
    <div>
      <img
        src={getFullUrlFromPoster(movieAndActors.movie.posterPath)}
        width={"300px"}
        height={"300px"}
        alt={movieAndActors.movie.title}
      ></img>
      {actors}
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
  return (
    <div style={{ width: "85%", backgroundColor: "gray" }}>{components}</div>
  );
}
