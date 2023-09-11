import { useParams } from "react-router-dom";
import styles from "../../public/styles.json";
import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import BeerStyleComponent from "./BeerStyleComponent/BeerStyleComponent";
import { removingAccents } from "../helpers";
import stylejson from "../../public/styles.json";
import LoadingComponent from "./LoadingComponent/LoadingComponent";

function StyleCard() {
  const { style } = useParams();
  const [currentStyle, setCurrentStyle] = useState();
  const [loading, setLoading] = useState(true);
  const [beers, setBeers] = useState([]);
  const [randomBeers, setRandomBeers] = useState([]);
  const { get } = useServer();

  const beerStyleExample = [];

  const numberOfExamples = 4;

  const getCurrentStyle = () => {
    const [styleFiltered] = stylejson.filter(
      (s) => s.itemKey.toLowerCase() === style.toLowerCase()
    );
    setCurrentStyle(styleFiltered);
  };

  const getBeers = async () => {
    // setLoading(true);
    const { data } = await get({ url: "/beers/all" });
    // console.log(data.data);

    const filteredBeers = data.data.filter((b) => {
      console.log(currentStyle?.itemKey?.toLowerCase());
      if (b?.style?.toLowerCase() === currentStyle?.itemKey?.toLowerCase()) {
        return b;
      }
    });

    setBeers(filteredBeers);
  };

  /* const agregarObjeto = () => {
    // Crear una copia del array actual
    const copiaItems = [...items];

    // Crear un nuevo objeto que deseas agregar
    const nuevoObjeto = { id: Date.now(), nombre: 'Nuevo Objeto' };

    // Agregar el nuevo objeto a la copia del array
    copiaItems.push(nuevoObjeto);

    // Actualizar el estado con la nueva copia del array
    setItems(copiaItems);
  };
*/

  const selectBeersRandom = () => {
    setLoading(true);
    const copiaCervezas = [...randomBeers];
    const beersRandomized = [...beers].sort(() => 0.5 - Math.random());
    const beersSelected = beersRandomized.slice(0, numberOfExamples);

    for (let i = 0; i < numberOfExamples; i++) {
      if (beersSelected[i] !== undefined) {
        copiaCervezas.push(beersSelected[i]);
        beerStyleExample.push(beersSelected[i]);
      }
    }
    setRandomBeers(copiaCervezas);
    setLoading(false)
    console.log("randomBeers");
    console.log(randomBeers);
  };

  const stopSpinner = () => {
    console.log(randomBeers);
    if (randomBeers) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentStyle();
  });

  useEffect(() => {
    getBeers();
  }, [currentStyle]);

  useEffect(() => {
    selectBeersRandom();
  }, [beers]);

  useEffect(() => {
    stopSpinner();
  }, [currentStyle]);

  return (
    <>
      <main>
        <article id="description_style">
          {styles.map((s, id) => {
            return (
              <>
                {s.itemKey === style ? (
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
        {loading ? (
          <LoadingComponent />
        ) : (
          <article id="ejemplos-cerveza">
            {randomBeers.length > 0 ? (
              <>
                <h2>{`Ejemplos de cervezas ${style.toLowerCase()}`}</h2>
                <ul>
                  {randomBeers.map((b) => {
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
        )}
      </main>
    </>
  );
}

export default StyleCard;

{
  /*   const { style } = useParams();

  const [beers, setBeers] = useState([]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [randomBeers, setRandomBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useServer();

  const beerStyleExample = [];
  const numberOfExamples = 4;

  const getCurrentStyle = () => {
    const [stylefiltered] = stylejson.filter(
      (s) => s.itemKey.toLowerCase() === style.toLowerCase()
    );
    setCurrentStyle(stylefiltered);
    console.log("currentStyle");
    console.log(currentStyle);
  };

  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });

    const filteredBeers = data.data.filter((beer) => {
      beer?.style?.toLowerCase() === currentStyle?.itemKey?.toLowerCase();
    });
    console.log("filteredBeers");
    console.log(filteredBeers);
    setBeers(filteredBeers);
    setLoading(false);
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
    getCurrentStyle();
  });

  // useEffect(() => {
  //   getCurrentStyle();
  // }, [beers]);

  useEffect(() => {
    // getBeers();
    selectBeersRandom();
  }, []);

  for (let i = 0; i < numberOfExamples; i++) {
    if (randomBeers[i] !== undefined) {
      beerStyleExample.push(randomBeers[i]);
    }
  }

  console.log("beers");
  console.log(beers);
  console.log("randomBeers");
  console.log(randomBeers);
  console.log("beerStyleExample");
  console.log(beerStyleExample);*/
}

{
  /*  <main>
        <article id="description_style">
          {styles.map((s, id) => {
            return (
              <>
                {s.itemKey === style ? (
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

        {loading ? (
          <>
            <LoadingComponent />
          </>
        ) : (
          <p>No estoy cargando</p>
        )}
      </main>
    </> */
}
