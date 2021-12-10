import { ENDPOINT } from "./endpoint";

export default function getSkills({ token }) {
  return fetch(`${ENDPOINT}/skills`, {
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
      return value
    });
}
