import { useRecoilValue, useSetRecoilState } from "recoil"
import { favoriteMovies, newMoviesSelected } from "./state";

const buttonStyle = {
    "backgroundColor": "green",
    "fontSize": "16px",
    "border": "none",
    "padding": "15px 32px",
    "borderRadius": "8px",
    "fontFamily": "Trebuchet MS"
}


export function OrderButton() {
    const setNewMoviesPage = useSetRecoilState(newMoviesSelected);
    const userFavoriteMovies = useRecoilValue(favoriteMovies);

    const onClick = () => {
        if (userFavoriteMovies.size !== 0) {
            setNewMoviesPage(true);
        } else {
            alert("No movies have been selected!")
        }
    }
    return (
        <div style={{
            "position": "fixed",
            "bottom": 20,
            "right": 40,
        }}>
            <button style={buttonStyle} onClick={onClick}>Find New Movies!</button>
        </div>
    )
}