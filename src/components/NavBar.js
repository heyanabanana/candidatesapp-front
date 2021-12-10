import SiteLogo from "../lib/SiteLogo";
import { Link } from "wouter";
import useUser from "../config/useUser";

const NavBar = () => {
  // const isLogged = false;
  const { isLogged, logout } = useUser();

  return (
    <nav className="flex content-between justify-between w-full">
      <SiteLogo />
      <div>
        {isLogged ? (
          <div className=" flex">
            <Link to="/dashboard">
              <button className="p-2 mr-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Dashboard
              </button>
            </Link>
            <button
              className="p-2 mr-2 bg-pink hover:bg-pink-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="w-64 flex">
            <Link to="/login">
              <button className="py-2 mr-2 bg-blue hover:bg-blue-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="py-2 bg-pink hover:bg-pink-light focus:ring-blue focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
