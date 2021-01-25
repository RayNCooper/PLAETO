<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSocketIO from "vue-socket.io";

@Component({
  sockets: {
    connect() {
      console.log("JS-CLIENT: Connected to Server with ID " + this.$socket.id);
    },
    disconnect() {
      console.log(
        "JS-CLIENT: Disconnected from Server with ID " + this.$socket.id
      );
    },
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    this.sockets.subscribe("relay_curve", function(data) {
      console.log(
        "JS-CLIENT: Received Curve from Server with ID " + this.$socket.id
      );
      console.log(JSON.parse(data));
    });
  }
}
</script>

<style scoped></style>
