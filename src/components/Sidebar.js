import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Sidebar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
  }

  return (
    <div className='fixed md:static w-full md:w-48 z-10'>
      <div className="relative md:static w-full md:w-48 flex flex-row md:flex-col justify-between md:justify-normal bg-gray-800 text-white md:h-screen md:p-4 py-3 md:py-0">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Link to="/">
            <img src={logo} alt="Logo de la app" className="ml-3 md:ml-0 self-center w-16 md:w-32" />
          </Link>
        </div>
        
        {/* Botón Stack */}
        <div className="md:hidden mt-4 flex flex-col items-center mr-3 md:mr-0">
          <button
            className="text-white hover:text-gray-400 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg fill="#ffffff" className='w-8' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <title>Menú</title>
              <path d="M6 14h20v4H6v-4zm0 12h20v-4H6v4zM6 6v4h20V6H6z"/>
            </svg>
          </button>
        </div>

        {/* Menú de navegación */}
        <ul className={`bg-gray-800 text-white absolute top-full w-full md:static md:mt-4 gap-2 items-center md:items-start ${menuAbierto ? 'flex' : 'hidden'} flex-col md:flex gap-5 pb-5 md:pb-0 text-xl md:text-2xl font-bold`}>
          <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
          <li><Link to="/view-1" className="hover:text-gray-400">Vista 1</Link></li>
          <li><Link to="/view-2" className="hover:text-gray-400">Vista 2</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;