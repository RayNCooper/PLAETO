<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <span class="plaeto-font">PLÆTO</span>

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
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  sockets: {
    connect() {
      console.log("JS-CLIENT: Connected to Server with ID " + this.$socket.id);
      this.$store.commit("setIsConnectedToSocket", true);
    },
    disconnect() {
      console.log(
        "JS-CLIENT: Disconnected from Server with ID " + this.$socket.id
      );
      this.$store.commit("setIsConnectedToSocket", false);
    }
  }
})
export default class App extends Vue {
  links = ["Home", "Stream"];
}
</script>

<style>
.plaeto-font {
  font-family: "Inknut Antiqua", serif;
}
</style>
