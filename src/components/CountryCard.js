// src/components/CountryCard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCountryImage } from '../services/unsplash';

const CountryCard = ({ country }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchCountryImage(country.name);
      setImageUrl(url);
    };
    loadImage();
  }, [country.name]);

  return (
    <Link to={`/country/${country.code}`} className="block p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
      {imageUrl && <img src={imageUrl} alt={country.name} className="w-full h-24 object-cover mb-2 rounded" />}
      <div class="flex gap-3">
        <div>
          <div className="text-6xl mb-2 mx-auto">{country.emoji}</div>
        </div>
        <div class="flex flex-col">
          <h2 className="text-xl font-bold mb-2">{country.name}</h2>
          <p>{country.continent.name}</p>
        </div>
      </div>
      
      
    </Link>
  );
};

export default CountryCard;
