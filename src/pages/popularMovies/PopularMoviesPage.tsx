import { LikedMovies } from "./LikedMovies";
import Movies from "./Movies";
import { Navbar } from "./Navbar";
import { OrderButton } from "./OrderButton";

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