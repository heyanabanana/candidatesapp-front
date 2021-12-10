import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import Image from "../assets/register.png";

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
    <div className="flex flex-col justify-center content-center items-center">
      <div className="mt-10  flex flex-col md:flex-row content-center ">
        <img className="w-96 h-96" alt="index" src={Image} />

        <div className="flex flex-col items-center content-center w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <h1 className="self-center mt-5 mb-6 text-xl font-semibold text-blue sm:text-2xl ">
            Register
          </h1>
          {isRegisterLoading && (
              <button className="animate-pulse self-center mt-5 mb-6 text-xl text-blue font-semibold bg-blue sm:text-2xl ">
                Checking credentials...
              </button>
          )}
          {!isRegisterLoading && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center "
            >
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                placeholder="Name"
                {...register("Name", { required: true, maxLength: 80 })}
              />
              <input
                className="mt-4 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <input
                className="mt-4 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
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
                className="mt-4 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="password"
                placeholder="Confirm password"
                {...register("password_confirmation", {
                  required: true,
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              <span className="mt-8 w-24">
                <button class=" py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Register
                </button>{" "}
              </span>
            </form>
          )}
          {hasRegisterError && <span>Fail on register</span>}{" "}
        </div>
      </div>
    </div>
  );
}
