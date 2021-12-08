import React from "react";
import { Link } from "wouter";
import useUser from "../config/useUser";

export default function UserDashboard() {
  const {isLogged}  = useUser();
  const token = window.localStorage.getItem('token')
    console.log(isLogged)
  return (
    <div className="h-screen flex flex-col justify-center content-center items-center">
      {isLogged ? (
       <div> Holahola
       </div>

      ) : (
        <div>
           Por favor, inicie sesión para ver el contenido
           <Link to="/login">
           <button>Iniciar Sesion</button></Link>
        </div>
      )}
      
    </div>
  );
}
