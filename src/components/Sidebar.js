// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para cambiar el estado del dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='fixed md:static w-full md:w-48 z-10'>
      <div className="relative md:static w-full md:w-48 flex flex-row md:flex-col justify-between md:justify-normal bg-gray-800 text-white md:h-screen md:p-4  py-3 md:py-0">
      {/* Logo alineado al centro en dispositivos móviles */}
      <div className="flex justify-center md:justify-start">
        <Link to="/"><img src={logo} alt="Logo" className="ml-3 md:ml-0 self-center w-16 md:w-32" /></Link>
      </div>
      
      {/* Botón para activar el dropdown en dispositivos móviles */}
      <div className="md:hidden mt-4 flex flex-col items-center mr-3 md:mr-0">
        <button
          className="text-white hover:text-gray-400 focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg fill="#ffffff" className='w-8' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <title>stack</title> <path d="M6 14h20v4h-20v-4zM6 26h20v-4h-20v4zM6 6v4h20v-4h-20z"/> </g>    
          </svg>
        </button>
      </div>

      {/* Lista de opciones */}
      <ul className={`bg-gray-800 text-white absolute top-full w-full md:static md:mt-4  gap-2 items-center md:items-start ${dropdownOpen ? 'flex' : 'hidden'} flex flex-col md:flex gap-5 pb-5 md:pb-0 text-xl md:text-2xl font-bold`}>
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/view-1" className="hover:text-gray-400">View 1</Link>
        </li>
        <li>
          <Link to="/view-2" className="hover:text-gray-400">View 2</Link>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
