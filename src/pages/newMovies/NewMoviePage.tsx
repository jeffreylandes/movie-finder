import { useRecoilValueLoadable } from "recoil";
import { ActorAndMovies, SlimMovie } from "../../Movies/fetchNewMovies";
import { getFullUrlFromPoster } from "../../Movies/Movies";
import { newFavoriteMovies } from "../../Movies/state";

function MovieImg(posterPath: string) {
    const moviePosterPath = getFullUrlFromPoster(posterPath);
    return <img src={moviePosterPath} width={"300px"} height={"300px"}></img>
}

function ActorAndMoviesComponent(actorAndMovies: ActorAndMovies) {
    const actorProfilePath = getFullUrlFromPoster(actorAndMovies.actor.profilePath);
    const movieComponents = actorAndMovies.movies.map((movie: SlimMovie) => MovieImg(movie.posterPath));
    return (
        <div style={{width: "100000px"}}>
            <img src={actorProfilePath} width={"300px"} height={"300px"}></img>
            {movieComponents}
        </div>
    )
}

export function NewMoviePage() {
    const newMovies = useRecoilValueLoadable(newFavoriteMovies);
    const newMoviesLoading = newMovies.state === "loading";
    const hasError = newMovies.state === "hasError";

    if (hasError) {
        throw new Error("Unable to fetch new movies.");
    }

    if (newMoviesLoading) {
        return <div></div>
    }
    const newMovieComponents = newMovies.contents.map(
        (actorAndMovie: ActorAndMovies) => ActorAndMoviesComponent(actorAndMovie)
    )
    return <div style={{overflowX: "scroll"}}>
        {newMovieComponents}
    </div>
}