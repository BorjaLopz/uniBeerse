import { useEffect, useState } from "react";
function CustomPagination({ data, dataLimit, pageLimit, RenderComponent }) {
  let pages = Math.ceil(data.length / dataLimit);
  // console.log("data.length / dataLimit");
  // console.log(Math.round(data.length / dataLimit));

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
      <main>
        {getPaginatedData().map((d) => {
          return (
            <>
              <RenderComponent data={d} />
            </>
          );
        })}
      </main>
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
    </>
  );
}

export default CustomPagination;
