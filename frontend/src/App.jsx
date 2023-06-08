import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";

// import AllBeers from "./views/AllBeers";
import AllBeersComponent from "./components/AllBeersComponent";
import SearchBar from "./components/SearchBar";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  return (
    <>
      <SearchBar />
      {/* <LoadingComponent /> */}
      <AllBeersComponent />
    </>
  );
}

export default App;
