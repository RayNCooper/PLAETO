<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="ma-3 pa-2 blue-grey lighten-3">
          <reactive-chart-holder></reactive-chart-holder>
        </v-card>
        <v-card-actions>
          <v-btn color="green" class="white--text" fab>
            <v-icon dark>
              fas fa-play
            </v-icon>
          </v-btn>
          <v-btn color="red" class="white--text" fab>
            <v-icon dark>
              fas fa-pause
            </v-icon>
          </v-btn>
          <v-btn color="white" class="black--text" fab>
            <v-icon dark>
              fas fa-save
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactiveChartHolder from "@/components/Stream/StreamPanel/Chart/ReactiveChartHolder.vue";

@Component({
  components: { ReactiveChartHolder }
})
export default class StreamPanel extends Vue {}
</script>

<style scoped></style>
