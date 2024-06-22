// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';


const Sidebar = () => {
  return (
    <div className="w-48 bg-gray-800 text-white md:h-svh p-4">
      <img src={logo} alt="Logo" width="100" />
      <ul class="mt-8">
        <li className="mb-2">
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/vista1" className="hover:text-gray-400">Vista 1</Link>
        </li>
        <li className="mb-2">
          <Link to="/vista2" className="hover:text-gray-400">Vista 2</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
