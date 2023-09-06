import { useState } from "react";
import SearchIcon from "../SearchIcon";
import { removingAccents } from "../../helpers";
import { useLocation } from "react-router-dom";

import "./style.css";

function SearchBar({ handleFilter }) {
  const [inputText, setInputText] = useState("");
  const location = useLocation();

  let inputHandler = (e) => {
    let LowerText = removingAccents(e.target.value.toLowerCase());
    setInputText(LowerText);
    handleFilter(LowerText);
  };

  return (
    <>
      {location.pathname === "/beers" ? (
        <>
          {" "}
          <section id="search-bar-input">
            <div className="search">
              <input
                type="search"
                name="search"
                placeholder="Busqueda"
                onChange={inputHandler}
              />
            </div>
          </section>
        </>
      ) : (
        <>
          <section id="disabled-search-bar">
            <div className="search">
              <input
                type="search"
                name="search"
                disabled
                onChange={inputHandler}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SearchBar;

/*{currentPath === "/beers" ?  (<>
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
    </>) : ""})
    */
