import { useRecoilValue } from "recoil";
import "./App.css";
import Movies from "./Movies/Movies";
import { Navbar } from "./Navbar/Navbar";
import { OrderButton } from "./Order/OrderButton";
import { newMoviesSelected } from "./Order/state";
import { NewMoviePage } from "./pages/newMovies/NewMoviePage";

function App() {
  const isNewMoviesSelected = useRecoilValue(newMoviesSelected);
  console.log(isNewMoviesSelected);
  return (
    <div>
      {!isNewMoviesSelected && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Navbar />
            <Movies />
          </div>
          <OrderButton />
        </div>
      )}
      {isNewMoviesSelected && (
        <NewMoviePage />
      )}
    </div>
  );
}

export default App;
