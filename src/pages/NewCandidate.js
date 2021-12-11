import React from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import useUser from "../config/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ENDPOINT } from "../services/endpoint";

export default function NewCandidate() {
  const schema = Yup.object().shape({
    name: Yup.string("Name is invalid").required("Name is required"),
    phone: Yup.number("Phone is invalid").required("Phone is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    salary_now: Yup.number().required("Actual salary is required"),
    salary_desired: Yup.number().required("Desired salary is required"),
    location: Yup.string("Location is invalid").required(
      "Location is required"
    ),
    country: Yup.string("Country is invalid").required("Country is required"),
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
        return candidate;
      });
    navigate("/dashboard");
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
              {...register("name")}
            />
            <p className=" text-pink font-semibold">
              {errors.name && errors.name.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <p className=" text-pink font-semibold">
              {errors.email && errors.email.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="tel"
              placeholder="Mobile number"
              {...register("phone")}
            />
            <p className=" text-pink font-semibold">
              {errors.phone && errors.phone.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="number"
              placeholder="Actual salary"
              {...register("salary_now")}
            />
            <p className=" text-pink font-semibold">
              {errors.salary_now && errors.salary_now.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="number"
              placeholder="Desired salary"
              {...register("salary_desired")}
            />
            <p className=" text-pink font-semibold">
              {errors.salary_desired && errors.salary_desired.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Location"
              {...register("location")}
            />
            <p className=" text-pink font-semibold">
              {errors.location && errors.location}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="date"
              placeholder="birthdate"
              {...register("birthdate")}
            />
            <p className=" text-pink font-semibold">
              {errors.birthdate && errors.birthdate.message}
            </p>
            <input
              className="mt-2 w-80 rounded-md items-center p-2 px-4 border border-gray-300 text-black shadow-sm text-md"
              type="text"
              placeholder="Country"
              {...register("country")}
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
                  {...register("remote")}
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
                  className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  {...register("active")}
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
                  className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  {...register("mobility")}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
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
