import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies.js';
import users from './modules/users.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    users,
  },
});
