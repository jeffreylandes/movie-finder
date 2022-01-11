import { useRecoilValue } from "recoil";
import "./App.css";
import { NewMoviePage } from "./pages/newMovies/NewMoviePage";
import { PopularMovies } from "./pages/popularMovies/PopularMoviesPage";
import { newMoviesSelected } from "./pages/popularMovies/state";

function App() {
  const isNewMoviesSelected = useRecoilValue(newMoviesSelected);
  return (
    <div>
      {!isNewMoviesSelected && (
        <PopularMovies />
      )}
      {isNewMoviesSelected && (
        <NewMoviePage />
      )}
    </div>
  );
}

export default App;
