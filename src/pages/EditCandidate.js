import React, { useEffect, useState } from "react";

import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import useUser from "../config/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ENDPOINT } from "../services/endpoint";

export default function EditCandidate(params) {
  const candidateId = params.id;
  const [candidate, setCandidate] = useState();
  useEffect(() => {
    fetch(`${ENDPOINT}/candidatesfull/${candidateId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response is NOT ok");
        return response.json();
      })
      .then((response) => {
        const data = response;
        setCandidate(data);
      });
  });

  const schema = yup.object().shape({
    name: yup.string("Name is invalid"),
    phone: yup.number("Phone is invalid"),
    email: yup.string().email("Email is invalid"),
    salary_now: yup.number(),
    salary_desired: yup.number(),
    location: yup
      .string("Location is invalid")
      .required("Location is required"),
    country: yup.string("Country is invalid"),
    remote: yup.boolean(),
    active: yup.boolean(),
    mobility: yup.boolean(),
    user_id: yup.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { token } = useUser();
  const [, navigate] = useLocation();
  const userId = window.sessionStorage.getItem("user");

  const onSubmit = (data) => {
    console.log(data);
    fetch(`${ENDPOINT}/candidates/${candidate.id}`, {
      method: "PUT",
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
        const  candidate = res;
        return candidate;
      })
      navigate("/dashboard")
  };

  return (
    <div className=" flex flex-col justify-center content-center items-center">
      <div className="mt-10  flex flex-col md:flex-row content-center ">
        <div className="flex flex-col items-center content-center w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <h1 className="self-center mt-3 mb-6 text-xl font-semibold text-blue sm:text-2xl ">
            New Candidate
          </h1>
          {candidate && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                defaultValue={candidate.name}
                
                {...register("name", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.name && errors.name.message}
              </p>
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                
                defaultValue={candidate.email}
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.email && errors.email.message}
              </p>
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="tel"
                
                defaultValue={candidate.phone}
                placeholder="Mobile number"
                {...register("phone", { required: true })}
              />

              <p className=" text-pink font-semibold">
                {errors.phone && errors.phone.message}
              </p>
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="number"
                
                defaultValue={candidate.salary_now}
                placeholder="Actual salary"
                {...register("salary_now", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.salary_now && errors.salary_now.message}
              </p>
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="number"
                
                defaultValue={candidate.salary_desired}
                placeholder="Desired salary"
                {...register("salary_desired", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.salary_desired && errors.salary_desired.message}
              </p>
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                
                placeholder="Location"
                defaultValue={candidate.location}
                {...register("location", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.location && errors.location}
              </p>
             
              <input
                className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
                type="text"
                
                placeholder="Country"
                defaultValue={candidate.country}
                {...register("country", { required: true })}
              />
              <p className=" text-pink font-semibold">
                {errors.country && errors.salary_now.message}
              </p>
              <span className="flex">
                <span className="flex flex-col m-2 items-center">
                  <label className="text-blue font-semibold mt-3" for="remote">
                    Remote
                  </label>
                  <select
                    className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    defaultValue={candidate.remote}
                    {...register("remote", { required: true })}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </span>{" "}
                <span className="flex flex-col m-2 items-center">
                  <label className="text-blue font-semibold mt-3" for="remote">
                    Active
                  </label>
                  <select
                    defaultValue={candidate.active}
                    className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    {...register("active", { required: true })}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </span>
                <span className="flex flex-col m-2 items-center">
                  <label className="text-blue font-semibold mt-3" for="remote">
                    Mobility
                  </label>{" "}
                  <select
                    defaultValue={candidate.mobility}
                    className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    {...register("mobility", { required: true })}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </span>
              </span>
              <input
                type="hidden"
                value={candidate.user_id}
                {...register("user_id")}
              />
              <button
                type="submit"
                className="mt-6 py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Next
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
