<template>
  <v-snackbar :timeout="-1" :left="true" :value="true">
    <v-row v-if="isConnectedToSocket">
      <v-col cols="2">
        <v-avatar class="mr-5" color="green" size="35"></v-avatar>
      </v-col>
      <v-col align-self="center" cols="auto">
        <span class="text-subtitle-2"><b>Connected to Socket</b> </span>
      </v-col>
    </v-row>
    <v-row v-else-if="!isConnectedToSocket">
      <v-col cols="2">
        <v-avatar class="mr-5" color="red" size="35"></v-avatar>
      </v-col>
      <v-col align-self="center" cols="auto">
        <span class="text-subtitle-2"><b>Not connected to Socket</b> </span>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters(["isConnectedToSocket"])
})
export default class SocketStatusSnackbar extends Vue {}
</script>
