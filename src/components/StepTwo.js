import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../services/endpoint";
import useUser from "../config/useUser";
import { useForm } from "react-hook-form";

export default function StepTwo() {
  const { isLogged, token } = useUser();
  const [skills, setSkills] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = () => console.log(myValue);

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

  const [myValue, setMyValue] = useState("");

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <select onChange={(e) => setMyValue(e.target.value)}
        defaultValue={myValue}>
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
        <span style={{ backgroundColor: "yellow" }}>{myValue}</span>

        <button>Send</button>
      </form>
    </div>
  );
}
