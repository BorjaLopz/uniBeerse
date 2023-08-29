import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import AllBeers from "./views/AllBeers";
import AllBeersComponent from "./components/AllBeersComponent";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadingComponent from "./components/LoadingComponent";
import Contacto from "./views/Contacto";
import AñadirCerveza from "./views/AñadirCerveza";
import Cervezas from "./views/Cervezas";
import Estilos from "./views/StylesPages";
import NotFound from "./views/NotFound";
import BeerCard from "./components/BeerCard";
import Header from "./components/Header/Header";
import { useState } from "react";
import AllBeersPage from "./views/AllBeersPage";
import StylesPage from "./views/StylesPages";

function App() {
  const [customFilter, setCustomFilter] = useState("");
  return (
    <div className="app">
      <Header handleCustomFilter={setCustomFilter} />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* <AllBeersComponent /> */}
        <Route
          path="/"
          element={<AllBeersPage customFilter={customFilter} />}
        />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/add" element={<AñadirCerveza />} />
        <Route path="/beer" element={<Cervezas />} />
        <Route path={`/beer/:id`} element={<BeerCard />} />
        <Route path="/styles" element={<StylesPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {/* <LoadingComponent /> */}
    </div>
  );
}

export default App;
