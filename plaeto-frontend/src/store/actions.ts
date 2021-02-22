import Vue from "vue";
import { ActionContext } from "vuex";
import { AppState, TraceProject } from "@/types/State";
import { AxiosResponse } from "axios";

export default {
  getProjects(
    context: ActionContext<AppState, AppState>
  ): Promise<AxiosResponse<any>> {
    return Vue.axios.get("http://localhost:8000/projects");
  },
  postProject(
    context: ActionContext<AppState, AppState>,
    traceProject: TraceProject
  ): Promise<AxiosResponse<any>> {
    return Vue.axios.post("http://localhost:8000/project", traceProject);
  }
};
