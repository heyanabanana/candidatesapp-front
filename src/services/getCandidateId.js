import { ENDPOINT } from "./endpoint";

export default function getCandidateId( token, candidateId ) {
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

}
