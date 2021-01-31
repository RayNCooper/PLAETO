<template>
  <v-sparkline
    :value="[10, 6, 5, 4, 3, 2.7, 2.3, 2, 1.9]"
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
