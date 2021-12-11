import React from "react";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ENDPOINT } from "../services/endpoint";
import { Link } from "wouter";
import { useLocation } from "wouter";

export default function AddSkill(params) {
  const candidateId = params.id;
  console.log(candidateId);
  const [, navigate] = useLocation();

  const { isLogged, token } = useUser();
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch(`${ENDPOINT}/skills`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response is NOT ok");
        return res.json();
      })
      .then((res) => {
        return res;
      });
    navigate(`/newexperience/${candidateId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {isLogged ? (
        <div className="mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col flex-wrap items-center content-center  max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div>
              <h1 className="self-center mt-5 mb-1 text-xl font-semibold text-blue sm:text-2xl text-center">
                Add Skill
              </h1>
              <form
                key={1}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center "
              >
                <input
                  className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                  type="text"
                  placeholder="Skill Name"
                  {...register("name")}
                />
                <p className=" text-pink font-semibold">
                  {errors.name && errors.name.message}
                </p>
                <button className="mt-6 py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          Por favor, inicie sesión para ver el contenido
          <Link to="/login">
            <button>Iniciar Sesion</button>
          </Link>
        </div>
      )}
    </div>
  );
}
