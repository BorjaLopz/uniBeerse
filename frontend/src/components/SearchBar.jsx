import { useState, useEffect } from "react";
import SearchIcon from "./SearchIcon";
import useServer from "../hooks/useServer";
import { removingAccents } from "../helpers";

function SearchBar({ handleFilter }) {
  const [inputText, setInputText] = useState("");
  const [beers, setBeers] = useState([]);
  const { get } = useServer();

  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });
    setBeers(data.data);
  };

  useEffect(() => {
    getBeers();
  }, [inputText]);


  let inputHandler = (e) => {
    let LowerText = removingAccents(e.target.value.toLowerCase());
    setInputText(LowerText);
    handleFilter(LowerText);
  };

  // console.log("inputText");
  // console.log(inputText);

  
  return (
    <>
      <section>
        <div>
          <input
            type="search"
            name="search"
            placeholder="Busqueda"
            onChange={inputHandler}
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </section>
    </>
  );
}

export default SearchBar;

/* <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700 mx-auto">
      { MAIN TITLE}
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <span className="font-semibold text-xl tracking-tight">Cervezas</span>
        </div>
      </div>
      {/MENU }
      <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div className="text-md font-bold text-blue-700 lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
          >
            Home
          </Link>
          <Link
            to="/beer"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
          >
            Cervezas
          </Link>
          <Link
            to="/styles"
            className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
          >
            Estilos
          </Link>
          <Link
            to="/add"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
          >
            Añadir Cerveza
          </Link>
          <Link
            to="/contact"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
          >
            Contacto
          </Link>
        </div>
      </div>
      {DROPDOWN MENU}
      <DropdownComponent /> { SEARCH BAR}
      <div className="relative mx-auto text-gray-600 lg:block hidden">
        <input
          className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Busqueda"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
          <SearchIcon />
        </button>
      </div>
    </nav>*/
