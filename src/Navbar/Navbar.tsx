import { useState } from "react";

const buttonStyle = {
  backgroundColor: "gray",
  fontSize: "100%",
  borderColor: "gray",
  borderStyle: "none",
};

const outerListStyle = {
  listStyleType: "none",
  paddingLeft: "10px",
};
const innerListStyle = {
  listStyleType: "none",
  paddingLeft: "30px",
};

function LeafButton(genre: string) {
  return (
    <li>
      <button style={buttonStyle}>{genre}</button>
    </li>
  );
}

function GenreList() {
  const [clicked, setClicked] = useState(false);
  const genres = ["Comedy", "Drama", "Romance", "Western"];
  const genreComponents = genres.map((genre) => LeafButton(genre));
  const onClick = () => {
    setClicked(!clicked);
  };
  return (
    <div>
      <li>
        <button style={buttonStyle} onClick={onClick}>
          Genre
        </button>
      </li>
      {clicked && <ul style={innerListStyle}>{genreComponents}</ul>}
    </div>
  );
}

function DecadeOfRelease() {
  const [clicked, setClicked] = useState(false);
  const times = ["2020", "2010", "2000", "1990", "1980", "1970", "1960"];
  const decadeComponents = times.map((time) => LeafButton(time));
  const onClick = () => {
    setClicked(!clicked);
  };
  return (
    <div>
      <li>
        <button style={buttonStyle} onClick={onClick}>
          Decade of Release
        </button>
      </li>
      {clicked && <ul style={innerListStyle}>{decadeComponents}</ul>}
    </div>
  );
}

export function Navbar() {
  return (
    <div style={{ width: "15%", backgroundColor: "gray" }}>
      <ul style={outerListStyle}>
        <li>
          <button style={buttonStyle}>Movie Filters</button>
        </li>
        <ul style={innerListStyle}>
          <GenreList />
          <DecadeOfRelease />
        </ul>
      </ul>
    </div>
  );
}
