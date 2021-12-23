import { useSetRecoilState } from "recoil"
import { newMoviesSelected } from "./state"

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
    const onClick = () => {
        setNewMoviesPage(true);
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