import Context from "./UserContext";
import { useCallback, useContext } from "react";
import loginService from "../services/login";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);

  const login = useCallback(({email, password}) => {
    loginService({email, password})
    .then(jwt => {
      setJWT(jwt)
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [setJWT]);

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
