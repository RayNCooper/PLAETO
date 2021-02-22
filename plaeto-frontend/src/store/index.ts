import Vue from "vue";
import Vuex from "vuex";
import { AppState } from "@/types/State";
import storeActions from "./actions";
import storeGetters from "./getters";
import storeMutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new AppState(),
  getters: storeGetters,
  mutations: storeMutations,
  actions: storeActions,
  modules: {}
});
