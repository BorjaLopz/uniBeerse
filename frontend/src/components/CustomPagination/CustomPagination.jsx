import { useEffect, useState } from "react";
import "./style.css";

function CustomPagination({
  data,
  dataLimit,
  pageLimit,
  RenderComponent,
  filter,
}) {
  let pages = Math.ceil(data.length / dataLimit);

  // console.log("filter");
  // console.log(filter);

  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  function goToFirstPage() {
    setCurrentPage((page) => (page = 1));
  }

  function goToLastPage() {
    setCurrentPage((page) => (page = pages));
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => {
      return start + idx + 1;
    });
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  return (
    <>
      <article>
        <section id="title">
          {/* <h1>{`Mostrando ${
            currentPage !== pages
              ? dataLimit * currentPage
              : dataLimit * (currentPage - 1) +
                document.querySelectorAll(".currentBeer").length
          } de ${data.length}`}</h1> */}
          {data.length === 0 ? (
            <h2>No hay ningun resultado</h2>
          ) : (
            <h2>{`Mostrando ${
              filter === "" ? "todos los resultados" : filter
            }`}</h2>
          )}
        </section>
        <section id="beer-area">
          {getPaginatedData().map((d, index) => {
            return (
              <>
                <RenderComponent data={d} key={index} />
              </>
            );
          })}
        </section>
      </article>
      {data.length !== 0 && (
        <div className="pagination">
          {/* First Page */}
          <button
            onClick={goToFirstPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            {`<<<`}
          </button>

          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            {`<`}
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : null
              } ${item > pages ? "disabled" : null}`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? "disabled" : ""}`}
          >
            {`>`}
          </button>

          {/* Last Page */}
          <button
            onClick={goToLastPage}
            className={`prev ${currentPage === pages ? "disabled" : ""}`}
          >
            {`>>>`}
          </button>
        </div>
      )}
    </>
  );
}

export default CustomPagination;