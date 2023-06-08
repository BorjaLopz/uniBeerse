import { toast } from "sonner";

import Http from "../services/Http.js";

// /beers/all -> Obtenemos todas las cervezas

/* 
  app.get("/beers/all", getAllBeersController);
*/

function useServer() {
  const handleResponse = ({ data, loading, error }) => {
    if (data) {
      console.log("no hay fallo");
    }

    return { data, loading, error };
  };

  return {
    get: ({ url }) => Http({ mehtod: "GET", url }).then(handleResponse),
  };
}

export default useServer;
