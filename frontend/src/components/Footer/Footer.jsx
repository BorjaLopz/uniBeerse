import redes from "../../../public/redes.json";
import { Link, Location, useLocation } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";

function Footer() {
  const location = useLocation();

  console.log("location");
  console.log(location);

  useEffect(() => {
    // window.scrollTo({ behavior: "smooth", top: "0px" });
    console.log("location has changed: ", location);
  }, [location]);

  return (
    <footer>
      <div className="container-footer">
        {/* <article className="container-column">
          <h3>Acerca de Nosotros</h3>
          <p>
            Somos una empresa dedicada a brindar soluciones creativas y
            efectivas.
          </p>
        </article> */}

        <article className="container-column">
          <section className="redes-icon">
            <h3 className="column-title">Mis redes</h3>
            <ul id="listado-redes">
              {redes.map((r) => {
                return (
                  <li key={r.id}>
                    {r.name !== "Email" ? (
                      <Link to={`${r.url}`} target="_blank" className="icon">
                        <img src={`${r.icon}.png`} alt={`${r.name}`} />
                      </Link>
                    ) : (
                      <a href={`mailto:${r.url}`} className="icon">
                        <img src={`${r.icon}.png`} alt={`${r.name}`} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </article>

        <article className="container-column">
          <h3 className="column-title">Enlaces Rápidos</h3>
          <ul>
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <Link to={"/beers"}>Cervezas</Link>
            </li>
            <li>
              <Link to={"/styles"}>Estilos</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contacto</Link>
            </li>
          </ul>
        </article>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2023 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
