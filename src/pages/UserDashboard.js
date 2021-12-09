/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import useUser from "../config/useUser";
import getCandidates from "../services/getCandidates";

export default function UserDashboard() {
  const { isLogged, token } = useUser();
  const [candidates, setCandidates] = useState();

  useEffect(() => {
    getCandidates({ token }).then((value) => {
      setCandidates(value);
    });
  }, [token]);
  const userId = window.sessionStorage.getItem("user");

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      {isLogged ? (
        <div>
          Welcome, your users are:
          {candidates &&
            candidates
              .filter((candidate) => candidate.user_id == userId)
              .map((filteredCandidate) => <li>{filteredCandidate.name}</li>)}
          Post new candidate:
          <Link to="/newcandidate">
            <button>New candidate</button>
          </Link>
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
