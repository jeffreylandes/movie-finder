import { ActorAndMovies } from "../../Movies/fetchNewMovies";
import { getFullUrlFromPoster } from "../../Movies/Movies";

function ActorAndMovieComponent(actorAndMovie: ActorAndMovies) {
  return (
    <div>
      <img
        width={300}
        height={300}
        src={getFullUrlFromPoster(actorAndMovie.actor.profilePath)}
      />
    </div>
  );
}

function getMostPopularActor(actorA: ActorAndMovies, actorB: ActorAndMovies) {
  return actorA.actor.popularity > actorB.actor.popularity ? -1 : 1;
}

export function ActorListComponent(actorsAndMovies: ActorAndMovies[]) {
  const actorsAndMoviesCopied = [...actorsAndMovies];
  const actorsAndMoviesSorted = actorsAndMoviesCopied.sort(getMostPopularActor);
  const actorComponents = actorsAndMoviesSorted.map((actorAndMovie) =>
    ActorAndMovieComponent(actorAndMovie)
  );
  return (
    <div style={{ width: "85%", backgroundColor: "gray" }}>
      {actorComponents}
    </div>
  );
}
