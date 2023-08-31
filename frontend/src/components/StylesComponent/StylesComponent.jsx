import styles from "../../../public/styles.json";
import "./style.css";
import { Link } from "react-router-dom";

function StylesComponent() {
  return (
    <>
      <section id="title">
        <h2>Estilos</h2>
      </section>
      {styles.map((s, id) => {
        return (
          <Link key={id} to={`/style/${s.style}`} className="style-article">
            <article id="article-style">
              <h2>{s.style}</h2>
              <p>{s.description}</p>
            </article>
          </Link>
        );
      })}
    </>
  );
}

export default StylesComponent;
