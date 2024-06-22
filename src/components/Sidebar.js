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
    <div className="relative w-full md:w-48 flex flex-row md:flex-col justify-between md:justify-normal bg-gray-800 text-white md:h-screen md:p-4">
      {/* Logo alineado al centro en dispositivos móviles */}
      <div className="flex justify-center md:justify-start">
        <img src={logo} alt="Logo" width="100" className="self-center" />
      </div>
      
      {/* Botón para activar el dropdown en dispositivos móviles */}
      <div className="md:hidden mt-4 flex justify-end">
        <button
          className="text-white hover:text-gray-400 focus:outline-none"
          onClick={toggleDropdown}
        >
          Menu
        </button>
      </div>

      {/* Lista de opciones */}
      <ul className={`bg-gray-800 text-white absolute top-full w-full md:static md:mt-4 flex flex-col gap-2 items-center md:items-start ${dropdownOpen ? 'block' : 'hidden'} md:block`}>
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
  );
};

export default Sidebar;
