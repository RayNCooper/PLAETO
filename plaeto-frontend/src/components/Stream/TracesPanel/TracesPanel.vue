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
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { TraceProject } from "@/types/State";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters({ projects: "traceProjects" }),
  methods: mapMutations([]),
  components: {}
})
export default class TracesPanel extends Vue {
  @Watch("selectedTrace")
  onSelectedTraceChanged(val: number, oldVal: number) {
    if (val == 0) this.$store.commit("inPlaybackMode", false);
    else if (val > 0) this.$store.commit("inPlaybackMode", true);
  }
  selectedTrace = 0;

  listItemText(traceProject: TraceProject) {
    return `${traceProject.title}, ${traceProject.traces.length} Trace(s)`;
  }

  loadSelectedTrace() {
    if (this.selectedTrace !== 0) {
      this.$store.commit(
        "setSelectedTraceProject",
        this.$store.getters.traceProjects[this.selectedTrace - 1]
      );
    } else if (this.selectedTrace == 0) this.$store.commit("clearChart");
  }

  async created() {
    try {
      const response = await this.$store.dispatch("getProjects");
      this.$store.commit("setTraceProjects", response.data.projects);
      console.log(this.$store.getters.traceProjects);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped></style>
