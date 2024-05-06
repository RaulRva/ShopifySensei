import React from 'react';
import Logo from '../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className="text-black p-4 bg-[#063262]">
      <div className='container flex items-center justify-evenly m-auto'>
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-20 w-20 mr-2 rounded-full" />
          </Link>
        </div>

        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-6">
            <li><Link to="/" className="cursor-pointer text-white hover:text-gray-300">Posts</Link></li>
            <li><Link to="/sobre-nosotros" className="cursor-pointer text-white hover:text-gray-300">Sobre nosotros</Link></li>
            <li><Link to="/mi-cuenta" className="cursor-pointer text-white hover:text-gray-300">Contacto</Link></li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4 mr-4">
          <Link to="/mi-cuenta"><FontAwesomeIcon icon={faUser} className="h-6 w-6 color-white" /></Link>
          <Link to="/mi-cuenta"><FontAwesomeIcon icon={faStar} className="h-6 w-6 color-white" /></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
