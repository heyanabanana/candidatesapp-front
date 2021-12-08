import Context from "./UserContext";
import { useCallback, useContext, useState } from "react";
import loginService from "../services/login";
import registerService from "../services/register";

export default function useUser() {
  const { token, setToken } = useContext(Context);
  const [isRegister, setIsRegister] = useState(false);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false });
      loginService({ email, password })
        .then((token) => {
          window.sessionStorage.setItem("token", token);
          setState({ loading: false, error: false });
          setToken(token);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("token");
          setState({ loading: false, error: true });
          console.log(err);
        });
    },
    [setToken]
  );

  const register = useCallback(
    ({ name, email, password, password_confirmation }) => {
      setState({ loading: true, error: false });
      registerService({ name, email, password, password_confirmation })
        .then((name) => {
          window.sessionStorage.setItem("name", name);
          setState({ loading: false, error: false });
          setIsRegister(true);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("name");
          setState({ loading: false, error: true });
          setIsRegister(false);
          console.log(err);
        });
    },
    []
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    setToken(null);
  }, [setToken]);

  return {
    isLogged: Boolean(token),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    register,
    isRegister,
    isRegisterLoading: state.loading,
    hasRegisterError: state.error,
  };
}
