import React, { useEffect, useState } from 'react';
import { fetchCountryImage } from '../services/unsplash';
import { getFlagUrl } from '../services/flagsAPI';

const CountryCard = ({ country, onSelect }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchCountryImage(country.name);
      setImageUrl(url);
    };
    loadImage();
  }, [country.name]);

  const flagUrl = getFlagUrl(country.code);

  return (
    <div onClick={() => onSelect(country)} className="card_country block bg-gray-800 text-white rounded-3xl shadow hover:shadow-lg transition-shadow cursor-pointer">
      <div className='box_imgCard rounded-t-3xl'>
        {imageUrl && <img src={imageUrl} alt={country.name} className="rounded-t-3xl w-full h-40 object-cover object-center rounded" />}
      </div>
      <div className="flex gap-3 px-3 mt-3">
        <div>
          <img src={flagUrl} alt={`${country.name} flag`} className="w-16 h-16 object-cover object-center rounded-3xl" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{country.name}</h2>
          <p>{country.continent.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
