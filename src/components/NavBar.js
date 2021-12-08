import SiteLogo from "../lib/SiteLogo";
import { Link } from "wouter";
import useUser from "../config/useUser";

const NavBar = () => {
  // const isLogged = false;
  const { isLogged, logout } = useUser();

  return (
    <nav className="flex content-between justify-between	 w-auto">
      <SiteLogo />
      <div>
        {isLogged ? (
          <Link to="/">
            <button onClick={logout}>Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="mr-4">Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
