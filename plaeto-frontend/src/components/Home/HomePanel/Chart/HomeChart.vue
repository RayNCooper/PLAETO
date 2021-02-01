<template>
  <v-sparkline
    :value="[123, 79, 54, 35, 16, 6, 0, 0]"
    :smooth="15"
    :padding="10"
    color="white"
    :line-width="2"
    :fill="false"
    :auto-line-width="false"
    auto-draw
  >
  </v-sparkline>
</template>
