import { useEffect, useState, useContext } from "react";
import useServer from "../hooks/useServer";
import LoadingComponent from "./LoadingComponent";

import CustomPagination from "./CustomPagination";
import CustomBeerCard from "./CustomBeerCard/CustomBeerCard";
import { removingAccents } from "../helpers";

function AllBeersComponent({ customFilter }) {
  const [beers, setBeers] = useState([]);
  const { get } = useServer();
  const [loading, setLoading] = useState(false);
  let filteredBeers = [];

  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;

  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });
    setLoading(true);
    setBeers(data.data);
  };

  useEffect(() => {
    getBeers();

    setTotalPages(Math.ceil(beers.length / itemsPerPage));
  }, []);

  beers.filter((beer) => {
    if (customFilter === "") {
      return beer;
    } else if (
      removingAccents(beer.name.toLowerCase()).includes(customFilter) ||
      removingAccents(beer.style.toLowerCase()).includes(customFilter) ||
      removingAccents(beer.brand.toLowerCase()).includes(customFilter) ||
      removingAccents(beer.country.toLowerCase()).includes(customFilter) ||
      removingAccents(beer.graduation.toLowerCase()).includes(customFilter)
    ) {
      filteredBeers.push(beer);
      return beer;
    }
  });

  return (
    <>
      {/* <AllBeersComponent /> */}
      {/* <SearchBar data={beers} /> */}
      {loading ? (
        <div>
          <CustomPagination
            data={customFilter !== "" ? filteredBeers : beers}
            pageLimit={5}
            dataLimit={20}
            RenderComponent={CustomBeerCard}
            filter={customFilter}
          />
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default AllBeersComponent;

{
  /*
      {loading ? (
        <div>
          <ul>
            <div className="bg-white">
              {/* <h2 className="text-7xl text-center tracking-wider ">BEERS</h2> }
              <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {beers.map((beer) => (
                    <Link
                      key={beer.id}
                      to={`/beer/${beer.id}`}
                      className="group bg-gray-400 rounded-2xl"
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  ">
                        {beer.img_file ? (
                          <img
                            src={beer.img_file}
                            alt={beer.img_file}
                            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-none"
                          />
                        ) : (
                          <BeerIcon />
                        )}
                      </div>
                      <h3 className="mt-4 text-lg text-gray-800 text-center">
                        {beer.img_file ? console.log(beer.img_file) : ""}
                      </h3>
                      <h3 className="mt-4 text-lg text-gray-800 text-center">
                        {beer.name} {beer.graduation}
                        {"%"}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                        {beer.brand}
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900 text-center mb-4">
                        {beer.country}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ul>
        </div>
      ) : (
        <LoadingComponent />
      )}
*/
}
