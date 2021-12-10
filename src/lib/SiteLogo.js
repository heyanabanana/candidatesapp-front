import { FaLightbulb } from "react-icons/fa";
import { Link } from "wouter";

const siteLogo = () => {
  return (
    <Link to="/">
      <FaLightbulb
        className="fill-current text-blue hover:text-blue-light"
        size={28}
      />
    </Link>
  );
};

export default siteLogo;
