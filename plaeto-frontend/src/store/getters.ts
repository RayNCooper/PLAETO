import { AppState, Chart, Trace, TraceProject } from "@/types/State";

export default {
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
  },
  selectedTraceProject(state: AppState): TraceProject {
    return state.selectedTraceProject;
  },
  traceProjects(state: AppState): TraceProject[] {
    return state.traceProjects;
  },
  localTraceProject(state: AppState): TraceProject {
    return state.localTraceProject;
  },
  inPlaybackMode(state: AppState): boolean {
    return state.inPlaybackMode;
  }
};
