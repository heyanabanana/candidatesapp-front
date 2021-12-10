import React from "react";
import { Link } from "wouter";
import Image from "../assets/index.png";
export default function HomePage() {
  return (
    <div className="mt-20 flex flex-col md:flex-row content-center ">
      <img className="w-96 h-96" alt="index" src={Image} />
      <div className="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-6xl font-extrabold text-black sm:text-6xl">
          <span className="block">Everything property</span>
          <span className="block text-blue ">managers need.</span>
        </h2>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link to="/login">
              <button
                type="button"
                className="py-4 px-6  bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
