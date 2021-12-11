import { ENDPOINT } from "./endpoint";

export default function getUsers({ token }) {
  return fetch(`${ENDPOINT}/users`, {
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
      return data;
    });
}
