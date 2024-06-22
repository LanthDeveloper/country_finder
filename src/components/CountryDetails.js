//src/components/CountryDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const COUNTRY_QUERY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const CountryDetails = () => {
  let { code } = useParams();
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { code }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, capital, currency, languages } = data.country;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Currency:</strong> {currency}</p>
      <p><strong>Languages:</strong> {languages.map(lang => lang.name).join(', ')}</p>
    </div>
  );
}

export default CountryDetails;
