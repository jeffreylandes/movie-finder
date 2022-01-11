import { ActorAndMovies, SlimMovie } from "../../fetch/fetchNewMovies";
import { getFullUrlFromPoster } from "../popularMovies/Movies";

function getTitleBasedOnMovie(title: string): string {
  return `Because you liked ${title}`
}

export function DisplayImage(path: string, header: string, bold: boolean, title?: string) {
  const fontWeight = bold ? "bold" : "normal";
  const imgTitle = title !== undefined ? getTitleBasedOnMovie(title) : undefined;
  return (
    <div>
      <h4
        style={{
          textAlign: "center",
          maxWidth: "300px",
          maxHeight: "15px",
          fontFamily: "Trebuchet MS",
          fontWeight: fontWeight,
        }}
      >
        {header}
      </h4>
      <img src={path} width={300} height={300} alt={header} title={imgTitle}/>
    </div>
  );
}

function ActorAndMoviesComponent(actorAndMovies: ActorAndMovies) {
  const { actor, movies } = actorAndMovies;
  const actorComponent = DisplayImage(
    getFullUrlFromPoster(getFullUrlFromPoster(actor.profilePath)),
    actor.name,
    true,
    actor.originalMovie.name,
  );
  const movieComponents = movies.map((movie: SlimMovie) =>
    DisplayImage(getFullUrlFromPoster(movie.posterPath), movie.title, false)
  );
  return (
    <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
      {actorComponent}
      {movieComponents}
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
    ActorAndMoviesComponent(actorAndMovie)
  );
  return (
    <div style={{ width: "85%", overflowX: "scroll" }}>
      {actorComponents}
    </div>
  );
}
