<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="ma-3 pa-2 blue-grey lighten-3">
          <reactive-chart-holder></reactive-chart-holder>
        </v-card>
        <v-card-actions v-if="!inPlaybackMode">
          <v-btn
            :disabled="isStreaming"
            @click="setIsStreaming(true)"
            color="green"
            class="white--text"
            fab
          >
            <v-icon dark>
              fas fa-play
            </v-icon>
          </v-btn>
          <v-btn
            :disabled="!isStreaming"
            @click="setIsStreaming(false)"
            color="red"
            class="white--text"
            fab
          >
            <v-icon dark>
              fas fa-pause
            </v-icon>
          </v-btn>
          <v-btn @click="clearChart" color="red" class="white--text" fab>
            <v-icon dark>
              fas fa-trash
            </v-icon>
          </v-btn>
          <v-spacer> </v-spacer>
          <v-checkbox
            class="mr-2"
            v-model="shouldStack"
            label="Stack Traces"
            color="info"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="shouldPersist"
            :disabled="isStreaming"
            label="Persist Recording"
            color="info"
            hide-details
          ></v-checkbox>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactiveChartHolder from "@/components/Stream/StreamPanel/Chart/ReactiveChartHolder.vue";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters(["isStreaming", "inPlaybackMode"]),
  methods: mapMutations(["setIsStreaming"]),

  components: { ReactiveChartHolder }
})
export default class StreamPanel extends Vue {
  get shouldStack() {
    return this.$store.getters.shouldStack;
  }

  set shouldStack(shouldStack: boolean) {
    this.$store.commit("setShouldStack", shouldStack);
  }

  get shouldPersist() {
    return this.$store.getters.shouldPersist;
  }

  set shouldPersist(shouldPersist: boolean) {
    this.$store.commit("setShouldPersist", shouldPersist);
  }

  clearChart() {
    this.$store.commit("clearChart");
  }
}
</script>

<style scoped></style>
