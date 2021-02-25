import Vue from "vue";
import { AppState, Chart, Trace, TraceProject } from "@/types/State";

export default {
  setIsStreaming(state: AppState, payload: boolean) {
    state.isStreaming = payload;
  },
  setShouldStack(state: AppState, payload: boolean) {
    state.shouldStack = payload;
  },
  setShouldPersist(state: AppState, payload: boolean) {
    state.shouldPersist = payload;
  },
  setIsConnectedToSocket(state: AppState, payload: boolean) {
    state.isConnectedToSocket = payload;
  },
  addToChart(state: AppState, trace: Trace) {
    if (state.chart.traces[0]) {
      state.chart.traces[0].x.push(...trace.x);
      state.chart.traces[0].y.push(...trace.y);
    } else state.chart.traces.push(trace);
  },
  setTraceProjects(state: AppState, traceProjects: TraceProject[]) {
    Vue.set(state, "traceProjects", traceProjects);
  },
  setSelectedTraceProject(state: AppState, traceProject: TraceProject) {
    Vue.set(state, "selectedTraceProject", traceProject);
  },
  clearChart(state: AppState) {
    const newTraces: Trace[] = [];
    Vue.set(state.chart, "traces", newTraces);
  },
  inPlaybackMode(state: AppState, inPlaybackMode: boolean) {
    state.inPlaybackMode = inPlaybackMode;
  }
};
