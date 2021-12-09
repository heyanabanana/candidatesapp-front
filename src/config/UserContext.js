import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("token")
  );
  const user = () => window.sessionStorage.getItem("user");
  return (
    <Context.Provider value={{ token, setToken, user }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
