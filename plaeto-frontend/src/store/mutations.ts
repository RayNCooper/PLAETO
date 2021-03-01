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
  addToChart(state: AppState, payload: { trace: Trace; newCurve: boolean }) {
    if (state.chart.traces[0] && !payload.newCurve) {
      state.chart.traces[0].x.push(...payload.trace.x);
      state.chart.traces[0].y.push(...payload.trace.y);
    } else state.chart.traces.push(payload.trace);
    if (payload.trace.mode) Vue.set(state.chart.traces[0], "mode", "markers");
    if (payload.trace.type) Vue.set(state.chart.traces[0], "type", "scatter");
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
  },
  persistedCurveId(state: AppState, id: string) {
    state.persistedCurveId = id;
  },
  fittedCurveExpr(state: AppState, expr: string) {
    state.fittedCurveExpr = expr;
  },
  chartTitle(state: AppState, title: string) {
    state.chart.layout.title = title;
  }
};
