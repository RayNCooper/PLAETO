<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="mt-3 mb-3 ml-2 mr-2 pa-2 blue-grey lighten-3">
          <v-card-title class="white--text">Metadata</v-card-title>
          <v-card flat class="pl-3 pr-3 pt-5 pb- white">
            <v-text-field
              :value="selectedTraceProject.title"
              background-color="grey lighten-4"
              dense
              label="Title"
              placeholder="Office Energy Record"
              outlined
              :readonly="inPlaybackMode"
            ></v-text-field>
            <v-text-field
              :value="selectedTraceProject.metadata['country']"
              background-color="grey lighten-4"
              dense
              label="Country"
              placeholder="Germany"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-flag"
            ></v-text-field>
            <v-text-field
              :value="selectedTraceProject.metadata['city']"
              background-color="grey lighten-4"
              dense
              label="City"
              placeholder="Essen, Ruhr"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-city"
            ></v-text-field>
            <v-text-field
              :value="selectedTraceProject.metadata['weather']"
              background-color="grey lighten-4"
              dense
              label="Weather"
              placeholder="Rainy"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-cloud"
            ></v-text-field>
            <v-text-field
              :value="lux"
              background-color="grey lighten-4"
              dense
              label="Lux"
              placeholder="1200"
              outlined
              :readonly="inPlaybackMode"
              append-icon="mdi-lightbulb"
            ></v-text-field>
            <v-text-field
              :value="selectedTraceProject.metadata['environment']"
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters(["inPlaybackMode", "selectedTraceProject"]),
  methods: mapMutations([]),
  components: {}
})
export default class ProjectPanel extends Vue {
  get lux() {
    if (this.$store.getters.inPlaybackMode)
      return this.$store.getters.selectedTraceProject.metadata.lux;
    return "";
  }
}
</script>

<style scoped></style>
