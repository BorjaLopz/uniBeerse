import PruebaSVG from "./PruebaSVG";

function SearchBar() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700 mx-auto">
      {/* MAIN TITLE */}
      <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <span class="font-semibold text-xl tracking-tight">Cervezas</span>
        </div>
      </div>

      {/* MENU */}
      <div class="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div class="text-md font-bold text-blue-700 lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Catalogo
          </a>
          <a
            href="#responsive-header"
            class=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Contacto
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Sobre mí
          </a>
        </div>
      </div>

      {/* SEARCH BAR*/}
      <div class="relative mx-auto text-gray-600 lg:block hidden">
        <input
          class="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Busqueda"
        />
        <button type="submit" class="absolute right-0 top-0 mt-2 mr-2">
          <PruebaSVG />
        </button>
      </div>
    </nav>
  );
}

export default SearchBar;
