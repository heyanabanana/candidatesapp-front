import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, errors, handleSubmit, watch } = useForm({});

  const [, navigate] = useLocation();
  const password = useRef({});
  password.current = watch("password", "");

  const { isRegisterLoading, hasRegisterError, signIn, isRegister } = useUser();

  const onSubmit = (data) => signIn(data);
  console.log(errors);

  //TODO: AUTOCOMPLETE LOGIN AT REGISTER

  useEffect(() => {
    if (isRegister) navigate("/login");
  }, [isRegister, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      <h1>Register</h1>
      {isRegisterLoading && <span>Checking credentials...</span>}
      {!isRegisterLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("Name", { required: true, maxLength: 80 })}
          />

          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />

          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />

          <input
            type="password"
            placeholder="Confirm password"
            {...register("password_confirmation", {
              required: true,
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />

          <button>Register</button>
        </form>
      )}
      {hasRegisterError && <span>Fail on register</span>}{" "}
    </div>
  );
}
