import { useState } from "react";
import SearchIcon from "../SearchIcon";
import { removingAccents } from "../../helpers";

import "./style.css";

function SearchBar({ handleFilter }) {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    let LowerText = removingAccents(e.target.value.toLowerCase());
    setInputText(LowerText);
    handleFilter(LowerText);
  };

  return (
    <>
      <section id="search-bar-input">
        <div>
          <input
            type="search"
            name="search"
            placeholder="Busqueda"
            onChange={inputHandler}
          />
          <div id="search-icon">
            <SearchIcon />
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchBar;
