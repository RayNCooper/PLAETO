<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card outlined class="ma-3 pa-2 blue-grey lighten-3">
          <home-chart></home-chart>
        </v-card>

        <v-card-text>
          <p class="text-h6 text--primary">
            <b class="plaeto-font">PLAETO</b> (/ˈpleɪtoʊ/)
          </p>
          <p>
            A proof of concept software suite for benchmarking and analysing
            energy-harvesting systems. <br />
            This project is being developed in the context of a bachelor's
            thesis at University of Duisburg-Essen. <br />
            Named after the greek philosopher Plato, this project builds upon a
            frontend for energy harvesting recorder devices called SOCRAETES and
            thus found its name. <br />
            SOCRAETES is a yet to be released tool that is developed by the NES
            chair at University of Duisburg-Essen.
          </p>
          <div class="text--primary"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            class="black--text"
            fab
            href="https://git.reinkober-it.de/crunch/PLAETO/src/branch/master/abstract.pdf"
          >
            <v-icon dark>
              far fa-newspaper
            </v-icon>
          </v-btn>

          <v-btn
            color="green"
            class="white--text"
            fab
            href="https://git.reinkober-it.de/crunch/PLAETO/src/branch/master/user_stories.md"
          >
            <v-icon dark>
              fas fa-tasks
            </v-icon>
          </v-btn>
          <v-btn
            color="red"
            class="white--text"
            fab
            href="https://git.reinkober-it.de/crunch/PLAETO"
          >
            <v-icon dark>
              fab fa-git
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
import HomeChart from "@/components/Home/HomePanel/Chart/HomeChart.vue";

@Component({
  components: { HomeChart }
})
export default class StreamPanel extends Vue {}
</script>

<style scoped></style>
