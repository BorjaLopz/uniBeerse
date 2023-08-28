import styles from "../../../public/styles.json";
import "./style.css"

function StylesComponent() {
  console.log(styles);
  return (
    <>
      {styles.map((s, id) => {
        return (
          <article id="article-style">
            <h2>{s.style}</h2>
            <p>{s.description}</p>
          </article>
        );
      })}
    </>
  );
}

export default StylesComponent;
