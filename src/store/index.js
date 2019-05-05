import Vue from "vue";
import Vuex from "vuex";
import services from "./services";
Vue.use(Vuex);

const state = {
  services,
  user: []
};

const getters = {
  token: state => {
    return state.user.token;
  }
};

const mutations = {
  setUserLogin(state, user) {
    state.user = user;
  },
  closeLogin(state) {
    state.user = null;
  }
};

const actions = {
  auth: (context, user) => context.commit("setUserLogin", user)
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
