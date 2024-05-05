import React from 'react';
import Logo from '../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <header className="bg-white text-black py-4 flex items-center justify-evenly">
      <div className="flex items-center  ml-4">
        <img src={Logo} alt="Logo" className="h-20 w-20 mr-2 rounded-full" />
      </div>

      <nav className="flex-grow text-center ">
        <ul className="flex justify-center space-x-6">
          <li className="cursor-pointer hover:text-gray-300">Inicio</li>
          <li className="cursor-pointer hover:text-gray-300">Acerca</li>
          <li className="cursor-pointer hover:text-gray-300">Contacto</li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4 mr-4">
        <FontAwesomeIcon icon={faUser} className="h-6 w-6 color-white" />
        <FontAwesomeIcon icon={faStar} className="h-6 w-6" />
      </div>
    </header>
  );
}

export default Header;
