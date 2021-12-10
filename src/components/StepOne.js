import React from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import useUser from "../config/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ENDPOINT } from "../services/endpoint";

export default function StepOne() {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    phone: Yup.number().required(),
    email: Yup.string().required().email("Email is invalid"),
    salary_now: Yup.number().required(),
    salary_desired: Yup.number().required(),
    location: Yup.string().required(),
    country: Yup.string().required(),
    remote: Yup.boolean().required(),
    active: Yup.boolean().required(),
    birthdate: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    mobility: Yup.boolean().required(),
    user_id: Yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { token } = useUser();
  const [, navigate] = useLocation();
  const userId = window.sessionStorage.getItem("user");

  const onSubmit = (data) => {
    console.log(data);
    fetch(`${ENDPOINT}/candidates`, {
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
        const { candidate } = res;
        window.sessionStorage.setItem("candidateId", res.id);
        return candidate;
      });
    navigate("/newcandidate/2");
  };

  return (
    <div className=" flex flex-col justify-center content-center items-center">
      <div className="mt-10  flex flex-col md:flex-row content-center ">
        <div className="flex flex-col items-center content-center w-full max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <h1 className="self-center mt-3 mb-6 text-xl font-semibold text-blue sm:text-2xl ">
            New Candidate
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 80 })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="tel"
              placeholder="Mobile number"
              {...register("phone", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="number"
              placeholder="salary now"
              {...register("salary_now", { maxLength: 20 })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="number"
              placeholder="salary desired"
              {...register("salary_desired", { maxLength: 20 })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Location"
              {...register("location", { required: true, maxLength: 80 })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="date"
              placeholder="birthdate"
              {...register("birthdate", { required: true })}
            />
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Country"
              {...register("country", { required: true, maxLength: 80 })}
            />
            <span className="flex">
              <span className="flex flex-col m-2 items-center">
                <label className="text-blue font-semibold mt-3" for="remote">
                  Remote
                </label>
                <select
                  className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  {...register("remote", { required: true })}
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </span>{" "}
              <span className="flex flex-col m-2 items-center">
                <label className="text-blue font-semibold mt-3" for="remote">
                  Active
                </label>{" "}
                <select
                  className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  {...register("active", { required: true })}
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </span>
              <span className="flex flex-col m-2 items-center">
                <label className="text-blue font-semibold mt-3" for="remote">
                  Mobility
                </label>{" "}
                <select
                  className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  {...register("mobility", { required: true })}
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </span>
            </span>
            <input type="hidden" value={userId} {...register("user_id")} />
            <button class="mt-6 py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
