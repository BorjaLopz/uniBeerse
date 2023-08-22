import "./style.css";
import BeerIcon from "../BeerIcon";
import { Link } from "react-router-dom";

function CustomBeerCard({ data }) {
  const { id, brand, name, style, graduation, country, img_file } = data;

  return (
    <Link key={id} to={`/beer/${id}`} className="currentBeer">
      <div>
        <small>{name}</small>
        <h1>{brand}</h1>
        <p>{name}</p>
        <p>{style}</p>
        <p>{graduation}</p>
        <p>{country}</p>

        {img_file === "" ? (
          <>
            <BeerIcon  />
          </>
        ) : (
          <>
            <img src={img_file} alt={`Imagen de ${name}`} />
          </>
        )}
      </div>
    </Link>
  );
}

export default CustomBeerCard;
{
  /*

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
                        </Link>*/
}
