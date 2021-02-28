<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="mt-3 mb-3 ml-2 mr-2 pa-2 blue-grey lighten-3">
          <v-card-title class="white--text">Metadata</v-card-title>
          <v-card flat class="pl-3 pr-3 pt-5 white">
            <v-text-field
              v-model="title"
              background-color="grey lighten-4"
              dense
              label="Title"
              placeholder="Office Energy Record"
              outlined
              :readonly="inPlaybackMode"
            ></v-text-field>
            <v-text-field
              v-model="country"
              background-color="grey lighten-4"
              dense
              label="Country"
              placeholder="Germany"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-flag"
            ></v-text-field>
            <v-text-field
              v-model="city"
              background-color="grey lighten-4"
              dense
              label="City"
              placeholder="Essen, Ruhr"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-city"
            ></v-text-field>
            <v-text-field
              v-model="weather"
              background-color="grey lighten-4"
              dense
              label="Weather"
              placeholder="Rainy"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-cloud"
            ></v-text-field>
            <v-text-field
              v-model="lux"
              background-color="grey lighten-4"
              dense
              label="Lux"
              :rules="[rules.number]"
              placeholder="1200"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-lightbulb"
            ></v-text-field>
            <v-text-field
              v-model="environment"
              background-color="grey lighten-4"
              dense
              label="Environment"
              placeholder="Urban"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-domain"
            ></v-text-field>
          </v-card>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Trace, TraceProject } from "@/types/State";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters(["inPlaybackMode", "selectedTraceProject"]),
  methods: mapMutations([]),
  components: {}
})
export default class MetadataPanel extends Vue {
  rules = {
    number: (value: any) => !isNaN(value) || "Must be a number!"
  };

  newTraceProject(): TraceProject {
    const p: TraceProject = {
      traces: [],
      metadata: {
        country: "",
        city: "",
        weather: "",
        environment: "",
        lux: 0
      },
      title: ""
    };
    return p;
  }

  get lux() {
    return this.$store.getters.selectedTraceProject.metadata.lux;
  }

  set lux(lux: number) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.metadata.lux = lux;

    this.$store.commit("setSelectedTraceProject", p);
  }

  get title() {
    return this.$store.getters.selectedTraceProject.title;
  }

  set title(title: string) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.title = title;

    this.$store.commit("setSelectedTraceProject", p);
  }

  get country() {
    return this.$store.getters.selectedTraceProject.metadata.country;
  }

  set country(country: string) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.metadata.country = country;

    this.$store.commit("setSelectedTraceProject", p);
  }

  get city() {
    return this.$store.getters.selectedTraceProject.metadata.city;
  }

  set city(city: string) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.metadata.city = city;

    this.$store.commit("setSelectedTraceProject", p);
  }

  get weather() {
    return this.$store.getters.selectedTraceProject.metadata.weather;
  }

  set weather(weather: string) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.metadata.weather = weather;

    this.$store.commit("setSelectedTraceProject", p);
  }

  get environment() {
    return this.$store.getters.selectedTraceProject.metadata.environment;
  }

  set environment(environment: string) {
    const p = this.newTraceProject();
    Object.assign(p, this.$store.getters.selectedTraceProject);
    p.metadata.environment = environment;

    this.$store.commit("setSelectedTraceProject", p);
  }
}
</script>

<style scoped></style>
