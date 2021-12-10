import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import Image from "../assets/login.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  const [, navigate] = useLocation();
  const schema = yup
    .object({
      password: yup.string().required("Password is required"),
      email: yup.string().required().email("Email is invalid"),
    })
    .required();
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLogged) navigate("/dashboard");
  }, [isLogged, navigate]);

  const onSubmit = (data) => login(data);

  return (
    <div className=" mt-20 flex flex-col  content-center items-center">
      {isLoginLoading && <span>Checking credentials...</span>}
      {!isLoginLoading && (
        <div className="mt-15  flex flex-col md:flex-row content-center ">
          <img className="w-96 h-96" alt="index" src={Image} />

          <div className="flex flex-col items-center content-center w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <h1 className="self-center mt-5 mb-6 text-xl font-semibold text-blue sm:text-2xl ">
              Login to your account
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center "
            >
              <input
                className="w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <p className=" text-pink font-semibold">
                {errors.email && errors.email.message}
              </p>
              <input
                className="mt-6 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.password && errors.email.password}
              </p>
              <span className="mt-8 w-24">
                <button className=" py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Login
                </button>
              </span>{" "}
              <Link className="mt-3 text-gray-600 text-xs	" to="/register">
                You don't have account?'
              </Link>
            </form>
          </div>
        </div>
      )}
      {hasLoginError && (
        <p className=" text-pink font-semibold">Credentials are invalid </p>
      )}
    </div>
  );
}
