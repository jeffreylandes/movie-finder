import { useState } from "react";
import { useRecoilState } from "recoil";
import { genresMap } from "./genres";
import { movieFilter, movieFilters } from "./state";

const buttonStyle = {
  backgroundColor: "gray",
  borderColor: "gray",
  borderStyle: "none",
  fontFamily: "Trebuchet MS",
  fontSize: "20px",
};

const outerListStyle = {
  listStyleType: "none",
  paddingLeft: "10px",
  paddingTop: "5px",
};
const innerListStyle = {
  listStyleType: "none",
  paddingLeft: "30px",
};


function deleteFromSet(set: Set<movieFilter>, filter: movieFilter) {
  set.forEach(
    (setFilter) => {
      if (setFilter.key === filter.key && setFilter.value === filter.value) {
        set.delete(setFilter)
      }
    }
  )
}


// TODO: Make more general Button class since they share so much logic anyways
function LeafButton(filter: movieFilter) {
  const [clicked, setClicked] = useState(false);
  const [filters, setFilters] = useRecoilState(movieFilters);

  const onClick = () => {
    if (!clicked) {
        filters.add(filter);
        setFilters(new Set(filters));
    } else {
        deleteFromSet(filters, filter)
        setFilters(new Set(filters));
    }
    setClicked(!clicked);
  };
  const finalStyle = clicked
    ? { ...buttonStyle, fontWeight: "bold" }
    : buttonStyle;

  return (
    <li>
      <button style={finalStyle} onClick={onClick}>
        {filter.value}
      </button>
    </li>
  );
}

function GenreList() {
  const [clicked, setClicked] = useState(false);
  const genres = Array.from(genresMap.values());
  const genreComponents = genres.map((genre) => LeafButton({key: "genre", value: genre}));
  const onClick = () => {
    setClicked(!clicked);
  };
  const finalStyle = clicked
    ? { ...buttonStyle, fontWeight: "bold" }
    : buttonStyle;
  return (
    <div>
      <li>
        <button style={finalStyle} onClick={onClick}>
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
  const decadeComponents = times.map((time) => LeafButton({key: "time", value: time}));
  const onClick = () => {
    setClicked(!clicked);
  };
  const finalStyle = clicked
    ? { ...buttonStyle, fontWeight: "bold" }
    : buttonStyle;
  return (
    <div>
      <li>
        <button style={finalStyle} onClick={onClick}>
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
