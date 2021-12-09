import React, { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";

export default function Login() {
  const [, navigate] = useLocation();
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (isLogged) navigate("/dashboard");
  }, [isLogged, navigate]);

  const onSubmit = (data) => login(data);

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      <h1>Login</h1>
      {isLoginLoading && <span>Checking credentials...</span>}
      {!isLoginLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />

          <button>Login</button>
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Register</Link>
        </form>
      )}
      {hasLoginError && <span>Credentials are invalid</span>}{" "}
    </div>
  );
}
