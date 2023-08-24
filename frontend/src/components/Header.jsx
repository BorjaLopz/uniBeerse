import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

function Header({ handleCustomFilter }) {
  const [filter, setFilter] = useState("");

  const handleFilter = (_filter) => {
    setFilter(_filter);
    handleCustomFilter(_filter);
  };
  
  return (
    <>
      <header>
        <div id="mainIcon">Icono</div>
        <menu>
          <Link to="/">Inicio</Link>
          <Link to="/beer">Cervezas</Link>
          <Link to="/styles">Estilos</Link>
          <Link to="/contact">Contacto</Link>
        </menu>
        <SearchBar handleFilter={handleFilter} />
      </header>
    </>
  );
}

export default Header;
