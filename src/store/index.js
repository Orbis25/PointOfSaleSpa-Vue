import Vue from "vue";
import Vuex from "vuex";
import services from "./services";
Vue.use(Vuex);

const state = {
  services
};

const getters = {

};

export default new Vuex.Store({
  state,
  getters
});
