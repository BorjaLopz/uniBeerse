import { splitCountryName } from "../../helpers";
import BeerIcon from "../BeerIcon";
import "./style.css";
import { Link } from "react-router-dom";

function BeerStyleComponent({ b }) {
  return (
    <>
      <Link key={b?.id} to={`/beer/${b?.id}`} className="currentBeer_style">
        <div id="beer_card_style">
          <div id="beer_brand_name">
            <h2 id="beer_brand">{b?.brand}</h2>
            <h2 id="beer_name">{b?.name}</h2>
          </div>
          {b?.img_file === "" ? (
            <div id="beer_icon_style">
              <BeerIcon />
            </div>
          ) : (
            <>
              <img
                src={b?.img_file}
                alt={`Imagen de ${b?.name}`}
                id="beer_image_style"
              />
            </>
          )}
          <div id="container_graduation_style">
            <p id="beer_graduation">{b?.graduation}</p>
            <p id="beer_style">{b?.style}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default BeerStyleComponent;

/*<div id="container_country_icon">
          <p id="beer_country">{b?.country}</p>
          {splitCountryName(b?.country)?.length ? (
            <>
              {splitCountryName(country).map((item) => {
                return (
                  <img
                    src={`https://flagcdn.com/w1280/${item}.png`}
                    alt={`Bandera de ${b?.country}`}
                    id="flag_icon"
                  />
                );
              })}
            </>
          ) : (
            <img
              src={`https://flagcdn.com/w1280/${getCodeCountryByName(
                b?.country
              )}.png`}
              alt={`Bandera de ${b?.country}`}
              id="flag_icon"
            />
          )}
          }
        </div>

        */
