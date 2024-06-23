// src/services/unsplash.js
import axios from 'axios';
import { UNSPLASH_ACCESS_KEY, PIXABAY_API_KEY } from '../config';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
  }
});

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/'
});

export const fetchCountryImage = async (countryName) => {
  try {
    console.log('Buscando imagen para:', countryName);
    
    // Intenta primero con Unsplash
    try {
      console.log('Intentando con Unsplash...');
      const unsplashResponse = await unsplashApi.get('/search/photos', {
        params: { query: countryName, per_page: 1 }
      });
      
      console.log('Respuesta de Unsplash:', unsplashResponse.data);
      
      if (unsplashResponse.data.results.length > 0) {
        console.log('Imagen encontrada en Unsplash');
        return unsplashResponse.data.results[0].urls.small;
      }
    } catch (unsplashError) {
      console.error('Error con Unsplash:', unsplashError.message);
    }

    // Si no encuentra en Unsplash o hay un error, intenta con Pixabay
    console.log('Intentando con Pixabay...');
    const pixabayResponse = await pixabayApi.get('', {
      params: {
        key: PIXABAY_API_KEY,
        q: countryName,
        per_page: 3, 
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
      }
    });

    console.log('Respuesta de Pixabay:', pixabayResponse.data);

    if (pixabayResponse.data.hits.length > 0) {
      console.log('Imagen encontrada en Pixabay');
      return pixabayResponse.data.hits[0].webformatURL;
    }

    console.log('No se encontró imagen en ninguna API');
    return '';
  } catch (error) {
    console.error('Error detallado:', error.response ? error.response.data : error.message);
    return '';
  }
};
