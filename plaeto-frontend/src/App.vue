<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <!-- <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar> -->
      <v-app-bar-title class="plaeto-font">
        PLAETO
      </v-app-bar-title>

      <v-tabs centered class="ml-n9">
        <v-tab
          v-for="link in links"
          :to="{ name: `${link}` }"
          :key="link"
          exact
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-ripple
            class="hidden-sm-and-down"
            color="grey darken-1 shrink"
            v-bind="attrs"
            v-on="on"
          >
            <img alt="Avatar" src="@/assets/plato.jpg" />
          </v-avatar>
        </template>
        <span>
          “Be kind, for everyone you meet <br />
          is fighting a harder battle.”
        </span>
      </v-tooltip>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <!--  -->
            <router-view />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  links = ["Home", "Stream"];
}
</script>

<style>
.plaeto-font {
  font-family: "Inknut Antiqua", serif;
}
</style>
