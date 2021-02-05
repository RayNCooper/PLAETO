import Vue from "vue";
import Vuex from "vuex";
import { AppState, Chart, Trace } from "@/types/State";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new AppState(),
  getters: {
    isStreaming(state: AppState): boolean {
      return state.isStreaming;
    },
    shouldStack(state: AppState): boolean {
      return state.shouldStack;
    },
    isConnectedToSocket(state: AppState): boolean {
      return state.isConnectedToSocket;
    },
    chart(state: AppState): Chart {
      return state.chart;
    }
  },
  mutations: {
    setIsStreaming(state: AppState, payload: boolean) {
      state.isStreaming = payload;
    },
    setShouldStack(state: AppState, payload: boolean) {
      state.shouldStack = payload;
    },
    setIsConnectedToSocket(state: AppState, payload: boolean) {
      state.isConnectedToSocket = payload;
    },
    addToChart(state: AppState, trace: Trace) {
      state.chart.traces.push(trace);
    },
    clearChart(state: AppState) {
      const newTraces: Trace[] = [];

      Vue.set(state.chart, "traces", newTraces);
    }
  },
  actions: {},
  modules: {}
});
