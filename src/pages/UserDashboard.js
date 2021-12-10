/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import useUser from "../config/useUser";
import getCandidates from "../services/getCandidates";
import {
  ChevronRightIcon,
} from "@heroicons/react/solid";

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
    <div className="flex flex-col mt-10 content-center ">
      {isLogged ? (
        <div className="flex flex-col ">
          <h1 className="self-center mt-5 mb-6 text-xl font-semibold text-blue sm:text-2xl text-center">
            Welcome back, your candidates are:{" "}
          </h1>
              <>
                {candidates &&
                  candidates
                    .filter(
                      (candidate) =>
                        candidate.user_id == userId && candidate.active === true
                    )
                    .map((filteredCandidate) => (
                      <Link to={`/dashboard/${filteredCandidate.id}`} params={filteredCandidate.id}>
                      <div className="cursor cursor-pointer flex justify-between w-full m-2 px-4 py-2 text-md font-medium text-left text-white bg-blue-light rounded-lg hover:bg-blue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                          {filteredCandidate.name}{" "}
                          <ChevronRightIcon
                            className="w-5 h-5 "
                          />
                        </div>
                       
                      </Link>
                    ))}
              </>

          <div className="w-72 mt-20 content-center">
            <Link to="/newcandidate">
              <button className=" py-2 bg-pink hover:bg-pink-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                New candidate
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          Please, login to see the content:
          <Link to="/login">
            <button class=" py-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
