<template>
  <div>
    <v-sheet rounded="lg">
      <v-row no-gutters>
        <v-col>
          <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
            <v-card outlined class="ma-3 pa-2 blue-grey lighten-3">
              <v-sparkline
                :value="[10, 6, 5, 4, 3, 2.7, 2.3, 2, 1.9]"
                :smooth="15"
                :padding="10"
                color="white"
                :line-width="2"
                :stroke-linecap="round"
                :gradient-direction="top"
                :fill="false"
                :type="trend"
                :auto-line-width="false"
                auto-draw
              ></v-sparkline>
            </v-card>

            <v-card-text>
              <p class="text-h5 text--primary">
                <b class="plaeto-font">PLAETO</b> (/ˈpleɪtoʊ/)
              </p>
              <p>
                A proof of concept software suite for benchmarking and analysing
                energy-harvesting systems. <br />
                This project is being developed in the context of a bachelor's
                thesis at University of Duisburg-Essen.
              </p>
              <div class="text--primary"></div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="white"
                class="black--text"
                fab
                href="https://git.reinkober-it.de/crunch/PLAETO/src/branch/master/user_stories.md"
              >
                <v-icon dark>
                  fas fa-tasks
                </v-icon>
              </v-btn>
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
                color="white"
                class="black--text"
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
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style></style>
