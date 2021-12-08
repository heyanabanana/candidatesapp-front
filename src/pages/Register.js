import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import useUser from "../config/useUser";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [, navigate] = useLocation();
  const { isRegisterLoading, hasRegisterError, register, isRegister } =
    useUser();


    //TODO: AUTOCOMPLETE LOGIN AT REGISTER

  useEffect(() => {
    if (isRegister) navigate("/login");
  }, [isRegister, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password, password_confirmation });
  };

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      <h1>Register</h1>
      {isRegisterLoading && <span>Checking credentials...</span>}
      {!isRegisterLoading && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

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
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={password_confirmation}
            required
          />
          <button>Register</button>
        </form>
      )}
      {hasRegisterError && <span>Fail on register</span>}{" "}
    </div>
  );
}
