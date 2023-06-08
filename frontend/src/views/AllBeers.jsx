import { useEffect, useState } from "react";
import AllBeersComponent from "../components/AllBeersComponent";
import useServer from "../hooks/useServer";

function AllBeers() {
  const [beers, setBeers] = useState([]);
  const { get } = useServer();


  const getBeers = async () => {
    const { data } = await get({ url: "/beers/all" });
    console.log("hoooola");
    console.log(data);
    setBeers(data);
  };

  useEffect(() => {
    getBeers();
  }, []);

  return (
    <>
      {/* <AllBeersComponent /> */}
      {/* <h1>Hola</h1> */}
      <div>
        <h1>All Beers</h1>
        {console.log(beers)}
      </div>
    </>
  );
}

export default AllBeers;
