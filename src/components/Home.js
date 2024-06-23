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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('');
  const countriesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedContinent]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearchFocus = () => {
    setShowPopup(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowPopup(false), 200); // Timeout to allow click event on popup
  };

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  const handleClearClick = () => {
    setSelectedContinent('');
  };

  const filteredCountries = data.countries.filter(country => {
    const continentName = country.continent.name;
    const isInAmerica = continentName === 'North America' || continentName === 'South America';
    return country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (selectedContinent === '' || (selectedContinent === 'America' && isInAmerica) || selectedContinent === continentName);
  });

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
    <div className='mt-20 md:mt-0'>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      {showPopup && (
        <div className="absolute bg-white border border-gray-300 rounded mt-1 p-2 w-80 z-10">
          <ul>
            {['Africa', 'America', 'Asia', 'Europe', 'Oceania'].map(continent => (
              <li
                key={continent}
                onClick={() => handleContinentClick(continent)}
                className={`cursor-pointer p-1 hover:bg-gray-200 ${selectedContinent === continent ? 'bg-blue-100' : ''}`}
              >
                {continent} {selectedContinent === continent && '✓'}
              </li>
            ))}
            <li
              onClick={handleClearClick}
              className={`cursor-pointer p-1 hover:bg-gray-200 ${selectedContinent === '' ? 'bg-blue-100' : ''}`}
            >
              Clear {selectedContinent === '' && '✓'}
            </li>
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-6">
          <ul className="pagination flex justify-center items-center text-white">
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
