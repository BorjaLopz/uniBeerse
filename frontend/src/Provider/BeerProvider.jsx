import { useState } from "react";

import BeerContext from "../contexts/BeerContext.js";

function BeerProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || {}
  );

  const setUserHandler = (newUser = {}) => {
    if (Object.keys(newUser).length === 0) return;

    const logUser = {
      ...user,
      ...newUser,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(logUser));
    return setUser(logUser);
  };

  const logoutHandler = () => {
    localStorage.removeItem(localStorageKey);
    return setUser(null);
  };

  const authValues = {
    user,
    token: user?.token,
    isAuthenticated: Boolean(user?.token),
    setUser: setUserHandler,
    logout: logoutHandler,
  };

  const beerValues = {
    filter,
  };
  console.log("beer values: ", beerValues);

  return (
    <BeerContext.Provider value={beerValues}>{children}</BeerContext.Provider>
  );
}

export default BeerProvider;
