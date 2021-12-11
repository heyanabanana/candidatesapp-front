/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ENDPOINT } from "../services/endpoint";
import { Link } from "wouter";

export default function NewExperience(params) {
  const candidateId = params.id;

  const { isLogged, token } = useUser();
  const [skills, setSkills] = useState();
  const [candidate, setCandidate] = useState();

  //FORM 1
  const schema = Yup.object().shape({
    level: Yup.number().required(),
    skill_id: Yup.number().required(),
    candidate_id: Yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch(`${ENDPOINT}/experiences`, {
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
        window.location.reload(false);
        return res;
      });
  };

  function setLevel(level) {
    if (level === 1) {
      return " junior";
    } else if (level === 2) {
      return " semi-senior";
    } else return " senior";
  }

  useEffect(() => {
    //GET SKILLS
    fetch(`${ENDPOINT}/skills`, {
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
        const value = response;
        setSkills(value);
      });
    //GET CANDIDATE

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
        const value = response;
        setCandidate(value);
      });
  }, [token, candidateId]);
  const [selectedSkill, setSelectedSkill] = useState("DEFAULT");
  return (
    <div className="flex flex-col justify-center items-center">
      {isLogged ? (
        <div className="mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col flex-wrap items-center content-center  max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div>
              <h1 className="self-center mt-5 mb-1 text-xl font-semibold text-blue sm:text-2xl text-center">
                {candidate && candidate.name}
              </h1>
              <span className="flex flex-wrap">
                {candidate &&
                  candidate.experiences.map((experience) => (
                    <span class="px-2 py-1 m-0.5 uppercase text-xs font-semibold rounded-xl text-white  bg-indigo-500 ">
                      {experience.skill.name}
                      {setLevel(experience.level)}
                    </span>
                  ))}
              </span>
            </div>
            <form
              key={1}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center "
            >
              <select
                className="block w-36 mt-10 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => setSelectedSkill(e.target.value)}
                defaultValue={selectedSkill}
                {...register("skill_id")}
              >
                <option value="DEFAULT" disabled>
                  Choose a skill ...
                </option>
                {skills &&
                  skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
              </select>
              <div className="m-1">
                <Link to={`/addskill/${candidateId}`} params={candidateId}>
                  <button
                    type="button"
                    className=" text-sm font-medium text-blue rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Add skill
                  </button>
                </Link>
              </div>

              <input
                type="hidden"
                value={candidateId}
                {...register("candidate_id")}
              />

              <select
                className="block mt-3 w-36 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("level")}
              >
                <option value={1}>Junior</option>
                <option value={2}>Semi-Senior</option>
                <option value={3}>Senior</option>
              </select>
              <button className="mt-6 py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Send
              </button>
              <Link to={`/dashboard/${candidateId}`} params={candidateId}>
                <p
                  type="button"
                  className=" text-sm font-medium text-blue rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Back to candidate
                </p>
              </Link>
            </form>{" "}
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
