import React, { useEffect, useState } from 'react';
import { fetchCountryImage } from '../services/unsplash';
import { getFlagUrl } from '../services/flagsAPI';

function CountryCard({ country, onSelect }) {
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    async function cargarImagen() {
      try {
        const url = await fetchCountryImage(country.name);
        setImagenUrl(url);
      } catch (error) {
        console.error("Error al cargar la imagen del país:", error);
        setImagenUrl(''); 
      }
    }
    cargarImagen();
  }, [country.name]);

  const banderaUrl = getFlagUrl(country.code);

  return (
    <div 
      onClick={() => onSelect(country)} 
      className="tarjeta-pais block bg-gray-800 text-white rounded-3xl shadow hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className='contenedor-imagen rounded-t-3xl'>
        {imagenUrl && (
          <img 
            src={imagenUrl} 
            alt={`Paisaje de ${country.name}`} 
            className="rounded-t-3xl w-full h-40 object-cover object-center rounded" 
          />
        )}
      </div>
      <div className="flex gap-3 px-3 mt-3">
        <div>
          <img 
            src={banderaUrl} 
            alt={`Bandera de ${country.name}`} 
            className="w-16 h-16 object-cover object-center rounded-3xl" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{country.name}</h2>
          <p>{country.continent.name}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;