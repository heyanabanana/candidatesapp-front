import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import useUser from "../config/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();

  useEffect(() => {
    //TODO: CHANGE ROUTE TO DASHBOARD
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      <h1>Login</h1>
      {isLoginLoading && <span>Checking credentials...</span>}
      {!isLoginLoading && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button>Login</button>
        </form>
      )}
      {hasLoginError && <span>Credentials are invalid</span>}{" "}
    </div>
  );
}