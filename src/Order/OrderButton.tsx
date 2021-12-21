const buttonStyle = {
    "backgroundColor": "green",
    "fontSize": "16px",
    "border": "none",
    "padding": "15px 32px",
    "borderRadius": "8px",
    "fontFamily": "Trebuchet MS"
}


export function OrderButton() {
    return (
        <div style={{
            "position": "fixed",
            "bottom": 20,
            "right": 40,
        }}>
            <button style={buttonStyle}>Find New Movies!</button>
        </div>
    )
}