import React from "react";

function SearchIcon({ className = "w-6 h-6", }) {
  return (
    <>
      <svg
        // width="800px"
        // height="800px"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={className}
        // stroke="#000000"
      >
        <circle cx="32" cy="32" r="24" />
        <circle cx="28" cy="28" r="8" />
        <line x1="44" y1="44" x2="33.66" y2="33.66" />
      </svg>
    </>
  );
}

export default SearchIcon;
