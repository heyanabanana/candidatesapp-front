import React, { useEffect, useState } from "react";

import {
    PhoneIcon,
    MailIcon,
    CurrencyDollarIcon,
    CheckIcon,
    XIcon,
  } from "@heroicons/react/solid";
  import useUser from "../config/useUser";
import { ENDPOINT } from '../services/endpoint';


export default function CandidateDetail(params) {
  const candidateId =  params.id;
  const { token } = useUser();
  const [candidate, setCandidate] = useState();

  useEffect(() => {
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
        const data = response;
        setCandidate(data)
       });
  }, [candidateId, token]);

  function setLevel (level) {
    if (level === 1) {return " junior"} else if (level === 2) {return " semi-senior"} else return " senior"
  }
    return (
        <div>
          {candidate && 
          <>
           <h1 className="text-3xl text-center font-semibold text-blue mb-5">{candidate.name}</h1> <ul class="flex flex-col divide divide-y max-w-2xl m-auto">
                                     

                            <li class="flex flex-row ">
                              <div class="flex flex-col md:flex-row flex-1 items-center justify-between	 pb-2">
                                <div class="mt-3 flex font-medium dark:text-white">
                                  <MailIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  {console.log(candidate)}

                                  {candidate.email}
                                </div>
                                <div class="mt-3 flex font-medium dark:text-white">
                                  <PhoneIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  {candidate.phone}
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="mt-2 flex  flex-col md:flex-row flex-1  items-center justify-between	 pb-2">
                                <div class="mt-3 flex font-medium dark:text-white">
                                  
                                  {candidate.location},{" "}
                                  {candidate.country}
                                </div>
                                <div class="mt-3 flex font-medium dark:text-white">
                                  Mobility:{" "}
                                  {candidate.mobility === true ? (
                                    <CheckIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  ) : (
                                    <XIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  )}
                                </div>
                                <div class="mt-3 flex font-medium dark:text-white">
                                  Remote:{" "}
                                  {candidate.remote === true ? (
                                    <CheckIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  ) : (
                                    <XIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  )}
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="flex  flex-col md:flex-row mt-2 flex-1 items-center justify-between	 pb-2">
                                <div class="mt-3 flex font-medium dark:text-white">
                                  <CurrencyDollarIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  Salary now:
                                  {candidate.salary_now} $
                                </div>
                                <div class="flex mt-3 font-medium dark:text-white">
                                  <CurrencyDollarIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  Salary desired:
                                  {candidate.salary_desired} $
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="flex mt-2 flex-1 items-center justify-center flex-wrap	 pb-2">
                                {candidate.experiences.map((experience) =>
                                  <span class="m-1 inline-block uppercase rounded-min text-white bg-blue px-2 py-1 text-xs font-bold mr-3 rounded-md">
                                    {experience.skill.name} {setLevel(experience.level)}

                                  </span>
                                  
                                )}
                              </div>
                            </li>
                          </ul></>
}
        </div>
    );
}
