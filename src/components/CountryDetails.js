import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { fetchCountryImage } from '../services/unsplash';
import { getFlagUrl } from '../services/flagsAPI';

const COUNTRY_QUERY = gql`
  query ObtenerPais($code: ID!) {
    country(code: $code) {
      name
      capital
      currency
      languages {
        name
      }
      code
      continent {
        name
      }
    }
  }
`;

function CountryDetails({ code }) {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { code }
  });

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (data && data.country) {
      const cargarImagen = async () => {
        try {
          const url = await fetchCountryImage(data.country.name);
          setImageUrl(url);
        } catch (err) {
          console.error("Error al cargar la imagen del país:", err);
        }
      };
      cargarImagen();
    }
  }, [data]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, capital, currency, languages, continent } = data.country;
  const flagUrl = getFlagUrl(code);

  return (
    <div className='w-full md:w-80 my-16 md:my-0 md:mt-0 text-white px-6 md:p-4'>
      <div className='box_imgCard mb-4'>
        {imageUrl && <img src={imageUrl} alt={`Imagen de ${name}`} className="w-full h-56 object-cover object-center" />}
      </div>
      <div className="flex gap-3 mb-4">
        <img src={flagUrl} alt={`Bandera de ${name}`} className="w-16 h-16 object-cover object-center rounded-3xl" />
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p>{continent.name}</p>
        </div>
      </div>
      <p><strong>Capital:</strong> {capital || 'No disponible'}</p>
      <p><strong>Moneda:</strong> {currency || 'No disponible'}</p>
      <p><strong>Idiomas:</strong> {languages.length > 0 ? languages.map(lang => lang.name).join(', ') : 'No disponible'}</p>
    </div>
  );
}

export default CountryDetails;