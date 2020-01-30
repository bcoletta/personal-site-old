import API from './api-service.js';

const baseURI = 'movies';

export default {
  getMovies() {
    return API.get(baseURI).then(res => res);
  },
}