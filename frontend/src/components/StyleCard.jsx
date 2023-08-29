import { useParams } from "react-router-dom";
import styles from "../../public/styles.json";
import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import BeerStyleComponent from "./BeerStyleComponent/BeerStyleComponent";

function StyleCard() {
  const { style } = useParams();
  const [beers, setBeers] = useState([]);
  const { get } = useServer();

  const numberOfExamples = 4;

  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });
    data.data.map((d) => {
      if (d.style.includes(style)) {
        console.log(d.style);
        return d.style;
      }
    });
  };

  useEffect(() => {
    getBeers();
  }, []);

  console.log(beers);
  return (
    <>
      <main>
        <article>
          {styles.map((s, id) => {
            return (
              <>
                {s.style === style ? (
                  <div>
                    <h2>{s.style}</h2>
                    <p>{s.description}</p>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </article>
      </main>
    </>
  );
}

export default StyleCard;
