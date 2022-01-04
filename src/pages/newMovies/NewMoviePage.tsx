import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { ActorAndMovies } from "../../Movies/fetchNewMovies";
import { newFavoriteMovies } from "../../Movies/state";
import { MoviePopularityComponent } from "./MoviePopularityComponent";
import { displayTypeAtom, Navbar } from "./NavbarNewMovies";

function ActorComponent(newMovies: ActorAndMovies[]) {
  return <></>;
}

function NewMovies() {
  const displayType = useRecoilValue(displayTypeAtom);
  const newMovies = useRecoilValueLoadable(newFavoriteMovies);
  const newMoviesLoading = newMovies.state === "loading";
  const hasError = newMovies.state === "hasError";

  if (hasError) {
    throw new Error("Unable to fetch new movies.");
  }

  if (newMoviesLoading) {
    return <div></div>;
  }

  switch (displayType) {
    case "By Movie Popularity": {
      return MoviePopularityComponent(newMovies.contents);
    }
    case "By Actor / Actress": {
      return ActorComponent(newMovies.contents);
    }
    default: {
      return <></>;
    }
  }
}

export function NewMoviePage() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <NewMovies />
    </div>
  );
}
