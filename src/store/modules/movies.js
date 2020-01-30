import MovieService from '../../services/api/movie-service.js';

const state = {
  movies: [],
};

const getters = {
  movies: state => state.movies,
};

const mutations = {
  setMovies(state, list) {
    state.movies = list;
  },
};

const actions = {
  getMovies({ getters, commit, }) {
    let movies = [ ...getters.movies, ];
    if (movies.length > 0) {
      return movies;
    }
    return MovieService.getMovies().then(res => {
      commit('setMovies', res);
      return res;
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}