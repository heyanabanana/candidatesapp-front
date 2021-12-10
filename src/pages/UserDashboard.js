/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import useUser from "../config/useUser";
import getCandidates from "../services/getCandidates";
import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  PhoneIcon,
  MailIcon,
  PaperClipIcon,
  CurrencyDollarIcon,
  CheckIcon,
  XIcon,
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

  function setLevel (level) {
    if (level === 1) {return " junior"} else if (level === 2) {return " semi-senior"} else return " senior"
  }


  return (
    <div className="flex flex-col mt-10 content-center ">
      {isLogged ? (
        <div className="flex flex-col ">
          <h1 className="self-center mt-5 mb-6 text-xl font-semibold text-blue sm:text-2xl text-center">
            Welcome back, your candidates are:{" "}
          </h1>
          <Disclosure>
            {({ open }) => (
              <>
                {candidates &&
                  candidates
                    .filter(
                      (candidate) =>
                        candidate.user_id == userId && candidate.active === true
                    )
                    .map((filteredCandidate) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full m-2 px-4 py-2 text-md font-medium text-left text-white bg-blue-light rounded-lg hover:bg-blue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                          {filteredCandidate.name}{" "}
                          <ChevronUpIcon
                            className={`${
                              open ? "transform rotate-180" : ""
                            } w-5 h-5 text-white`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-800">
                          <ul class="flex flex-col divide divide-y">
                            <li class="flex flex-row">
                              <div class="flex flex-1 items-center justify-between	 pb-2">
                                <div class="flex font-medium dark:text-white">
                                  <MailIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  {console.log(filteredCandidate)}

                                  {filteredCandidate.email}
                                </div>
                                <div class="flex font-medium dark:text-white">
                                  <PhoneIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  {filteredCandidate.phone}
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="mt-2 flex flex-1  items-center justify-between	 pb-2">
                                <div class="flex font-medium dark:text-white">
                                  <PaperClipIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  {filteredCandidate.location},{" "}
                                  {filteredCandidate.country}
                                </div>
                                <div class="flex font-medium dark:text-white">
                                  Mobility:{" "}
                                  {filteredCandidate.mobility === true ? (
                                    <CheckIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  ) : (
                                    <XIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  )}
                                </div>
                                <div class="flex font-medium dark:text-white">
                                  Remote:{" "}
                                  {filteredCandidate.remote === true ? (
                                    <CheckIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  ) : (
                                    <XIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  )}
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="flex mt-2 flex-1 items-center justify-between	 pb-2">
                                <div class="flex font-medium dark:text-white">
                                  <CurrencyDollarIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  Salary now:
                                  {filteredCandidate.salary_now} $
                                </div>
                                <div class="flex font-medium dark:text-white">
                                  <CurrencyDollarIcon className="w-5 h-5 mr-2 fill-current text-blue" />
                                  Salary desired:
                                  {filteredCandidate.salary_desired} $
                                </div>
                              </div>
                            </li>
                            <li class="flex flex-row">
                              <div class="flex mt-2 flex-1 items-center flex-wrap	 pb-2">
                                {filteredCandidate.experiences.map((experience) =>
                                  <span class="inline-block uppercase rounded-min text-white bg-blue px-2 py-1 text-xs font-bold mr-3 rounded-md">
                                    {experience.skill.name} {setLevel(experience.level)}

                                  </span>
                                )}
                              </div>
                            </li>
                          </ul>
                        </Disclosure.Panel>
                      </>
                    ))}
              </>
            )}
          </Disclosure>
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
