import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CountryCard from './CountryCard';
import CountryDetails from './CountryDetails';

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
  const [selectedCountry, setSelectedCountry] = useState(null);
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
    setTimeout(() => setShowPopup(false), 200);
  };

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
    setShowPopup(false);
  };

  const handleClearClick = () => {
    setSelectedContinent('');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowPopup(false);
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
    <div className='mt-24 md:mt-0 relative'>
      <input
        type="text"
        placeholder="Search Country..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        className="p-2 border bg-black text-white border-gray-300 rounded mb-2 w-full"
      />
      {selectedContinent && (
        <div className="flex items-center mb-4">
          <span className="bg-blue-500 text-white text-sm font-bold mr-2 px-2.5 py-0.5 rounded">
            {selectedContinent}
          </span>
          <button 
            onClick={handleClearClick}
            className="text-sm text-gray-400 hover:text-white"
          >
            Clear
          </button>
        </div>
      )}
      {showPopup && (
        <div className="absolute bg-black text-white font-bold border border-gray-300 rounded mt-1 p-2 w-full md:w-80 z-10">
          <ul>
            {['Africa', 'America', 'Asia', 'Europe', 'Oceania'].map(continent => (
              <li
                key={continent}
                onClick={() => handleContinentClick(continent)}
                className={`cursor-pointer p-1 hover:bg-white hover:text-black ${selectedContinent === continent ? 'bg-white text-black' : ''}`}
              >
                {continent} {selectedContinent === continent && '✓'}
              </li>
            ))}
            <li
              onClick={handleClearClick}
              className={`cursor-pointer p-1 hover:bg-white hover:text-black ${selectedContinent === '' ? 'bg-black' : ''}`}
            >
              Clear {selectedContinent === '' && '✓'}
            </li>
          </ul>
        </div>
      )}
      <div className="mt-5 md:mt-4 md:mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountries.map((country) => (
          <CountryCard key={country.code} country={country} onSelect={handleCountrySelect} />
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
      {selectedCountry && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-black p-0 rounded-lg shadow-lg w-full md:w-80 relative">
            <button onClick={handleClosePopup} className="absolute top-4 md:top-6 right-6 md:right-8 font-black text-2xl md:text-xl text-white">
              ✕
            </button>
            <CountryDetails code={selectedCountry.code} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;