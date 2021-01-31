<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <slot name="leftColumn" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet rounded="lg">
          <slot name="centerColumn" />
        </v-sheet>
        <!--  -->
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <slot name="rightColumn" />
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
