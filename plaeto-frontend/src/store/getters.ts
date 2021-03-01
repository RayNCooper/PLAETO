import { AppState, Chart, ChartMode, Trace, TraceProject } from "@/types/State";

export default {
  isStreaming(state: AppState): boolean {
    return state.isStreaming;
  },
  shouldStack(state: AppState): boolean {
    return state.shouldStack;
  },
  shouldPersist(state: AppState): boolean {
    return state.shouldPersist;
  },
  isConnectedToSocket(state: AppState): boolean {
    return state.isConnectedToSocket;
  },
  chart(state: AppState): Chart {
    return state.chart;
  },
  selectedTraceProject(state: AppState): TraceProject {
    return state.selectedTraceProject;
  },
  traceProjects(state: AppState): TraceProject[] {
    return state.traceProjects;
  },
  inPlaybackMode(state: AppState): boolean {
    return state.inPlaybackMode;
  },
  persistedCurveId(state: AppState): string {
    return state.persistedCurveId;
  },
  displayCurves(state: AppState): boolean {
    return state.displayCurves;
  },
  displayPoints(state: AppState): boolean {
    return state.displayPoints;
  },
  chartMode(state: AppState): ChartMode {
    return state.chartMode;
  }
};
