<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="ma-3 pa-2 blue-grey lighten-3">
          <v-card-title class="white--text">Stored Projects</v-card-title>
          <v-card-subtitle class="white--text text-caption"
            ><b>Tip:</b> Load a project by clicking on an item in the list
            beneath.</v-card-subtitle
          >
          <v-list nav dense>
            <v-list-item-group
              v-model="selectedTrace"
              color="primary"
              mandatory
              @change="loadSelectedTrace"
            >
              <v-list-item v-for="project in projects" :key="project._id">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="listItemText(project)"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    fas fa-plus
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>New Trace Set</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-card-actions v-if="inPlaybackMode">
            <v-btn @click="deleteProject" small class="error mt-2">
              delete trace project
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="ma-3 pa-2 blue-grey lighten-3" v-if="inPlaybackMode">
          <v-card-title class="white--text">Display Options</v-card-title>

          <v-container class="white">
            <div class="text-subtitle-2">Data Display</div>
            <v-checkbox
              v-model="displayPoints"
              label="Display Data Points"
              color="info"
              hide-details
              :disabled="disableCheckboxes"
            ></v-checkbox>
            <v-checkbox
              v-model="displayCurves"
              label="Display Fitted Curves"
              color="info"
              hide-details
              :disabled="disableCheckboxes"
            ></v-checkbox>

            <div class="text-subtitle-2 mt-5">Chart Type</div>
            <v-radio-group mandatory v-model="selectedChartMode">
              <v-radio label="2D"></v-radio>
              <v-radio label="3D"></v-radio>
            </v-radio-group>
          </v-container>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Chart, ChartMode, Trace, TraceProject } from "@/types/State";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import regression from "regression";
import { create, all, trace } from "mathjs";

@Component({
  computed: mapGetters({
    projects: "traceProjects",
    inPlaybackMode: "inPlaybackMode"
  }),
  methods: mapMutations([]),
  components: {}
})
export default class RemoteTracesPanel extends Vue {
  @Watch("selectedTrace")
  onSelectedTraceChanged(val: number) {
    this.$store.commit(
      "chartTitle",
      this.$store.getters.selectedTraceProject.title
    );

    /* Reset all Inputs when selecting a Trace Project to load */
    this.$store.commit("displayPoints", true);
    this.$store.commit("displayCurves", false);
    this.$store.commit("chartMode", ChartMode.TwoDimensional);
    this.selectedChartMode = 0;

    if (val == 0) this.$store.commit("inPlaybackMode", false);
    else if (val > 0) this.$store.commit("inPlaybackMode", true);
  }

  @Watch("selectedChartMode")
  onSelectedChartModeChanged(val: number) {
    this.$store.commit("displayPoints", true);
    this.$store.commit("displayCurves", false);

    if (val == 1) this.$store.commit("chartMode", ChartMode.ThreeDimensional);
    else if (val == 0)
      this.$store.commit("chartMode", ChartMode.TwoDimensional);
  }

  selectedTrace = 0;
  selectedChartMode = 0;

  get disableCheckboxes() {
    if (this.$store.getters.chartMode == ChartMode.ThreeDimensional)
      return true;
    return false;
  }

  get displayPoints() {
    return this.$store.getters.displayPoints;
  }

  set displayPoints(displayPoints: boolean) {
    this.$store.commit("displayPoints", displayPoints);

    if (displayPoints) {
      /* Add Points to Chart */
      const selectedTraceProject = this.$store.getters.selectedTraceProject;

      const traces: Trace[] = [];

      selectedTraceProject.traces.forEach((t: { trace_points: any[] }) => {
        if (typeof t.trace_points !== "undefined") {
          const x: any[] = [];
          const y: any[] = [];
          t.trace_points.forEach((p) => {
            x.push(p.voltage);
            y.push(p.micro_amperage);
          });
          traces.push({ x: x, y: y, mode: "markers", type: "scatter" });
        }
      });
      this.$store.commit({
        type: "addToChartMultiple",
        traces: traces
      });
    } else {
      /* Remove Points from Chart */
      const c: Chart = {
        uuid: "",
        layout: {
          title: "",
          xaxis: { title: { text: "" } },
          yaxis: { title: { text: "" } }
        },
        traces: []
      };

      Object.assign(c, this.$store.getters.chart);

      const traces = c.traces.filter((trace) => {
        return trace.mode !== "markers";
      });

      Vue.set(c, "traces", traces);
      this.$store.commit("setChart", c);
    }
  }

  get displayCurves() {
    return this.$store.getters.displayCurves;
  }

  set displayCurves(displayCurves: boolean) {
    this.$store.commit("displayCurves", displayCurves);

    if (displayCurves) {
      /* Add fitted curves to chart */
      const math: any = create(all, {});

      const selectedTraceProject = this.$store.getters.selectedTraceProject;
      const traces: Trace[] = [];

      let maxV = 0;

      selectedTraceProject.traces.forEach((t: any) => {
        const d: any = [];

        t.trace_points.forEach((p: any) => {
          if (p.voltage > maxV) maxV = p.voltage;
          if (p.micro_amperage > 0) d.push([p.voltage, p.micro_amperage]);
        });

        const result = regression.polynomial(d, { order: 3 });
        const expr = math.compile(result.string);

        const xValues = math.range(0, maxV, maxV / 20).toArray();
        const yValues = xValues.map(function(x: any) {
          return expr.evaluate({ x: x });
        });

        traces.push({ x: xValues, y: yValues, type: "scatter", mode: "lines" });
      });

      this.$store.commit({
        type: "addToChartMultiple",
        traces: traces,
        newCurve: true
      });
    } else {
      /* Remove curves from chart */
      const c: Chart = {
        uuid: "",
        layout: {
          title: "",
          xaxis: { title: { text: "" } },
          yaxis: { title: { text: "" } }
        },
        traces: []
      };

      Object.assign(c, this.$store.getters.chart);

      const traces = c.traces.filter((trace) => {
        return trace.mode !== "lines";
      });

      Vue.set(c, "traces", traces);
      this.$store.commit("setChart", c);
    }
  }

  deleteProject() {
    const d = this.$store.dispatch(
      "deleteProject",
      this.$store.getters.selectedTraceProject
    );
    d.then(
      (r) => {
        const t: TraceProject[] = this.$store.getters.traceProjects;
        const p = t.filter((val: TraceProject) => {
          return val._id !== r.config.params.id;
        });
        console.log(p);
        this.$store.commit("setTraceProjects", p);
      },
      (e) => console.log(e)
    );
  }

  listItemText(traceProject: TraceProject) {
    return `${traceProject.title}, ${traceProject.traces.length} Trace(s)`;
  }

  loadSelectedTrace() {
    if (this.selectedTrace !== 0) {
      this.$store.commit(
        "setSelectedTraceProject",
        this.$store.getters.traceProjects[this.selectedTrace - 1]
      );
    } else if (this.selectedTrace == 0) {
      this.$store.commit("clearChart");
      this.$store.commit("setSelectedTraceProject", {
        title: "",
        traces: [],
        metadata: {
          country: "",
          city: "",
          weather: "",
          lux: 0,
          environment: ""
        }
      });
    }
  }

  async created() {
    try {
      const response = await this.$store.dispatch("getProjects");
      this.$store.commit("setTraceProjects", response.data.projects);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped></style>
