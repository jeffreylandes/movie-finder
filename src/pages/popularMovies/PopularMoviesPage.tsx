import { LikedMovies } from "../../Movies/LikedMovies";
import Movies from "../../Movies/Movies";
import { Navbar } from "../../Navbar/Navbar";
import { OrderButton } from "../../Order/OrderButton";

export function PopularMovies() {
    return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Navbar />
            <Movies />
            <LikedMovies />
          </div>
          <OrderButton />
        </div>
    )
}