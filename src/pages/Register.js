/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import Image from "../assets/register.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";

export default function Register() {
  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup.string().required().email("Email is invalid"),
      password: yup
        .string()
        .required()
        .min(5, "Password must have at least 5 characters"),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [, navigate] = useLocation();

  const { isRegisterLoading, hasRegisterError, signIn, isRegister } = useUser();

  const onSubmit = (data) => {
    signIn(data);
    console.log(data);
  };

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
              <span className="p-float-label mt-8">
                <InputText
                  className="w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                  type="text"
                  {...register("name")}
                />
                <label htmlFor="name">Name</label>
              </span>
              <small id="username2-help" className="p-error p-d-block">
                {errors.name && errors.name.message}
              </small>

              <span className="p-float-label mt-10">
                <InputText
                  className="w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                  type="text"
                  {...register("email")}
                />
                <label htmlFor="email">Email</label>
              </span>
              <small id="username2-help" className="p-error p-d-block">
                {errors.email && errors.email.message}
              </small>

              <span className="p-float-label mt-10">
                <InputText
                  className="w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                  type="password"
                  {...register("password")}
                />
                <label htmlFor="password">Password</label>
              </span>
              <small id="username2-help" className="p-error p-d-block">
                {errors.password && errors.password.message}
              </small>

              <span className="p-float-label mt-10">
                <InputText
                  className="w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                  type="password"
                  {...register("password_confirmation")}
                />
                <label htmlFor="password_confirmation">Confirm password </label>
              </span>
              <small id="username2-help" className="p-error p-d-block">
                {errors.password && errors.password.message}
              </small>

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
