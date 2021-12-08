import { FaLightbulb } from 'react-icons/fa'
import { Link } from "wouter";

const siteLogo = () => {
return (
    <Link to="/">
    <FaLightbulb className="fill-current text-black " size={26}/> 
    </Link>
)
}

export default siteLogo