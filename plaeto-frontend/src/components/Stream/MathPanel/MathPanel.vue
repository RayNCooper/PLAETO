<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-2 grey lighten-2" rounded="lg" outlined>
        <v-card class="ma-3 pa-2 blue-grey lighten-3">
          <!-- <v-card-title class="white--text">Math Panel</v-card-title> -->
          <v-card flat class="pl-3 pr-3 pt-5 white"> </v-card>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: mapGetters([]),
  methods: mapMutations([])
})
export default class MathPanel extends Vue {}
</script>

<style scoped></style>
