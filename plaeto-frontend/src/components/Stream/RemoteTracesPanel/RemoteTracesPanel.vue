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
        </v-card>
        <v-card-actions v-if="inPlaybackMode">
          <v-btn fab small class="success ma-1">
            <v-icon>fas fa-file-download</v-icon>
          </v-btn>
          <v-btn @click="fit" small class="success">
            fit curve
          </v-btn>
          <v-btn @click="deleteProject" small class="error">
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Trace, TraceProject } from "@/types/State";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import regression from "regression";
import { create, all } from "mathjs";

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
  onSelectedTraceChanged(val: number, oldVal: number) {
    this.$store.commit("fittedCurveExpr", "");
    this.$store.commit(
      "chartTitle",
      this.$store.getters.selectedTraceProject.title
    );

    if (val == 0) this.$store.commit("inPlaybackMode", false);
    else if (val > 0) this.$store.commit("inPlaybackMode", true);
  }
  selectedTrace = 0;

  fit() {
    if (!this.$store.getters.fittedCurveExpr) {
      const math: any = create(all, {});

      let maxV = 0;

      const d: any = [];
      const traces = this.$store.getters.selectedTraceProject.traces;
      traces.forEach((t: any) => {
        t.trace_points.forEach((p: any) => {
          if (p.voltage > maxV) maxV = p.voltage;
          if (p.micro_amperage > 0) d.push([p.voltage, p.micro_amperage]);
        });
      });
      const result = regression.polynomial(d, { order: 3 });
      const expr = math.compile(result.string);

      this.$store.commit("fittedCurveExpr", result.string);

      const xValues = math.range(0, maxV, 0.05).toArray();
      const yValues = xValues.map(function(x: any) {
        return expr.evaluate({ x: x });
      });

      const trace = {
        x: xValues,
        y: yValues,
        type: "scatter"
      };

      this.$store.commit({ type: "addToChart", trace: trace, newCurve: true });
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
