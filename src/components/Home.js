import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CountryCard from './CountryCard';
import CountryDetails from './CountryDetails';

const GET_COUNTRIES = gql`
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

function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [menuContinentes, setMenuContinentes] = useState(false);
  const [continenteElegido, setContinenteElegido] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const PAISES_POR_PAGINA = 6;

  useEffect(() => {
    setPagina(1);
  }, [busqueda, continenteElegido]);

  if (loading) return <p>Cargando países...</p>;
  if (error) return <p>Ups! Algo salió mal: {error.message}</p>;

  const paisesFiltrados = data.countries.filter(pais => {
    const nombreMin = pais.name.toLowerCase();
    const busquedaMin = busqueda.toLowerCase();
    const continente = pais.continent.name;
    const esAmericano = continente === 'North America' || continente === 'South America';

    return nombreMin.includes(busquedaMin) && 
           (!continenteElegido || 
           (continenteElegido === 'America' && esAmericano) || 
           continenteElegido === continente);
  }).sort((a, b) => a.name.localeCompare(b.name));

 
  const totalPaginas = Math.ceil(paisesFiltrados.length / PAISES_POR_PAGINA);
  const inicio = (pagina - 1) * PAISES_POR_PAGINA;
  const fin = inicio + PAISES_POR_PAGINA;
  const paisesMostrados = paisesFiltrados.slice(inicio, fin);

 
  const cambiarPagina = (nuevaPagina) => {
    setPagina(Math.max(1, Math.min(nuevaPagina, totalPaginas)));
  };

  const toggleMenuContinentes = () => setMenuContinentes(!menuContinentes);

  const seleccionarContinente = (continente) => {
    setContinenteElegido(continente);
    setMenuContinentes(false);
  };


  const renderPaginacion = () => {
    if (totalPaginas <= 1) return null;

    let paginas = [];
    const MAX_PAGINAS = 5;
    let inicio = Math.max(1, pagina - Math.floor(MAX_PAGINAS / 2));
    let fin = Math.min(totalPaginas, inicio + MAX_PAGINAS - 1);
    inicio = Math.max(1, fin - MAX_PAGINAS + 1);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(
        <li key={i} className={`inline-block mx-1 ${pagina === i ? 'text-blue-600' : ''}`}>
          <button onClick={() => cambiarPagina(i)}>{i}</button>
        </li>
      );
    }

    return (
      <ul className="flex justify-center items-center text-white mt-6">
        {pagina > 1 && <li className="mx-1"><button onClick={() => cambiarPagina(pagina - 1)}>Anterior</button></li>}
        {paginas}
        {pagina < totalPaginas && <li className="mx-1"><button onClick={() => cambiarPagina(pagina + 1)}>Siguiente</button></li>}
      </ul>
    );
  };

  return (
    <div className='mt-24 md:mt-0 relative'>
      <input
        type="text"
        placeholder="Busca un país..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onFocus={toggleMenuContinentes}
        onBlur={() => setTimeout(() => setMenuContinentes(false), 200)}
        className="p-2 border bg-black text-white border-gray-300 rounded mb-2 w-full"
      />

      {continenteElegido && (
        <div className="flex items-center mb-4">
          <span className="bg-blue-500 text-white text-sm font-bold mr-2 px-2.5 py-0.5 rounded">
            {continenteElegido}
          </span>
          <button 
            onClick={() => setContinenteElegido('')}
            className="text-sm text-gray-400 hover:text-white"
          >
            Quitar filtro
          </button>
        </div>
      )}

      {menuContinentes && (
        <div className="absolute bg-black text-white font-bold border border-gray-300 rounded mt-1 p-2 w-full md:w-80 z-10">
          <ul>
            {['Africa', 'America', 'Asia', 'Europe', 'Oceania'].map(c => (
              <li
                key={c}
                onClick={() => seleccionarContinente(c)}
                className={`cursor-pointer p-1 hover:bg-white hover:text-black ${continenteElegido === c ? 'bg-white text-black' : ''}`}
              >
                {c} {continenteElegido === c ? '✓' : ''}
              </li>
            ))}
            <li
              onClick={() => setContinenteElegido('')}
              className={`cursor-pointer p-1 hover:bg-white hover:text-black ${!continenteElegido ? 'bg-black' : ''}`}
            >
              Todos los continentes {!continenteElegido ? '✓' : ''}
            </li>
          </ul>
        </div>
      )}

      <div className="mt-5 md:mt-4 md:mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paisesMostrados.map((pais) => (
          <CountryCard 
            key={pais.code} 
            country={pais} 
            onSelect={() => setPaisSeleccionado(pais)} 
          />
        ))}
      </div>

      {renderPaginacion()}

      {paisSeleccionado && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-black p-0 rounded-lg shadow-lg w-full md:w-80 relative">
            <button 
              onClick={() => setPaisSeleccionado(null)} 
              className="absolute top-4 md:top-6 right-6 md:right-8 font-black text-2xl md:text-xl text-white"
            >
              ✕
            </button>
            <CountryDetails code={paisSeleccionado.code} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;