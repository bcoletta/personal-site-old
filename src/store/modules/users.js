const state = {
  password: '',
};

const getters = {
  password: state => state.password,
};

const mutations = {
  setPassword(state, password) {
    state.password = password;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
}