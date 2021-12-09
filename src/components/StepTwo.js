import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../services/endpoint";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function StepTwo() {
  const { isLogged, token } = useUser();
  const [skills, setSkills] = useState();

  const schema = Yup.object().shape({
    level: Yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  const candidateId = window.localStorage.getItem("candidateId");

  useEffect(() => {
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
  }, []);

  const [selectedSkill, setSelectedSkill] = useState("");


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <select
          onChange={(e) => setSelectedSkill(e.target.value)}
          defaultValue={selectedSkill}
          {...register("skillId")}
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
        <select {...register("level")}>
          <option value="1">Junior</option>
          <option value="2">Semi-Senior</option>
          <option value="3">Senior</option>
        </select>
        <button>Send</button>        

      </form>        <span style={{ backgroundColor: "yellow" }}>{candidateId}</span>

    </div>
  );
}
