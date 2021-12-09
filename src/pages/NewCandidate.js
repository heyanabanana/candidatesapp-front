/* eslint-disable eqeqeq */
import React, { useState } from "react";
import useUser from "../config/useUser";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";

export default function NewCandidate() {
  const { isLogged } = useUser();

  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      {isLogged ? (
        <div>
          <StepOne />
        </div>
      ) : (
        <div>NOT LOGGIN</div>
      )}
    </div>
  );
}
