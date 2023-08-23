import { useContext } from "react";
import BeerContext from "../contexts/BeerContext.js";

function useBeer() {
  return useContext(BeerContext);
}

export default useBeer;
