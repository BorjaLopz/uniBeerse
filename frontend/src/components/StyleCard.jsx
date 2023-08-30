import { useParams } from "react-router-dom";
import styles from "../../public/styles.json";
import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import BeerStyleComponent from "./BeerStyleComponent/BeerStyleComponent";
import { removingAccents } from "../helpers";

function StyleCard() {
  const { style } = useParams();
  const [beers, setBeers] = useState([]);
  const [randomBeers, setRandomBeers] = useState([]);
  const { get } = useServer();

  const numberOfExamples = 4;

  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });
    const resultadosFiltrados = data.data.filter((objeto) => {
      removingAccents(objeto.name.toLowerCase()).includes(customFilter) ||
        removingAccents(objeto.style.toLowerCase()).includes(customFilter) ||
        removingAccents(objeto.brand.toLowerCase()).includes(customFilter) ||
        removingAccents(objeto.country.toLowerCase()).includes(customFilter) ||
        removingAccents(objeto.graduation.toLowerCase()).includes(customFilter);
    });
    setBeers(resultadosFiltrados);
  };

  const selectBeersRandom = () => {
    const beersRandomized = [...beers].sort(() => 0.5 - Math.random());
    const beersSelected = beersRandomized.slice(0, numberOfExamples);
    setRandomBeers(beersSelected);
  };

  useEffect(() => {
    getBeers();
  }, []);

  useEffect(() => {
    selectBeersRandom();
  }, [beers]);

  const beerStyleExample = [];

  for (let i = 0; i < numberOfExamples; i++) {
    if (randomBeers[i] !== undefined) {
      beerStyleExample.push(randomBeers[i]);
    }
  }

  return (
    <>
      <main>
        <article id="description_style">
          {styles.map((s, id) => {
            return (
              <>
                {s.style === style ? (
                  <div>
                    <h2>Cervezas estilo {s.style.toLowerCase()}</h2>
                    <p>{s.description}</p>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </article>

        <article id="ejemplos-cerveza">
          {beerStyleExample.length > 0 ? (
            <>
              <h2>{`Ejemplos de cervezas ${style.toLowerCase()}`}</h2>
              <ul>
                {beerStyleExample.map((b) => {
                  if (b !== undefined) {
                    return <BeerStyleComponent b={b} />;
                  }
                })}
              </ul>
            </>
          ) : (
            <h2>{`No hay cervezas ${style.toLowerCase()}`}</h2>
          )}
        </article>
      </main>
    </>
  );
}

export default StyleCard;
