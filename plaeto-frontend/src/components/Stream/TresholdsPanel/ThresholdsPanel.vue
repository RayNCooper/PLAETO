<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" outlined>
        <v-card class="ma-3 pa-2 blue-grey lighten-3 white--text">
          <v-card-title>Threshold Options</v-card-title>
          <v-card-subtitle class="white--text">
            Set a Threshold to classify Trace data
          </v-card-subtitle>
          <v-card flat class="pl-3 pb-1 pr-3 pt-5 white">
            <v-row>
              <v-col sm="2">
                <v-text-field
                  v-model="threshold"
                  background-color="grey lighten-4"
                  dense
                  label="Threshold at V0"
                  :rules="[rules.number]"
                  placeholder="40"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col sm="10" align-self="auto">
                <v-progress-linear
                  :value="inclusion"
                  height="40"
                  background-color="grey lighten-1"
                  color="green lighten-2"
                >
                  <template v-slot:default="{ value }">
                    <strong class="white--text">
                      {{ Math.ceil(value) }}%
                    </strong>
                  </template>
                </v-progress-linear>
              </v-col>
            </v-row>
            <v-row justify="center" v-if="displayInfo">
              <div class="mt-n6 pb-5">
                <strong class="black--text">
                  Activate "Display Fitted Curves" in 2D Chart Mode to evaluate
                  Threshold Fulfillment Ratio
                </strong>
              </div>
            </v-row>
          </v-card>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { ChartMode } from "@/types/State";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters([]),
  methods: mapMutations([])
})
export default class ThresholdsPanel extends Vue {
  rules = {
    number: (value: any) => !isNaN(value) || "Must be a number!"
  };

  threshold = 0;

  get displayInfo() {
    if (
      this.$store.getters.chartMode == ChartMode.ThreeDimensional ||
      (!this.$store.getters.displayCurves &&
        this.$store.getters.chartMode == ChartMode.TwoDimensional)
    )
      return true;
    return false;
  }

  get inclusion(): number {
    if (
      this.$store.getters.chartMode == ChartMode.TwoDimensional &&
      this.$store.getters.displayCurves
    ) {
      const fittedCurves = this.$store.getters.chart.traces.filter((t: any) => {
        return t.mode == "lines";
      });
      let curveThresholdFitCount = 0;
      fittedCurves.forEach((c: any) => {
        if (c.y[0] > this.threshold) curveThresholdFitCount++;
      });

      return (curveThresholdFitCount / fittedCurves.length) * 100;
    }
    return 0;
  }
}
</script>

<style scoped></style>
