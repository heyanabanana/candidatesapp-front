import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../services/endpoint";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";

export default function StepTwo() {
  const { isLogged, token } = useUser();
  const [skills, setSkills] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => login(data);

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
        console.log(value);
      });
  }, []);
  return (
    <div>
      {skills && skills.map((skill) => <li key={skill.id}>{skill.name}</li>)}
      Not enought? Add Skills
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="new skill" />
        <button>Send</button>
      </form>
    </div>
  );
}
