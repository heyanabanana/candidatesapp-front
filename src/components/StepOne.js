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

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { isLogged, token } = useUser();
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
        window.localStorage.setItem("candidateId", candidate.id);
        return candidate;
      });
    navigate("/newcandidate/2");
  };

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          {...register("phone", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <input
          type="number"
          placeholder="salary now"
          {...register("salary_now", { maxLength: 20 })}
        />
        <input
          type="number"
          placeholder="salary desired"
          {...register("salary_desired", { maxLength: 20 })}
        />
        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: true, maxLength: 80 })}
        />
        <input
          type="date"
          placeholder="birthdate"
          {...register("birthdate", { required: true })}
        />
        <input
          type="text"
          placeholder="Country"
          {...register("country", { required: true, maxLength: 80 })}
        />
        Remote
        <select {...register("remote", { required: true })}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        Active
        <select {...register("active", { required: true })}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        Mobility
        <select {...register("mobility", { required: true })}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <input type="hidden" value={userId} {...register("user_id")} />
        <button>Next</button>
      </form>
    </div>
  );
}
