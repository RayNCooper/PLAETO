<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg">
          <slot name="leftColumn" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet rounded="lg" class="mb-4">
          <slot name="centerColumnTop" />
        </v-sheet>

        <v-sheet rounded="lg">
          <slot name="centerColumnBottom" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg">
          <slot name="rightColumn" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
