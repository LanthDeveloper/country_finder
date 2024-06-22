import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CountryCard from './CountryCard';

const COUNTRIES_QUERY = gql`
  {
    countries {
      code
      name
      continent {
        name
      }
      emoji
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5;
    const halfMaxPages = Math.floor(maxPages / 2);
    
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`inline-block mx-1 ${currentPage === i ? 'text-blue-600' : ''}`}>
          <a href="#" onClick={(e) => handleClick(e, i)}>
            {i}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div class="max-w-screen-xl">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          <ul className="pagination flex justify-center items-center">
            {currentPage > 1 && (
              <li className="inline-block mx-1">
                <a href="#" onClick={(e) => handleClick(e, currentPage - 1)}>
                  Previous
                </a>
              </li>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
              <li className="inline-block mx-1">
                <a href="#" onClick={(e) => handleClick(e, currentPage + 1)}>
                  Next
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;